import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "555948707383-14cs85gr4q2c2hali7qjmvflkbqiftq8.apps.googleusercontent.com";

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Ensure you have a <div id='root'></div> in your index.html");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);