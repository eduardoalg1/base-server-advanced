import { HTTP400Error } from './';

type IObjectFieldsType = {
  [s: string]: string;
};

const regExps = {
  string: /[><?\\/*{}[\]^$()&]/g
};

export function validate(object, fields: string) {
  const fieldsToVerify = fields.split(' ');
  for (const field of fieldsToVerify) {
    if (!object[field]) throw new HTTP400Error(`Missing param ${field}`);
  }
  return object;
}

export function validateAndSanitize<T>({
  object,
  fields,
  onlySanitize = false
}: {
  object: T;
  fields: IObjectFieldsType;
  onlySanitize?: boolean;
}): T {
  for (const [field, type] of Object.entries(fields)) {
    if (!object?.[field] && onlySanitize) continue;
    if (!object?.[field] && !onlySanitize)
      throw new HTTP400Error(`Missing param ${field}`);
    if (!type) continue;
    object[field] = object[field].replace(regExps[type], '');
  }
  return object;
}
