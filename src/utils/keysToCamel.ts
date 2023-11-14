const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace("-", "")
      .replace("_", "");
  });
};

const isObject = function(o: object) {
  return o === Object(o) && typeof o !== "function";
};

const keysToCamel = function(o: object) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  }

  return o;
};

export default keysToCamel;
