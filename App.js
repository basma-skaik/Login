import {StyleSheet, View} from 'react-native';
import React from 'react';
import LoginSection from './src/LoginSection';
import Register from './src/Register';

const App = () => {
  return (
    <View style={styles.container}>
      <LoginSection />
      {/* <Register /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
