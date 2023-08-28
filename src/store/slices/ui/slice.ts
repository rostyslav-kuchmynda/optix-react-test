import { createSlice } from '@reduxjs/toolkit';

import {
  uiFetchMoviesData,
  uiSelectMovie,
  uiSetSelectedRowIndex,
  uiTriggerRefresh,
  uiClearSelectedRowIndex,
  uiSetSuccessMessage,
  uiOpenModalForm,
  uiCloseModalForm,
  uiSetIsSmallDevice,
} from './actions';

import { UI_SLICE_ID, UIStateSlice } from './types';

const uiInitialState: UIStateSlice = {
  moviesList: [],
  selectedMovie: {},
  selectedRowIndex: [],

  totalMovies: 0,
  successMessage: '',

  layoutDataLoaded: false,
  refreshFlag: true,
  isModalFormOpen: false,
  isSmallDevice: false,
};

export const uiSlice = createSlice({
  name: UI_SLICE_ID,
  initialState: uiInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(uiFetchMoviesData.fulfilled, (state, { payload }) => {
      state.layoutDataLoaded = true;
      state.moviesList = payload;
      state.totalMovies = payload.length;
    });

    builder.addCase(uiTriggerRefresh, state => {
      state.layoutDataLoaded = false;
      state.refreshFlag = !state.refreshFlag;
    });

    builder.addCase(uiSelectMovie, (state, { payload }) => {
      state.selectedMovie = payload;
    });

    builder.addCase(uiSetSelectedRowIndex, (state, { payload }) => {
      state.selectedRowIndex = payload;
    });

    builder.addCase(uiClearSelectedRowIndex, state => {
      state.selectedRowIndex = [];
    });

    builder.addCase(uiSetSuccessMessage, (state, { payload }) => {
      state.successMessage = payload;
    });

    builder.addCase(uiOpenModalForm, state => {
      state.isModalFormOpen = true;
    });

    builder.addCase(uiCloseModalForm, state => {
      state.isModalFormOpen = false;
    });

    builder.addCase(uiSetIsSmallDevice, (state, { payload }) => {
      state.isSmallDevice = payload;
    });
  },
});
