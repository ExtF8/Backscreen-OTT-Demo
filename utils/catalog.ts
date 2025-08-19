import type { Catalog } from '../types/Catalog';
import type { Movie } from '../types/Movies';
import rawJSON from '../data/catalog.json';

// Validates at runtime that data.itmes is an array
// Returns Movie array, Movie[]
export function getMovies(): Movie[] {
    const data = rawJSON as Catalog;

    if (!data || !Array.isArray(data.items)) {
        throw new Error('Invalid catalog.json: expected { items: Movie[] }');
    }

    return data.items;
}
