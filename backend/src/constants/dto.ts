export type Client = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  description: string | null;
  image: string | null;
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
