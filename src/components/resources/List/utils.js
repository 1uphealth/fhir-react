const getExtension = (key, extensions) => {
  const result = extensions.find(item => item.url && item.url.includes(key));
  return Boolean(result) ? result : null;
};

export { getExtension };
