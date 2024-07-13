export const API_URL = 'http://localhost:3000';

export class ApiMethods {
  static get = async (url: string, data = {}): Promise<Response> => {
    return fetch(url, { method: 'GET', ...data });
  };

  static delete = async (url: string): Promise<Response> => {
    return fetch(url, { method: 'DELETE' });
  };
}
