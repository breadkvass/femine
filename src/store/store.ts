import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import eventsReducer from './EventsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
