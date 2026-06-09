import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import env from "../src/config/env";
import type { User } from "../src/types/auth";

const usersFilePath = path.join(__dirname, "..", "src", "data", "users.json");

function readUsers(): User[] {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }

  const fileContents = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(fileContents) as User[];
}

function writeUsers(users: User[]) {
  fs.writeFileSync(usersFilePath, `${JSON.stringify(users, null, 2)}\n`);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function seedAdmin() {
  const fullName = process.env.SEED_ADMIN_FULL_NAME || "Site Administrator";
  const email = normalizeEmail(process.env.SEED_ADMIN_EMAIL || "");
  const password = process.env.SEED_ADMIN_PASSWORD || "";

  if (!email || !password) {
    throw new Error("SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required");
  }

  const users = readUsers();
  const existingIndex = users.findIndex(
    (user) => normalizeEmail(user.email) === email
  );
  const existingUser = existingIndex >= 0 ? users[existingIndex] : null;
  const now = new Date().toISOString();
  const passwordHash = await bcrypt.hash(password, env.bcryptSaltRounds);

  const adminUser: User = {
    id: existingUser ? existingUser.id : `admin-${randomUUID()}`,
    fullName,
    email,
    passwordHash,
    role: "admin",
    status: "active",
    createdAt: existingUser ? existingUser.createdAt : now,
    updatedAt: now
  };

  if (existingIndex >= 0) {
    users[existingIndex] = {
      ...existingUser,
      ...adminUser
    };
  } else {
    users.push(adminUser);
  }

  writeUsers(users);

  console.log("Admin seed completed");
  console.log(
    JSON.stringify(
      {
        id: adminUser.id,
        fullName: adminUser.fullName,
        email: adminUser.email,
        role: adminUser.role,
        status: adminUser.status
      },
      null,
      2
    )
  );
}

seedAdmin().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Admin seed failed");
  process.exitCode = 1;
});
