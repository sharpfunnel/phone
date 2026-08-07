"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * DEMO AUTHENTICATION — NOT SECURE, NOT PRODUCTION.
 *
 * There is no server here. The OTP is generated in the browser and shown on
 * screen, the "session" is a localStorage entry, and nothing is verified. Any
 * visitor can sign in as any number, or forge a session from the console.
 *
 * To make this real you need, at minimum:
 *   - an SMS provider (MSG91, Twilio) called from a route handler, never the client
 *   - the OTP generated, stored and compared server-side, with an expiry and
 *     a send/attempt rate limit per number
 *   - an httpOnly, signed session cookie instead of localStorage
 *   - price calculation moved server-side, so a signed-out visitor cannot read
 *     the figures out of the JS bundle
 */

export type User = {
  phone: string;
  since: string;
  name?: string;
  email?: string;
};

export type SavedQuote = {
  model: string;
  variant: string;
  amount: number;
  at: string;
};

export type SavedAddress = {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
};

type Snapshot = {
  user: User | null;
  quotes: SavedQuote[];
  addresses: SavedAddress[];
};

const USER_KEY = "electronics.user";
const QUOTES_KEY = "electronics.quotes";
const ADDRESSES_KEY = "electronics.addresses";

/* -------------------------------------------------------------------------
   localStorage is an external store, so it is read through
   useSyncExternalStore rather than copied into state inside an effect.
   ------------------------------------------------------------------------- */

/** Identity is meaningful: this exact object means "not hydrated yet". */
const SERVER_SNAPSHOT: Snapshot = { user: null, quotes: [], addresses: [] };

let snapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function readStorage(): Snapshot {
  try {
    const rawUser = localStorage.getItem(USER_KEY);
    const rawQuotes = localStorage.getItem(QUOTES_KEY);
    const rawAddresses = localStorage.getItem(ADDRESSES_KEY);
    return {
      user: rawUser ? (JSON.parse(rawUser) as User) : null,
      quotes: rawQuotes ? (JSON.parse(rawQuotes) as SavedQuote[]) : [],
      addresses: rawAddresses
        ? (JSON.parse(rawAddresses) as SavedAddress[])
        : [],
    };
  } catch {
    // Corrupt or unavailable storage — start signed out.
    return { user: null, quotes: [], addresses: [] };
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other tabs of the same browser in step.
  const onStorage = (e: StorageEvent) => {
    if (e.key === USER_KEY || e.key === QUOTES_KEY || e.key === ADDRESSES_KEY) {
      snapshot = readStorage();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// Must return a stable reference or React re-renders forever.
function getSnapshot(): Snapshot {
  if (!snapshot) snapshot = readStorage();
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

function write(next: Snapshot) {
  snapshot = next;
  try {
    if (next.user) localStorage.setItem(USER_KEY, JSON.stringify(next.user));
    else localStorage.removeItem(USER_KEY);
    localStorage.setItem(QUOTES_KEY, JSON.stringify(next.quotes));
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next.addresses));
  } catch {
    // Storage unavailable — the session lasts for this tab only.
  }
  emit();
}

/* ------------------------------------------------------------------------- */

type AuthValue = {
  /** False during the server render and first hydration pass. */
  ready: boolean;
  user: User | null;
  quotes: SavedQuote[];
  pendingPhone: string | null;
  /** Returns the demo code so the UI can display it. */
  requestOtp: (phone: string) => string;
  verifyOtp: (code: string) => boolean;
  logout: () => void;
  saveQuote: (quote: Omit<SavedQuote, "at">) => void;
  removeQuote: (model: string, variant: string) => void;
  updateProfile: (patch: Pick<User, "name" | "email">) => void;
  addresses: SavedAddress[];
  addAddress: (address: Omit<SavedAddress, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = store !== SERVER_SNAPSHOT;

  // Ephemeral, set from event handlers only — plain state is right here.
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);
  const [expectedCode, setExpectedCode] = useState<string | null>(null);

  const requestOtp = useCallback((phone: string) => {
    // A real implementation posts to the server, which sends the SMS and keeps
    // the code. Here it is generated in the browser purely so the flow is
    // testable without a provider.
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setPendingPhone(phone);
    setExpectedCode(code);
    return code;
  }, []);

  const verifyOtp = useCallback(
    (code: string) => {
      if (!pendingPhone || code !== expectedCode) return false;

      write({
        ...getSnapshot(),
        user: { phone: pendingPhone, since: new Date().toISOString() },
      });
      setPendingPhone(null);
      setExpectedCode(null);
      return true;
    },
    [pendingPhone, expectedCode],
  );

  const logout = useCallback(() => {
    write({ ...getSnapshot(), user: null });
    setPendingPhone(null);
    setExpectedCode(null);
  }, []);

  const saveQuote = useCallback((quote: Omit<SavedQuote, "at">) => {
    const current = getSnapshot();
    const existing = current.quotes.find(
      (q) => q.model === quote.model && q.variant === quote.variant,
    );
    // Don't rewrite storage when nothing actually changed.
    if (existing && existing.amount === quote.amount) return;

    write({
      ...current,
      quotes: [
        { ...quote, at: new Date().toISOString() },
        ...current.quotes.filter(
          (q) => !(q.model === quote.model && q.variant === quote.variant),
        ),
      ].slice(0, 20),
    });
  }, []);

  const updateProfile = useCallback((patch: Pick<User, "name" | "email">) => {
    const current = getSnapshot();
    if (!current.user) return;
    write({ ...current, user: { ...current.user, ...patch } });
  }, []);

  const removeQuote = useCallback((model: string, variant: string) => {
    const current = getSnapshot();
    write({
      ...current,
      quotes: current.quotes.filter(
        (q) => !(q.model === model && q.variant === variant),
      ),
    });
  }, []);

  const addAddress = useCallback((address: Omit<SavedAddress, "id">) => {
    const current = getSnapshot();
    const id = `addr_${Date.now().toString(36)}`;
    // The first address saved becomes the default automatically.
    const isDefault = address.isDefault || current.addresses.length === 0;

    write({
      ...current,
      addresses: [
        ...current.addresses.map((a) =>
          isDefault ? { ...a, isDefault: false } : a,
        ),
        { ...address, id, isDefault },
      ],
    });
  }, []);

  const removeAddress = useCallback((id: string) => {
    const current = getSnapshot();
    const remaining = current.addresses.filter((a) => a.id !== id);
    // Never leave the list without a default.
    if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
      remaining[0] = { ...remaining[0], isDefault: true };
    }
    write({ ...current, addresses: remaining });
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    const current = getSnapshot();
    write({
      ...current,
      addresses: current.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    });
  }, []);

  const value = useMemo(
    () => ({
      ready,
      user: store.user,
      quotes: store.quotes,
      addresses: store.addresses,
      pendingPhone,
      requestOtp,
      verifyOtp,
      logout,
      saveQuote,
      removeQuote,
      updateProfile,
      addAddress,
      removeAddress,
      setDefaultAddress,
    }),
    [
      ready,
      store,
      pendingPhone,
      requestOtp,
      verifyOtp,
      logout,
      saveQuote,
      removeQuote,
      updateProfile,
      addAddress,
      removeAddress,
      setDefaultAddress,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
