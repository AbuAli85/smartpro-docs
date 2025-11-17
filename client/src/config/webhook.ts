/**
 * Configuration for Make.com webhook integration
 * Set VITE_MAKE_WEBHOOK_URL in your .env file to override the default
 * 
 * Production webhook URL for smartpro-website-consultation-v2 scenario
 */
export const MAKE_WEBHOOK_URL =
  import.meta.env.VITE_MAKE_WEBHOOK_URL ||
  "https://hook.eu2.make.com/z9t0f5eqipopdg368eypl5i9eo7kpbu8";

