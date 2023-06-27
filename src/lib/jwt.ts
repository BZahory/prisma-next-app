import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "process";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secretKey = env["SECRET_KEY"] || "LOCAL_TESTING_KEY";
  const token = jwt.sign(payload, secretKey, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secretKey = env["SECRET_KEY"] || "LOCAL_TESTING_KEY";
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
}
