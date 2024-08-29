type Icon = {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
};

type Fetch = {
  domain: "general" | "mobile";
  accessToken?: string;
  feature: "auth" | "client" | "accounts" | "favorite" | "collection";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  includeToken?: boolean;
};

type FetchResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

type accessToken = {
  accessToken: string;
};
