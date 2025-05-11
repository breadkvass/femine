import { createSlice } from '@reduxjs/toolkit';
import { getEventsThunk, createEventThunk } from '../utils/api';
import { Event } from '../utils/types';

type EventState = {
  eventsList: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  eventsList: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getEventsThunk.pending, state => {
        state.loading = true;
      })
      .addCase(getEventsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsList = action.payload;
      })
      .addCase(getEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createEventThunk.fulfilled, (state, action) => {
        state.eventsList.push(action.payload);
      });
  },
});

export default eventsSlice.reducer;
