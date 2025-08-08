// authStore.ts
import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.REACT_APP_AUTH_API || "http://localhost:3000/api";

interface User {
  id: string;
  name: string;
  email: string;
  fullName: string;
  isUstaz: boolean;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (credentials: Credentials) => Promise<boolean>;
  googleLogin: (credential: string) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const getUserFromLocalStorage = (): User | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    return null;
  }
};

const useAuthStore = create<AuthState>((set) => ({
  user: getUserFromLocalStorage(),
  token: localStorage.getItem("access_token"),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, credentials);
      const { token, user } = response.data;

      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, token, isLoading: false });
      return true;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return false;
    }
  },

  googleLogin: async (credential) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/google`, {
        token: credential,
      });
      const { token, user } = response.data;

      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, token, isLoading: false });
      return true;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Google login failed",
        isLoading: false,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },

  fetchUser: async () => {
    const token = localStorage.getItem("access_token");
    if (token && !getUserFromLocalStorage()) {
      set({ isLoading: true });
      try {
        const response = await axios.get(`${API_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, isLoading: false });
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        set({
          user: null,
          token: null,
          isLoading: false,
          error: "Session expired",
        });
      }
    }
  },
}));

export default useAuthStore;
