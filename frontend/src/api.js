// All API calls to the Express backend live here, so components
// stay focused on rendering rather than fetch() plumbing.

const API_BASE = 'http://localhost:5000/api/tasks';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
};

export const getTasks = () => fetch(API_BASE).then(handleResponse);

export const createTask = (title) =>
  fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }).then(handleResponse);

export const updateTask = (id, updates) =>
  fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  }).then(handleResponse);

export const deleteTask = (id) =>
  fetch(`${API_BASE}/${id}`, { method: 'DELETE' }).then(handleResponse);
