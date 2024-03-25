import { pbkdf2Sync, randomBytes } from "crypto";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { hash, salt };
}

export function verifiedPassword({
  providedPass,
  salt,
  hash,
}: {
  providedPass: string;
  salt: string;
  hash: string;
}) {
  const candidateHash = pbkdf2Sync(
    providedPass,
    salt,
    1000,
    64,
    "sha512"
  ).toString("hex");

  return candidateHash === hash;
}
