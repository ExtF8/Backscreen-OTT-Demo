import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../types/Movies';
import { getMovies } from '../utils/catalog';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';

export default function PlayerScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const movies: Movie[] = getMovies();
    const movie = movies.find(movie => movie.id === id) ?? null;

    // UI error state for play retry failures
    const [explicitError, setExplicitError] = useState<string | null>(null);

    // Create player
    // if video not found yet pass null
    const source = movie?.streamUrl ?? null;

    const player = useVideoPlayer(source, p => {
        // Call when player is reay for the current source
        p.loop = false;

        // Auto play when ready
        try {
            p.play();
        } catch (err) {
            console.error('Video playback failed: ', err);
            setExplicitError('Failed to start playback');
        }
    });

    // Player events and errors
    const statusEvent = useEvent(player, 'statusChange', { status: player.status });
    const status = statusEvent.status;
    const errorObj = (statusEvent as any).error;

    const isLoading = status === 'loading' || status === 'idle';
    const effectiveError = explicitError || (errorObj?.message ?? null);

    // Retry loading video if some errors
    const retry = async () => {
        try {
            setExplicitError(null);
            player.replace(source);
            player.play();
        } catch (error) {
            console.error(error);
            setExplicitError('Retry failed');
        }
    };

    // Handle not found
    if (!movie) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Movie not found</Text>
                <Pressable
                    onPress={() => router.replace('/')}
                    style={({ pressed }) => [styles.secondaryButton, pressed && { opacity: 0.6 }]}
                    focusable
                    accessibilityRole='button'
                >
                    <Text style={styles.text}>Back</Text>
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

            {isLoading && (
                <View style={styles.overlayCenter}>
                    <ActivityIndicator size={'large'} />
                </View>
            )}

            {effectiveError && (
                <View style={styles.overlayCenter}>
                    <Text style={styles.error}>Playback error. Please try again.</Text>

                    <Pressable
                        onPress={retry}
                        style={({ pressed }) => [
                            styles.secondaryButton,
                            pressed && { opacity: 0.6 },
                        ]}
                        focusable
                        accessibilityRole='button'
                    >
                        <Text style={styles.text}>Retry</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.replace('/')}
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && { opacity: 0.85 },
                        ]}
                        focusable
                        accessibilityRole='button'
                    >
                        <Text style={styles.text}>Back</Text>
                    </Pressable>
                </View>
            )}
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
    overlayCenter: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButton: {
        marginTop: 4,
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 6,
        backgroundColor: '#e50914',
    },
    text: {
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
    error: {
        marginBottom: 12,
        textAlign: 'center',
        color: '#b6b6b6',
    },
});
