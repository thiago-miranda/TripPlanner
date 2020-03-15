import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Trip from './Trip';
import isIphoneX from '../utils/IsIphoneX';
import MapView from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

const TripsScreen = ({navigation}) => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = [];
    if (tripsAS) {
      trips = JSON.parse(tripsAS);
    }
    setTrips(trips);
  };

  const renderItem = item => {
    return (
      <Trip
        onPress={() => {
          navigation.navigate('Trip');
        }}
        title={item.item.trip}
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
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTrip', {refresh: loadData})}
          style={{position: 'absolute', bottom: 0, right: 20, padding: 10}}>
          <MaterialIcons name="add-location" color="white" size={40} />
        </TouchableOpacity>
      </View>
      <View>
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
