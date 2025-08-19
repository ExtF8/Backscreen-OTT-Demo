import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../types/Movies';
import { getMovies } from '../utils/catalog';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function PlayerScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const movies: Movie[] = getMovies();
    const movie = movies.find(movie => movie.id === id) ?? null;



    // Create player
    // if video not found yet pass null
    const source = movie?.streamUrl ?? null;

    const player = useVideoPlayer(source, p => {
        // Call player loop when player is reay for the current source
        p.loop = false;

        // Auto play when ready
        try {
            p.play();
        } catch (err) {
            console.error('Video playback failed: ', err);

        }
    });



    // Handle not found
    if (!movie) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Movie not found</Text>
                <Pressable
                    onPress={() => router.back()}
                    style={({ pressed }) => [styles.secondaryButton, pressed && { opacity: 0.6 }]}
                    focusable
                    accessibilityRole='button'
                >
                    <Text style={styles.secondaryText}>Back</Text>
                </Pressable>
            </View>
        );
    }

    // Render video
    // Loading and errors
    return (
        <View style={styles.container}>
            <VideoView
                style={styles.video}
                player={player}
                contentFit='contain'
                nativeControls
                allowsFullscreen
                crossOrigin='anonymous'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    video: { flex: 1 },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    error: {
        marginBottom: 12,
        textAlign: 'center',
        color: '#b6b6b6',
    },
    secondaryText: {
        fontSize: 16,
        color: '#b6b6b6',
    },
    secondaryButton: {
        marginTop: 8,
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 6,
        backgroundColor: '#333333',
    },
});
