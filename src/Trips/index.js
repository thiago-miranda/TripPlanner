import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Trip from './Trip';
import isIphoneX from '../utils/IsIphoneX';
import MapView from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

const TripsScreen = ({navigation}) => {
  const [trips, setTrips] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
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
  const map = React.useRef();

  const handleItemChange = info => {
    const {viewableItems} = info;
    if (viewableItems && viewableItems.length > 0) {
      const [item] = viewableItems;
      console.log(item);
      map.current.animateToRegian(
        regionFrom(item.item.latitude, item.item.longitude, 1000),
        4000,
      );
    }
  };
  const regionFrom = (lat, lon, distance) => {
    distance = distance / 2;
    const circumference = 40075;
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const angularDistance = distance / circumference;

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = Math.abs(
      Math.atan2(
        Math.sin(angularDistance) * Math.cos(lat),
        Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat),
      ),
    );
    setLatitude(lat);
    setLongitude(lon);

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
    };
  };

  const onViewRef = React.useRef(viewableItems => {
    handleItemChange(viewableItems);
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 100});

  const renderItem = item => {
    return (
      <Trip
        onPress={() => {
          navigation.navigate('Trip', {
            id: item.item.id,
            refresh: loadData,
          });
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
          ref={map} //verificar referência
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
            keyExtractor={item => toString(item.id)}
            style={[isIphoneX() ? {marginBottom: 20} : null]}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
        </View>
      </View>
    </View>
  );
};

export default TripsScreen;
