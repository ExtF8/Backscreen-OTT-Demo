import { useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Movie } from '../types/Movies';
import { getMovies } from '../utils/catalog';
import { Video, ResizeMode } from 'expo-av';

export default function PlayerScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const movies: Movie[] = getMovies();
    const movie = movies.find(movie => movie.id === id);

    // Local playback state
    const videoRef = useRef<Video | null>(null);

    // Handle not found
    if (!movie) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Movie not found</Text>
            </View>
        );
    }


    // Render video
    // Loading and errors
    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                testID='video-player'
                source={{ uri: movie.streamUrl }}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                useNativeControls
                shouldPlay
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    video: { flex: 1, },
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
