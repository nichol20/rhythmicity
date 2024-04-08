export enum SessionStorageKeys {
  VOLUME = "volume",
}

export const getFromCache = (cacheKey: string): any => {
  const cachedData = window.sessionStorage.getItem(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  return null;
};

export const setToCache = (cacheKey: string, data: any) => {
  window.sessionStorage.setItem(cacheKey, JSON.stringify(data));
};
