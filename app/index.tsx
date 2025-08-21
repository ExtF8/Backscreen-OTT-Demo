import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getMovies } from '../utils/catalog';
import { Movie } from '../types/Movies';

export default function HomeScreen() {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [focusedId, setFocusedId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Load data
    useEffect(() => {
        try {
            // simulate async loading
            setTimeout(() => setMovies(getMovies()), 150);
        } catch (err) {
            console.error(err);
            setError('Failed to load catalog');
        }
    }, []);

    // Loading state
    if (!movies && !error) {
        return <ActivityIndicator size={'large'} color={'#4f1fff'} style={{ flex: 1 }} />;
    }

    // Error text
    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    // TODO: clean file type from titles
    // TODO: fix D-pad focus
    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {movies!.slice(0, 6).map((item) => {
                    const isFocused = focusedId === item.id;
                    return (
                        <Pressable
                            key={item.id}
                            onFocus={() => setFocusedId(item.id)}
                            onBlur={() => setFocusedId(null)}
                            onPress={() =>
                                router.push({ pathname: '/details', params: { id: item.id } })
                            }
                            focusable={true}
                            style={[
                                styles.card,
                                isFocused && styles.focused,
                                { transform: [{ scale: isFocused ? 1.05 : 1 }] },
                            ]}
                            accessibilityRole='button'
                        >
                            <Image source={{ uri: item.thumbnail }} style={styles.poster} />
                            <Text style={styles.title} numberOfLines={1}>
                                {item.title}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 20,
    },
    card: {
        width: '30%',
        margin: 12,
        alignItems: 'center',
    },
    poster: {
        width: '100%',
        height: 200,
        borderRadius: 6,
    },
    title: {
        marginTop: 6,
        fontSize: 18,
        color: '#eaedee',
        textAlign: 'center',
    },
    focused: {
        borderWidth: 2,
        borderColor: '#64a750',
    },
    error: {
        flex: 1,
        marginTop: 24,
        textAlign: 'center',
        color: '#f24c36',
    },
});
