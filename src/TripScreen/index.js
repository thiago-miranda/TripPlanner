import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TripScreen = ({route, navigation}) => {
  const [trip, setTrip] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const {id} = route.params;
    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = [];
    if (tripsAS) {
      trips = JSON.parse(tripsAS);
    }

    const pointsAS = await AsyncStorage.getItem('trip-' + id);
    let points = [];
    if (pointsAS) {
      points = JSON.parse(pointsAS);
    }
    let trip = {
      trip: '',
      price: 0,
    };
    console.log('trips', trips);
    trips.forEach(t => {
      if (t.id === id) {
        trip.trip = t.trip;
        trip.price = t.price ? t.price : 0;
      }
    });

    setTrip(trip);
    setPoints(points);
  };
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <View style={styles.wrapperInfo}>
          <Text style={styles.itemName}>{item.item.pointName}</Text>
          <Text>{item.item.description}</Text>
        </View>
        <View style={styles.wrapperItemPrice}>
          <Text style={styles.itemPrice}>R$ {item.item.price.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="white" size={25} />
          </TouchableOpacity>
        </View>
        <Text style={styles.tripName}>{trip.trip}</Text>
        <Text style={styles.tripPrice}>
          R$ {parseFloat(trip.price).toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddPoint', {
              id: route.params.id,
              refresh: loadData,
            })
          }
          style={{position: 'absolute', bottom: 40, right: 20, padding: 10}}>
          <MaterialIcons name="add-location" color="white" size={40} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 16, paddingLeft: 16}}
        data={points}
        renderItem={renderItem}
        //keyExtractor={item => item.id.toString()}
        keyExtractor={item => toString(item.id)}
      />
    </View>
  );
};

export default TripScreen;
