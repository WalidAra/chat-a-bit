export type Fetch = {
  domain: "general" | "mobile";
  accessToken?: string;
  feature: "auth" | "client" | "accounts" | "favorite" | "collection";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  includeToken?: boolean;
};

export type FetchResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type accessToken = {
  accessToken: string;
};
