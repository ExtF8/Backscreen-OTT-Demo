import { StyleSheet, View, Text, Pressable, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Movie } from '../types/Movies';
import { getMovies } from '../utils/catalog';

export default function DetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

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

    // Render poster, title, description, play button
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: movie.thumbnail }}
                resizeMode='cover'
                style={styles.backgroundImage}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.description}>{movie.description}</Text>
                    <Pressable
                        focusable
                        accessibilityRole='button'
                        onPress={() =>
                            router.push({ pathname: '/player', params: { id: movie.id } })
                        }
                        style={({ pressed }) => [styles.playButton, pressed && styles.playPressed]}
                    >
                        <Text style={styles.playText}>Play</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    titleContainer: {
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: '#00000099'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#eaedee',
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        fontSize: 26,
        marginBottom: 16,
        textAlign: 'center',
        color: '#eaedee',
    },
    playButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 6,
        backgroundColor: '#e50914',
    },
    playPressed: {
        opacity: 0.5,
    },
    playText: {
        color: '#eaedee',
        fontSize: 18,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    error: {
        marginTop: 24,
        textAlign: 'center',
        color: '#eaedee',
    },
});
