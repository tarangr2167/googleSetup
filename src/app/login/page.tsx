"use client";

import React from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;

    // Send ID token to backend
    const res = await fetch("api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    console.log("Login response:", data);
  };

  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Google login failed");
        }}
      />
    </div>
  );
}
