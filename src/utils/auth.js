const DEFAULT_ALLOWED = [
  { username: 'admin', password: 'password123' },
  { username: 'researcher1', password: 'res1password' },
  { username: 'ftc', password: 'ftc' }
];

export const getAllowedUsers = () => {
  try {
    const raw = localStorage.getItem('allowedUsers');
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return DEFAULT_ALLOWED;
  } catch {
    return DEFAULT_ALLOWED;
  }
};

export const verifyCredentials = (username, password) => {
  const users = getAllowedUsers();
  return users.some((u) => u.username === username && u.password === password);
};

export const setCurrentUser = (username) => {
  localStorage.setItem('currentUser', username);
};

export const getCurrentUser = () => {
  return localStorage.getItem('currentUser');
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};
