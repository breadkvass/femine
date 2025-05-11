import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData, EventData } from './types';

const URL = 'https://api.femine.space';

const checkResponse = (response: Response) => {
  if (!response.ok) {
    return response.text().then((text) => {
      throw new Error(text || 'Произошла ошибка при выполнении запроса');
    });
  }
  return response.json();
};

// === REFRESH AUTH ===
export const refreshAuth = async (refreshToken: string) => {
  const response = await fetch(`${URL}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при обновлении токена');
  }

  return await response.json(); // { accessToken, refreshToken, user }
};

export const checkAuth = createAsyncThunk('user/checkAuth', async (_, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return rejectWithValue('No token');

  try {
    const data = await refreshAuth(refreshToken);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    return rejectWithValue('Токен устарел');
  }
});

// --- Register user ---
export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (userData: UserData, { rejectWithValue }) => {
    return fetch(`${URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(checkResponse)
      .catch(error => rejectWithValue(error.message));
  }
);

// --- Login user ---
export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    return fetch(`${URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    .then(checkResponse)
    .catch(error => rejectWithValue(error.message));
  //   try {
  //     const response = await fetch(`${URL}/auth/login`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(credentials),
  //     });

  //     const data = await checkResponse(response);

  //     localStorage.setItem('accessToken', data.accessToken); // Сохраняем токен

  //     return data;
  //   } catch (error: Error) {
  //     return rejectWithValue(error.message);
  //   }
  }
);

// --- Logout user ---
export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (refreshToken: string, { rejectWithValue }) => {
    return fetch(`${URL}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
      .then(checkResponse)
      .catch(error => rejectWithValue(error.message));
  }
);

// --- Get events ---
export const getEventsThunk = createAsyncThunk(
  'events/getAll',
  async (_, { rejectWithValue }) => {
    return fetch(`${URL}/events`)
      .then(checkResponse)
      .catch(error => rejectWithValue(error.message));
  }
);

// --- Create event ---
export const createEventThunk = createAsyncThunk(
  'events/create',
  async (eventData: EventData, { rejectWithValue }) => {
    const { token, ...payload } = eventData;

    return fetch(`${URL}/events`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
      .then(checkResponse)
      .catch(error => rejectWithValue(error.message));
  }
);

// export const createEventThunk = createAsyncThunk(
//   'events/create',
//   async (eventData: EventData, { rejectWithValue }) => {
//     try {
//       const { token, ...payload } = eventData;

//       const response = await fetch(`${URL}/events`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(payload),
//       });

//       return await checkResponse(response);
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
