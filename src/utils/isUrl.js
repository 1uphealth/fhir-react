export const isUrl = str => {
  let url;
  try {
    url = new URL(str);
  } catch (err) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};
