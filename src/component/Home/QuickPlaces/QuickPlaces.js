import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddHome from './AddHome';
import AddWork from './AddWork';
import Favorites from './Favorites';

/**
 * QuickPlaces component
 * Row of quick destination shortcuts (Add Home, Add Work, Saved Places)
 */
const QuickPlaces = ({
  onAddHome,
  onAddWork,
  onFavorites,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <AddHome onPress={onAddHome || (() => console.log('Add home'))} />
      <AddWork onPress={onAddWork || (() => console.log('Add work'))} />
      <Favorites onPress={onFavorites || (() => console.log('Saved places'))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
});

export { QuickPlaces };
export default QuickPlaces;
