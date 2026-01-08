import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeUiPathSDK, getUiPath } from '@/lib/uipath';
import type { UiPath } from 'uipath-sdk';
interface UiPathAuthContextType {
  isInitializing: boolean;
  isAuthenticated: boolean;
  error: string | null;
  uipath: UiPath | null;
  initialize: () => Promise<void>;
}
const UiPathAuthContext = createContext<UiPathAuthContextType | undefined>(undefined);
interface UiPathAuthProviderProps {
  children: React.ReactNode;
}
export function UiPathAuthProvider({ children }: UiPathAuthProviderProps) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uipath, setUipath] = useState<UiPath | null>(null);
  const initialize = async () => {
    try {
      setIsInitializing(true);
      setError(null);
      console.log('🔄 UiPathAuthProvider: Starting SDK initialization...');
      const client = await initializeUiPathSDK();
      console.log('✅ UiPathAuthProvider: SDK initialized, checking authentication...');
      const authenticated = client.isAuthenticated();
      setUipath(client);
      setIsAuthenticated(authenticated);
      console.log('🎉 UiPathAuthProvider: Authentication status:', authenticated);
    } catch (err) {
      console.error('❌ UiPathAuthProvider: Initialization failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize UiPath SDK');
      setIsAuthenticated(false);
      setUipath(null);
    } finally {
      setIsInitializing(false);
    }
  };
  useEffect(() => {
    initialize();
  }, []);
  const value: UiPathAuthContextType = {
    isInitializing,
    isAuthenticated,
    error,
    uipath,
    initialize
  };
  return (
    <UiPathAuthContext.Provider value={value}>
      {children}
    </UiPathAuthContext.Provider>
  );
}
export { UiPathAuthContext };