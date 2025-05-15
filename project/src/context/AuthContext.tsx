import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Check for saved user in localStorage (in a real app)
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setAuthState({
            user: JSON.parse(savedUser),
            isAuthenticated: true,
            loading: false,
            error: null
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: 'Authentication failed'
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // This would be an API call in a real app
      setAuthState({
        ...authState,
        loading: true
      });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'john@example.com' && password === 'password') {
        localStorage.setItem('user', JSON.stringify(mockUser));
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          loading: false,
          error: null
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: 'Invalid email or password'
      });
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // This would be an API call in a real app
      setAuthState({
        ...authState,
        loading: true
      });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: 'Signup failed'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};