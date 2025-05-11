export type ActiveLinkType = '/' | '/about' | '/contacts' | '/auth' | '/community';

export type TRoute = {
    route: ActiveLinkType;
    label: string;
}

export type Event = {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  format: string;
}

export type User = {
  id: string;
  email: string;
  username: string | null,
  role: UserRole,
  accessToken: string;
  refreshToken: string;
}

export type UserRole = 'ADMIN' | 'USER';

// ДЛЯ API

export type UserData = {
  email: string;
  password: string;
  username?: string;
  role: string;
}

export type EventData = {
  title: string;
  description: string;
  dateTime: string; // ISO-строка
  format: 'ONLINE' | 'OFFLINE' | '';
  token: string;
}
