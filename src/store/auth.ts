import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface UserPayload {
  data: {
    user: {
      id: string;
      display_name: string;
      user_email: string;
    }
  }
}

interface AuthState {
  token: string | null;
  user: {
    displayName: string;
    email: string;
  } | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => {
        try {
          const decoded: UserPayload = jwtDecode(token);
          const user = {
            displayName: decoded.data.user.display_name,
            email: decoded.data.user.user_email,
          };
          set({ token, user });
        } catch (error) {
          console.error("Failed to decode JWT:", error);
          set({ token: null, user: null });
        }
      },
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);