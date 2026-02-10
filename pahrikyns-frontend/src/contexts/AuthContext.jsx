import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth";
import { registerFCMToken } from "../utils/fcm";
import { signInAnonymously, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

const AuthContext = createContext(null);
const firebaseAuth = auth;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("USER_TOKEN"));
  const [user, setUser] = useState(null);             // backend user
  const [firebaseUser, setFirebaseUser] = useState(null); // chat user
  const [loading, setLoading] = useState(true);

  // ================================
  // FIREBASE SESSION
  // ================================
  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, (u) => {
      setFirebaseUser(u);
    });
  }, []);

  // ================================
  // LOAD BACKEND USER
  // ================================
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        // 1️⃣ Validate backend login
        const res = await getCurrentUser();
        const loggedUser = res.data;
        setUser(loggedUser);

        // 2️⃣ Register FCM (DO NOT BREAK LOGIN)
        if (loggedUser?.id) {
          try {
            await registerFCMToken(loggedUser.id);
          } catch (e) {
            console.warn("⚠️ FCM failed, ignoring", e);
          }
        }

        // 3️⃣ Firebase login for chat (DO NOT BREAK LOGIN)
        if (!firebaseAuth.currentUser) {
          try {
            await signInAnonymously(firebaseAuth);
          } catch (e) {
            console.warn("⚠️ Firebase auth failed, ignoring", e);
          }
        }

      } catch (err) {
        console.error("❌ Auth load error:", err);

        // Only logout if BACKEND says unauthorized
        if (err?.response?.status === 401) {
          localStorage.removeItem("USER_TOKEN");
          setToken(null);
          setUser(null);
          await signOut(firebaseAuth);
        } else {
          console.warn("Firebase/FCM error – backend login kept");
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // ================================
  // LOGIN
  // ================================
  const login = async (data) => {
    if (!data?.token || !data?.user) return;

    localStorage.setItem("USER_TOKEN", data.token);
    setToken(data.token);
    setUser(data.user);

    if (data.user?.id) {
      try {
        await registerFCMToken(data.user.id);
      } catch (e) {
        console.warn("⚠️ FCM failed during login");
      }
    }

    if (!firebaseAuth.currentUser) {
      try {
        await signInAnonymously(firebaseAuth);
      } catch (e) {
        console.warn("⚠️ Firebase login failed");
      }
    }
  };

  // ================================
  // LOGOUT
  // ================================
  const logout = async () => {
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    await signOut(firebaseAuth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
