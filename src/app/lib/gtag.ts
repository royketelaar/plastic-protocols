export const GA_TRACKING_ID = "G-DVP21LB9PQ";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const initGA = () => {
  if (typeof window === "undefined") return;

  // Load the Google Analytics script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }

  gtag("js", new Date());
  gtag("config", GA_TRACKING_ID);
};
