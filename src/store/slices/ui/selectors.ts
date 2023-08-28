import { createSelector } from '@reduxjs/toolkit';
import { UIStoreSlice, UI_SLICE_ID } from './types';

const rootUISelector = (state: UIStoreSlice) => state[UI_SLICE_ID];

export const getMoviesList = createSelector(rootUISelector, state => state.moviesList);
export const getRefreshFlag = createSelector(rootUISelector, state => state.refreshFlag);
export const getTotalMovies = createSelector(rootUISelector, state => state.totalMovies);
export const getIsLoading = createSelector(rootUISelector, state => state.layoutDataLoaded);
export const getSelectedMovie = createSelector(rootUISelector, state => state.selectedMovie);
export const getSelectedRowIndex = createSelector(rootUISelector, state => state.selectedRowIndex);
export const getSuccessMessage = createSelector(rootUISelector, state => state.successMessage);
export const getIsModalOpen = createSelector(rootUISelector, state => state.isModalFormOpen);
export const getIsSmallDevice = createSelector(rootUISelector, state => state.isSmallDevice);
