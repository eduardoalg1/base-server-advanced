import forge from 'node-forge';

const vector = 'QIWORPJNMCBNDFMGPUNSMXCLZNGSBNNFMMZKLOAIWHDRBNFMDMSJAHD';

async function crypt(id, str) {
  const key = _hash(String(id));
  const encoded = await encryptText(key, String(str));
  return forge.util.encode64(`${key}$${encoded}`);
}

async function decrypt(str) {
  const text = forge.util.decode64(String(str));
  if (!text.includes('$')) return false;
  const key = text.split('$')[0];
  const encoded = text.split('$')[1];
  return decryptText(key, encoded);
}

async function encryptText(key, str) {
  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv: vector });
  cipher.update(forge.util.createBuffer(str));
  cipher.finish();
  return forge.util.encode64(cipher.output.data);
}

async function decryptText(key, encoded) {
  const decoded = forge.util.decode64(encoded);
  const decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({ iv: vector });
  decipher.update(forge.util.createBuffer(decoded));
  decipher.finish();
  return decipher.output.data;
}

function _hash(id) {
  const text = String(id);
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += text.charAt(Math.floor(Math.random() * text.length));
  }
  return result;
}

export default {
  crypt,
  decrypt
};
