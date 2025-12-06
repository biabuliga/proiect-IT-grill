import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string, newPassword?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // La încărcare, verificăm dacă există un utilizator salvat în localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulăm autentificarea - în producție, aceasta ar fi o cerere API
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = savedUsers.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    // Simulăm înregistrarea - în producție, aceasta ar fi o cerere API
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Verificăm dacă email-ul există deja
    if (savedUsers.some((u: User) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password,
    };

    savedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    // Autentificăm automat utilizatorul după înregistrare
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const resetPassword = async (email: string, newPassword?: string): Promise<boolean> => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = savedUsers.findIndex((u: User) => u.email === email);

    if (userIndex === -1) {
      return false;
    }

    // Dacă se trimite o parolă nouă, o actualizam
    if (newPassword) {
      savedUsers[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(savedUsers));
      return true;
    }

    // Doar verificăm dacă email-ul există
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

