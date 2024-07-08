export const API_URL = 'http://localhost:3000';
export const ATTRIBUTE_LIST_URL = `${API_URL}/attributes`;

export const get = async (url: string, data = {}) => {
  return fetch(url, { method: 'GET', ...data });
};
