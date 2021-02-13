export function lengthValidator(val, maxLen) {
  return !maxLen || !val || (val.length > 0 && val.length <= maxLen) ? null : `Allowed max length is ${maxLen}`;
}
