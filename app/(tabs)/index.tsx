import { Link, RelativePathString } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DATA = [...Array(24)].map((_, index) => ({
  id: index.toString(),
  title: (index + 1).toString(),
}));

const Item = ({ title }: { title: string }) => (
  <Link href={`/day${title}/` as RelativePathString} asChild>
    <TouchableOpacity
      onPress={() => {
        console.log('item pressed', title);
      }}
      style={styles.item}>
      <Text>{title}</Text>
    </TouchableOpacity>
  </Link>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyArea}>
        <Text style={styles.emptyAreaText}>
          Welcome to Devember
        </Text>
      </View>
      <FlatList
        style={styles.listArea}
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
  },
  item: {
    backgroundColor: '#3f3f3f',
    padding: 30,
    borderRadius: 10,
    borderWidth: .3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    aspectRatio: 1,
    margin: 12,
  },
  listArea: {
    flex: 1,
    backgroundColor: '#06232b',
    padding: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  emptyArea: {
    height: 200,
  },
  emptyAreaText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 100,
  },
});
