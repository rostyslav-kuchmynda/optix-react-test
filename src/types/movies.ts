export type MovieCompanyType = {
  id: string;
  name: string;
};

export type MovieType = {
  id: string;
  reviews: Array<number>;
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
};

export type MovieDataType = MovieCompanyType & MovieType;

export type DataTableTypes = {
  isLoaded: boolean;
  moviesData: Array<MovieDataType> | [];
};
