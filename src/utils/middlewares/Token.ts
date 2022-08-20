import * as TokenUtils from '../TokenUtils';

export async function TokenValitation(req, res, next) {
  const { method, url } = req;

  if (method === 'OPTIONS' || !TokenUtils.needToken(url)) return next();

  const invalid = (expired = false) =>
    res
      .status(401)
      .json({ message: `${expired ? 'Expired' : 'Invalid'} session` });

  const { authorization } = req.headers;

  if (!authorization) return invalid(false);

  const { valid, expired } = await TokenUtils.validateToken({
    token: authorization
  });
  if (!valid) return invalid(expired);
  return next();
}
