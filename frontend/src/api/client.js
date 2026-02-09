const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiRequest = async (path, options = {}) => {
  const { method = 'GET', body, token } = options;

  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || 'Request failed';
    throw new Error(message);
  }

  return data;
};
