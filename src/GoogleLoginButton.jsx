import React, { useEffect } from "react";

export default function GoogleLoginButton() {
  useEffect(() => {
    if (window.google) {
      // eslint-disable-next-line no-undef
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      // eslint-disable-next-line no-undef
      google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  function handleCredentialResponse(response) {
    console.log(response);

    fetch("https://localhost:7006/login-google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
      })
      .catch((err) => console.error("Login error:", err));
  }
  return <div id="google-signin-button"></div>;
}
