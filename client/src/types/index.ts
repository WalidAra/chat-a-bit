/* eslint-disable @typescript-eslint/no-explicit-any */
export type Fetch = {
  accessToken?: string | null;
  feature: "auth" | "client" | "oauth" | "chats";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
  includeAccessToken?: boolean;
  callback?: (() => void) | ((res: FetchResponse<any>) => void);
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

export type Chat = {
  id: string;
  isGroup: boolean;
  name: string | null;
  description: string | null;
  image: string | null;
  ownerId: string | null;
};

export type Message = {
  id: string;
  userId: string;
  chatId: string;
  type: "SIMPLE" | "COMPLEX";
  content: string;
  createdAt: Date;
};

export type EntityWithUser = {
  id: string;
  user: Client;
  client: Client;
};
