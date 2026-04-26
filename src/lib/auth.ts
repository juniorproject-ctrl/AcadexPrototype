export type RegisteredUser = {
  name: string;
  email: string;
  password: string;
  role: 'Student' | 'Tutor' | 'Admin';
  verifiedAt: string;
};

const USERS_KEY = 'acadex_registered_users';
const CURRENT_USER_KEY = 'acadex_current_user';

export function getRegisteredUsers(): RegisteredUser[] {
  const raw = localStorage.getItem(USERS_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as RegisteredUser[];
  } catch {
    return [];
  }
}

export function findRegisteredUser(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return getRegisteredUsers().find((user) => user.email.toLowerCase() === normalizedEmail);
}

export function saveRegisteredUser(user: RegisteredUser) {
  const normalizedEmail = user.email.trim().toLowerCase();
  const existing = getRegisteredUsers().filter((entry) => entry.email.toLowerCase() !== normalizedEmail);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify([
      ...existing,
      {
        ...user,
        email: normalizedEmail,
      },
    ]),
  );
}

export function setCurrentUser(email: string) {
  localStorage.setItem(CURRENT_USER_KEY, email.trim().toLowerCase());
}

export function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function getCurrentRegisteredUser() {
  const currentUserEmail = getCurrentUser();

  if (!currentUserEmail) {
    return null;
  }

  return findRegisteredUser(currentUserEmail) || null;
}
