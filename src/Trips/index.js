import React from 'react';
import {View, Text, FlatList} from 'react-native';
import Trip from './Trip';
import isIphoneX from '../utils/IsIphoneX';

const TripsScreen = ({navigation}) => {
  const trips = [
    {
      id: '1',
      name: 'Eurotrip 2020',
      price: 'R$ 5000',
    },
    {
      id: '2',
      name: 'Expedição Atacama',
      price: 'R$ 3000',
    },
  ];

  const renderItem = item => {
    return (
      <Trip
        onPress={() => {
          navigation.navigate('Trip');
        }}
        title={item.item.name}
        price={item.item.price}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>Mapa</Text>
      </View>
      <View style={{backgroundColor: 'pink'}}>
        <View>
          <FlatList
            data={trips}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            keyExtractor={item => item.id}
            style={[isIphoneX() ? {marginBottom: 20} : null]}
          />
        </View>
      </View>
    </View>
  );
};

export default TripsScreen;
