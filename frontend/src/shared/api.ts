export const API_URL = 'http://localhost:3000';
export const ATTRIBUTE_LIST_URL = `${API_URL}/attributes`;
export const LABEL_LIST_URL = `${API_URL}/labels`;

export class ApiMethods {
  static get = async (url: string, data = {}): Promise<Response> => {
    return fetch(url, { method: 'GET', ...data });
  };

  static delete = async (url: string): Promise<Response> => {
    return fetch(url, { method: 'DELETE' });
  };
}
