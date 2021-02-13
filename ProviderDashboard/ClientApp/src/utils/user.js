function getNameParts(name) {
  const nameParts = name.replace(/^\s+|\s+$/i, '').split(/\s+/i);

  const firstName = nameParts.shift() || '';
  const lastName = nameParts.pop() || '';

  return { firstName, lastName };
}

export function getUserShortName(name) {
  const { firstName, lastName } = getNameParts(name);

  return `${firstName} ${lastName.slice(0, 1).toUpperCase()}`;
}
