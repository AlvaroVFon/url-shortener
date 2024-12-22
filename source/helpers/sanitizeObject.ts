function sanitizeObject(object: Object, blackList: string[]): Object {
  let sanitizedObject = {};
  for (let key in object) {
    if (!blackList.includes(key)) {
      (sanitizedObject as any)[key] = object[key as keyof Object];
    }
  }
  return sanitizedObject;
}

export { sanitizeObject };
