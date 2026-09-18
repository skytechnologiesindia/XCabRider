import React from 'react';
import { View } from 'react-native';
import styles from '../../../assets/styles';
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
    <View
      style={[
        styles.pdh20,
        styles.mb16,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        containerStyle,
      ]}
    >
      <AddHome onPress={onAddHome || (() => console.log('Add home'))} />
      <AddWork onPress={onAddWork || (() => console.log('Add work'))} />
      <Favorites onPress={onFavorites || (() => console.log('Saved places'))} />
    </View>
  );
};

export { QuickPlaces };
export default QuickPlaces;
