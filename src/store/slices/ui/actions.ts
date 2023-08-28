import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { MoviesService } from '../../../services/movies';

import { GridRowSelectionType, MovieDataType } from '../../../types';
import { mergeMoviesDataByID } from '../../../utils/array';
import { UI_SLICE_ID } from '../ui/types';

export const uiOpenModalForm = createAction(`${UI_SLICE_ID}/openModal`);
export const uiCloseModalForm = createAction(`${UI_SLICE_ID}/closeModal`);
export const uiTriggerRefresh = createAction(`${UI_SLICE_ID}/triggerRefresh`);
export const uiSetIsSmallDevice = createAction(`${UI_SLICE_ID}/isSmallDevice`, (isSmall: boolean) => {
  return { payload: isSmall };
});
export const uiSetSuccessMessage = createAction(`${UI_SLICE_ID}/successMsg`, (message: string) => {
  return { payload: message };
});

export const uiSelectMovie = createAction(`${UI_SLICE_ID}/selectMovie`, (movie: MovieDataType) => {
  return { payload: movie };
});

export const uiSetSelectedRowIndex = createAction(`${UI_SLICE_ID}/selectedRow`, (row: GridRowSelectionType) => {
  return { payload: row };
});

export const uiClearSelectedRowIndex = createAction(`${UI_SLICE_ID}/clearSelectedRow`);

export const uiFetchMoviesData = createAsyncThunk(`${UI_SLICE_ID}/fetchMoviesData`, async () => {
  try {
    const [companies, movies] = await Promise.all([MoviesService.getMovieCompanies(), MoviesService.getMovies()]);
    if (companies?.length && movies?.length) {
      const mergedData = mergeMoviesDataByID(companies, movies);

      return mergedData;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Failed to delete the movie data. Ended with error:', (error as Error).message);

    return [];
  }
});
