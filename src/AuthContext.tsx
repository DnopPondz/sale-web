import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Role = "admin" | "user";

type AuthUser = {
  _id: string;
  email: string;
  name: string;
  tel: string;
  role: Role;
};

type LoginResult = {
  user: AuthUser | null;
  error?: string;
};

type RegisterResult = {
  success: boolean;
  error?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (
    email: string,
    name: string,
    tel: string,
    password: string,
  ) => Promise<RegisterResult>;
  logout: () => void;
};

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const parseStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("currentUser");
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch (error) {
    console.error("Failed to parse stored user", error);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => parseStoredUser());

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage =
          typeof data.error === "string" ? data.error : "Unable to login";
        return { user: null, error: errorMessage };
      }

      if (!data || typeof data !== "object") {
        return { user: null, error: "Unable to login" };
      }

      const authUser = data as AuthUser;
      setUser(authUser);
      return { user: authUser };
    } catch (error) {
      console.error("Login failed", error);
      return { user: null, error: "Unable to login" };
    }
  };

  const register = async (
    email: string,
    name: string,
    tel: string,
    password: string,
  ): Promise<RegisterResult> => {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, tel, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage =
          typeof data.error === "string"
            ? data.error
            : "Registration failed";
        return { success: false, error: errorMessage };
      }

      return { success: true };
    } catch (error) {
      console.error("Registration failed", error);
      return { success: false, error: "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
