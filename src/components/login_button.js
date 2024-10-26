import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();  // Use useNavigate for redirecting after login

  const handleLogin = async () => {
    await loginWithRedirect({
      redirectUri: `${window.location.origin}/actors`,  // Redirect to /actors after login
    });
  };

  return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;
