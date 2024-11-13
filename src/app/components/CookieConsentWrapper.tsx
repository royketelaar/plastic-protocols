"use client";

import CookieConsent from "react-cookie-consent";
import { initGA } from "../lib/gtag";

const CookieConsentWrapper = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="userConsent"
      style={{ background: "#082F49" }}
      enableDeclineButton
      onAccept={() => {
        initGA();
      }}
      onDecline={() => {
        // Do not initialize analytics
      }}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default CookieConsentWrapper;