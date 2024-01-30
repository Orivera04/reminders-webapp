import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
      isLoading: false,
      language: 'en'
    },
    reducers: {
      onOpenLoader: (state) => {
        state.isLoading = true;
      },
      onCloseLoader: (state) => {
        state.isLoading = false;
      }
    }
});

export const { onOpenLoader, onCloseLoader } = uiSlice.actions;
