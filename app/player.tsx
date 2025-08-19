import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Movie } from '../types/Movies';
import { getMovies } from '../utils/catalog';

export default function PlayerScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const movies: Movie[] = getMovies();
    const movie = movies.find(movie => movie.id === id);

    // Handle not found
    if (!movie) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Movie not found</Text>
            </View>
        );
    }

    // Local playback state

    // Render video
    // Loading and errors
    return (
        <View style={styles.container}>
            <Text>This will be a player screen.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    center: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        marginBottom: 12,
        textAlign: 'center',
        color: '#b6b6b6',
    },
});
