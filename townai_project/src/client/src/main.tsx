
import { createRoot } from 'react-dom/client'
import { SupabaseAuthProvider } from '@/hooks/useSupabaseAuth'
import App from './App.tsx'
import './index.css'
import DevLogger from '@/components/Common/DevLogger'
import ErrorBoundaryWrapper from '@/components/Common/ErrorBoundaryWrapper'

createRoot(document.getElementById("root")!).render(
  <ErrorBoundaryWrapper context="Application Root">
    <SupabaseAuthProvider>
      <DevLogger />
      <App />
    </SupabaseAuthProvider>
  </ErrorBoundaryWrapper>
);
