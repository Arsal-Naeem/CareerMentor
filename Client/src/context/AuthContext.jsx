import { createContext, useContext, useEffect, useState } from "react";
import {
  getItemFromStorage,
  removeItemFromStorage,
  saveItemToStorage,
} from "@/utils/helpers/storage/localStorage";
import { LogoutMutation } from "@/apiService/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getItemFromStorage("user"));

  useEffect(() => {
    if (user) {
      saveItemToStorage("user", user);
    }
  }, [user]);

  const logoutMutation = LogoutMutation({
    onSuccess: () => {
      removeItemFromStorage("user");
      setUser(null);
      window.location.replace("/auth/login");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  const isAdmin = user?.role === "admin";
  const isUser = user?.role !== "admin";
  const isVerified = user?.isVerified;

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, isAdmin, isUser, isVerified }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
