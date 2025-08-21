import { getMovies } from '../utils/catalog';

describe('getMovies utility', () => {
    it('returns an array of movies with required fields', () => {
        const movies = getMovies();

        expect(Array.isArray(movies)).toBe(true);
        expect(movies.length).toBeGreaterThan(0);

        for (const movie of movies) {
            expect(typeof movie.id).toBe('string');
            expect(typeof movie.title).toBe('string');
            expect(typeof movie.description).toBe('string');
            expect(typeof movie.thumbnail).toBe('string');
            expect(typeof movie.streamUrl).toBe('string');
            expect(typeof movie.duration).toBe('number');
        }
    });
});
