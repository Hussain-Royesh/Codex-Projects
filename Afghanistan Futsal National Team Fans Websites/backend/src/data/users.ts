import usersJson from "./users.json";
import type { PublicUser, User } from "../types/auth";

const users = usersJson as User[];

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function toPublicUser(user: User): PublicUser {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}

export function getPublicUsers(): PublicUser[] {
  return users.map(toPublicUser);
}
