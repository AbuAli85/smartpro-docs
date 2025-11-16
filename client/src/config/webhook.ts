/**
 * Configuration for Make.com webhook integration
 * Set VITE_MAKE_WEBHOOK_URL in your .env file to override the default
 */
export const MAKE_WEBHOOK_URL =
  import.meta.env.VITE_MAKE_WEBHOOK_URL ||
  "https://hook.eu2.make.com/kd1lhgadjt2ip9vi0i8q1t7g59ke86ke";

