import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './components/MainComponent';
export default function App() {
  return (
    <View style={styles.backgroundColor}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    backgroundColor: '#00A6FF'
  }
});
