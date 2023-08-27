import { MovieCompanyType, MovieType } from '../types';

export const averageRating = (ratingArray: Array<number>): number => {
  const sum = ratingArray.reduce((acc, rating) => acc + rating, 0);
  const average = sum / ratingArray.length;
  return Number(average.toFixed(1));
};

export const mergeMoviesDataByID = (movieCompanies: Array<MovieCompanyType>, movies: Array<MovieType>) => {
  const result: Array<MovieType & MovieCompanyType> = [];

  movieCompanies.forEach(company => {
    movies.forEach(movie => {
      if (company.id === movie.filmCompanyId) {
        result.push({ ...company, ...movie });
      }
    });
  });

  return result;
};
