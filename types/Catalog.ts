import type { Movie } from "./Movies";

// Describes the shape of catalog JSON as an object with items (movies) array
export type Catalog = {
    items: Movie[];
}