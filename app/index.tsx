import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import localCatalog from '@/data/catalog.json';
import { Movie } from '@/types/Movies';


export default function HomeScreen() {
    const [focusedId, setFocusedId] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            <Text>This will be a Home screen.</Text>
            <FlatList 
                data={catalog}
                numColumns={3}
                keyExtractor={({ item }) => item.id}
            />
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
