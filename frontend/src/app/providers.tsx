'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthContext } from './(auth)/auth-context';
import { store } from '@/lib/redux/store';
import { Toaster } from '@/components/ui/toaster';

interface ProviderProps {
  children: React.ReactNode;
  authenticated: boolean;
}

export function Provider({ children, authenticated }: ProviderProps) {
  return (
    <ReduxProvider store={store}>
      <NextThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <AuthContext.Provider value={authenticated}>
          {children}
          <Toaster />
        </AuthContext.Provider>
      </NextThemeProvider>
    </ReduxProvider>
  );
}
