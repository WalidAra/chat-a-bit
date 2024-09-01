export type Fetch = {
  accessToken?: string;
  feature: "auth" | "client" | "accounts" | "favorite" | "collection";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  includeToken?: boolean;
  callback?: () => void;
};

export type FetchResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type accessToken = {
  accessToken: string;
};

export type Client = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  description: string | null;
  image: string | null;
  provider: "DIRECT" | "GOOGLE";
};
