import JWT from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

interface userInterface {
  id: string;
  name: string;
  email: string;
}

interface tokenPayloadInterface {
  id: string;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function createToken(user: userInterface): string {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

export function validateToken(token: string): tokenPayloadInterface {
  const payload = JWT.verify(token, secret) as tokenPayloadInterface;
  return payload;
}