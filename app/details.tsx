import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text>This will be a details screen or modal</Text>
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
