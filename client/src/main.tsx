import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { APP_LOGO, APP_TITLE } from "./const";

const ensureLinkElement = (rel: string) => {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  return link;
};

const applyBranding = () => {
  if (APP_TITLE) {
    document.title = APP_TITLE;
  }

  const favicon = ensureLinkElement("icon");
  favicon.type = "image/png";
  favicon.href = APP_LOGO;

  const appleIcon = ensureLinkElement("apple-touch-icon");
  appleIcon.href = APP_LOGO;
};

const injectAnalyticsScript = () => {
  const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

  if (!analyticsEndpoint || !analyticsWebsiteId) {
    return;
  }

  const scriptId = "umami-analytics-script";
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = scriptId;
    script.defer = true;
    document.body.appendChild(script);
  }

  script.dataset.websiteId = analyticsWebsiteId;
  script.src = `${analyticsEndpoint.replace(/\/$/, "")}/umami`;
};

applyBranding();
injectAnalyticsScript();

createRoot(document.getElementById("root")!).render(<App />);
