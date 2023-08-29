import { MovieCompanyType, MovieType } from '../types';

const { VITE_REACT_MOVIES_API } = import.meta.env;

export class MoviesService {
  static async getMovieCompanies(): Promise<Array<MovieCompanyType>> {
    try {
      const response = await fetch(`${VITE_REACT_MOVIES_API}/movieCompanies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const companies: Array<MovieCompanyType> = await response.json();

      return companies;
    } catch (error) {
      console.error('Failed to get companies. Ended with error:', (error as Error).message);

      return [];
    }
  }

  static async getMovies(): Promise<Array<MovieType>> {
    try {
      const response = await fetch(`${VITE_REACT_MOVIES_API}/movies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const movies: Array<MovieType> = await response.json();

      return movies;
    } catch (error) {
      console.error('Failed to get movies. Ended with error:', (error as Error).message);

      return [];
    }
  }

  static async submitReview(message: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${VITE_REACT_MOVIES_API}/submitReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: message }),
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to submit a review. Ended with error:', (error as Error).message);

      return { message: 'Failed to submit a review!' };
    }
  }
}
