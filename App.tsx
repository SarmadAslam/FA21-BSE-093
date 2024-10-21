import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ProductList from './src/components/ProductList';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ProductList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
