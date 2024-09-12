/* eslint-disable @typescript-eslint/no-explicit-any */
export type Fetch = {
  accessToken?: string | null;
  feature: "auth" | "client" | "oauth";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
  includeAccessToken?: boolean;
  callback?: (() => void) | ((res: any) => void);
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
  createdAt: Date;
  description: string | null;
  image: string | null;
};

export type Notification =
  | "friendRequest"
  | "friendRequestAccepted"
  | "message";

export type PendingRequest = {
  id: string;
  clientId: string;
  userId: string;
};

export type FriendRequest = {
  id: string;
  clientId: string;
  userId: string;
};

export type Friend = {
  id: string;
  clientId: string;
  userId: string;
};

export type Block = {
  id: string;
  clientId: string;
  userId: string;
};
