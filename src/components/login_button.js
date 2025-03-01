import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  // Navigation is handled by loginWithRedirect's redirectUri

  const handleLogin = async () => {
    await loginWithRedirect({
      redirectUri: `${window.location.origin}/actors`,  // Redirect to /actors after login
    });
  };

  return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;
