import { sign, verify } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import TokenCrypt from './TokenCrypt';

const PKPath = path.resolve(__dirname, '../../token.pem');
const PK = fs.readFileSync(PKPath);

async function _createToken(key, content) {
  const encryptedContent = await TokenCrypt.crypt(
    String(key),
    JSON.stringify(content)
  );
  const token = sign(
    {
      token: encryptedContent
    },
    PK,
    {
      expiresIn: '1d'
    }
  );
  return TokenCrypt.crypt(String(key), token);
}

export async function createToken({ id }: { id }) {
  const data: unknown = { id };
  return _createToken(id, data);
}

export async function validateToken({ token }) {
  const invalid = (expired = false) => ({
    valid: false,
    expired,
    data: undefined
  });
  const valid = (info: unknown) => ({
    valid: true,
    expired: false,
    data: info
  });

  try {
    token = token.split(' ')[0];
    const jwt = await TokenCrypt.decrypt(token);

    if (!jwt) return invalid(false);

    const jwtData = verify(jwt, PK, {});
    if (!jwtData.token) return invalid(false);
    const data = await TokenCrypt.decrypt(jwtData.token);
    const userData = JSON.parse(data);
    return valid(userData);
  } catch (error) {
    return invalid(false);
  }
}

export function needToken(url: string): boolean {
  const whitelist = [''];

  const whitelistEndsWith = [''];

  const whitelistStartsWith = ['/api/public'];

  for (const wlUrl of whitelistEndsWith) if (url.endsWith(wlUrl)) return false;

  for (const wlUrl of whitelistStartsWith)
    if (url.startsWith(wlUrl)) return false;

  for (const wlUrl of whitelist) if (url.includes(wlUrl)) return false;

  return true;
}
