import { StyleSheet, Text, View } from 'react-native';

export default function PlayerScreen() {
    return (
        <View style={styles.container}>
            <Text>This will be a player screen.</Text>
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
