export type UserRole = "admin" | "editor";

export type User = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
};

export type PublicUser = Omit<User, "passwordHash">;

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: UserRole;
};
