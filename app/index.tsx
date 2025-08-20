import { useEffect, useState } from 'react';
import {
    Image,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';

import { Movie } from '../types/Movies';
import { Link } from 'expo-router';
import { getMovies } from '../utils/catalog';

export default function HomeScreen() {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [focusedId, setFocusedId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
    return (
        <View style={styles.container}>
            <FlatList
                data={movies!}
                numColumns={3}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <Link
                        style={styles.card}
                        href={{ pathname: '/details', params: { id: item.id } }}
                        asChild
                    >
                        <Pressable
                            onFocus={() => setFocusedId(item.id)}
                            onBlur={() => setFocusedId(null)}
                            style={({ pressed }) => [
                                pressed && styles.pressed,
                                focusedId === item.id && styles.focused,
                            ]}
                            focusable
                            accessibilityRole='button'
                        >
                            <Image source={{ uri: item.thumbnail }} style={styles.poster} />
                            <Text style={styles.title} numberOfLines={1}>
                                {item.title}
                            </Text>
                        </Pressable>
                    </Link>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    listContent: {
        width: '100%',
        height: 300,
        paddingTop: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    card: {
        width: '30%',
        height: 'auto',
        marginHorizontal: 16,
        alignItems: 'center',
    },
    poster: {
        width: '100%',
        height: '80%',
        borderRadius: 6,
    },
    title: {
        marginTop: 6,
        marginBottom: 8,
        fontSize: 22,
        textAlign: 'center',
        color: '#eaedee',
    },
    pressed: {
        opacity: 0.8,
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
