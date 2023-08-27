import { GridRowSelectionType } from '../../../types';
import { MovieDataType } from '../../../types';

export const UI_SLICE_ID = 'ui';

export type UIStateSlice = {
  moviesList: Array<MovieDataType> | [];
  selectedMovie: MovieDataType | {};
  totalMovies: number;
  layoutDataLoaded: boolean;
  refreshFlag: boolean;
  selectedRowIndex: GridRowSelectionType;
};

export type UIStoreSlice = { [UI_SLICE_ID]: UIStateSlice };
