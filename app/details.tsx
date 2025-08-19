import { StyleSheet, View, Text } from 'react-native';
import { useLocalSearchParams, } from 'expo-router';
import { Movie } from '../types/Movies';
import { getMovies } from '../utils/catalog';

export default function DetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();


    const movies: Movie[] = getMovies();
    const movie = movies.find(movie => movie.id === id);
    return (
        <View style={styles.container}>
            <Text>{movie ? movie.title : 'Movie not found'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
