export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  color: string;
}

export interface RateLimitTier {
  plan: string;
  limit: string;
}

export interface ApiErrorCode {
  code: string;
  description: string;
}

export interface ApiBestPractice {
  title: string;
  description: string;
}

export const apiEndpoints: ApiEndpoint[] = [
  { method: "GET", path: "/projects", description: "List all projects", color: "bg-green-100 text-green-800" },
  { method: "POST", path: "/projects", description: "Create a new project", color: "bg-blue-100 text-blue-800" },
  { method: "GET", path: "/projects/:id", description: "Get a specific project", color: "bg-green-100 text-green-800" },
  { method: "PUT", path: "/projects/:id", description: "Update a project", color: "bg-yellow-100 text-yellow-800" },
  { method: "DELETE", path: "/projects/:id", description: "Delete a project", color: "bg-red-100 text-red-800" },
  { method: "GET", path: "/clients", description: "List all clients", color: "bg-green-100 text-green-800" },
  { method: "POST", path: "/clients", description: "Create a new client", color: "bg-blue-100 text-blue-800" },
  { method: "GET", path: "/employees", description: "List all employees", color: "bg-green-100 text-green-800" },
];

export const apiRateLimits: RateLimitTier[] = [
  { plan: "Standard Plan", limit: "1,000 requests per hour" },
  { plan: "Professional Plan", limit: "5,000 requests per hour" },
  { plan: "Enterprise Plan", limit: "Custom limits available" },
];

export const apiErrorCodes: ApiErrorCode[] = [
  { code: "200", description: "OK - Request succeeded" },
  { code: "201", description: "Created - Resource created successfully" },
  { code: "400", description: "Bad Request - Invalid request parameters" },
  { code: "401", description: "Unauthorized - Invalid or missing API key" },
  { code: "403", description: "Forbidden - Insufficient permissions" },
  { code: "404", description: "Not Found - Resource not found" },
  { code: "429", description: "Too Many Requests - Rate limit exceeded" },
  { code: "500", description: "Internal Server Error - Server error occurred" },
];

export const apiBestPractices: ApiBestPractice[] = [
  { title: "Use HTTPS", description: "Always use HTTPS for API requests to ensure data security." },
  { title: "Handle Errors Gracefully", description: "Implement proper error handling and retry logic for failed requests." },
  { title: "Cache Responses", description: "Cache API responses when appropriate to reduce unnecessary requests." },
  { title: "Use Webhooks", description: "Subscribe to webhooks for real-time updates instead of polling." },
  { title: "Paginate Results", description: "Use pagination for large result sets to improve performance." },
  { title: "Keep API Keys Secure", description: "Never expose API keys in client-side code or public repositories." },
];

