import { GridRowSelectionType, MovieDataType } from '../../../types';

export const UI_SLICE_ID = 'ui';

export type UIStateSlice = {
  moviesList: Array<MovieDataType> | [];
  selectedMovie: MovieDataType | {};
  totalMovies: number;
  layoutDataLoaded: boolean;
  refreshFlag: boolean;
  selectedRowIndex: GridRowSelectionType;
  successMessage: string;
};

export type UIStoreSlice = { [UI_SLICE_ID]: UIStateSlice };
