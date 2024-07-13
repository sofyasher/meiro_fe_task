export const queryParams = (params: {
  [key: string]: string | number | undefined | null;
}): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return !!query ? `?${query}` : '';
};
