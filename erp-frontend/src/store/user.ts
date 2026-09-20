// src/stores/useUserStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// Store ke state aur user object ke liye types define karein
interface User {
  email: string;
  role: string;
  sub: number; // 'sub' (subject) aam taur par user ID hota hai
  username: string;
  exp: number; // Expiration time
}

interface UserState {
  token: string | null;
  user: Omit<User, 'exp'> | null; // User state mein 'exp' rakhne ki zaroorat nahi
  isAuth: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      token: null,
      user: null,
      isAuth: false,

      // Token set karne ke liye function
      setToken: (token) => {
        try {
          const decoded = jwtDecode<User>(token);
          // Token se 'exp' property ko hatakar user object store karein
          const { exp, ...userInfo } = decoded;

          set({ token, user: userInfo, isAuth: true });
          
          // Middleware ke access ke liye token ko cookie mein set karein
          // 'expires: 1' ka matlab hai 1 din
          Cookies.set('token', token, { expires: 1, path: '/' });
        } catch (error) {
          console.error("Invalid token:", error);
          get().logout(); // Agar token galat hai to logout kar dein
        }
      },

      // Logout ke liye function
      logout: () => {
        set({ token: null, user: null, isAuth: false });
        
        // Logout hone par cookie se token हटा dein
        Cookies.remove('token', { path: '/' });
      },

      // App load hone par authentication check karne ke liye function
      checkAuth: () => {
        // Token state se nahi, cookie se padhein kyunki woh server-side par bhi available hota hai
        const token = Cookies.get('token');
        if (token) {
          try {
            const decoded = jwtDecode<User>(token);
            
            // Check karein ki token expire to nahi ho gaya hai
            if (decoded.exp * 1000 < Date.now()) {
              get().logout(); // Expire ho gaya hai to logout kar dein
            } else {
              // Agar token valid hai, to state ko update karein
              const { exp, ...userInfo } = decoded;
              set({ isAuth: true, token, user: userInfo });
            }
          } catch (error) {
            get().logout(); // Agar token invalid hai to logout kar dein
          }
        } else {
          // Agar token hi nahi hai, to make sure state logged out hai
          get().logout();
        }
      },
    }),
    {
      name: 'user-auth-storage', // localStorage mein is naam se save hoga
      storage: createJSONStorage(() => localStorage),
    }
  )
);