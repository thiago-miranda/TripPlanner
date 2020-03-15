import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import AsyncStorage from '@react-native-community/async-storage';

const AddTripScreen = ({route, navigation}) => {
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <View style={styles.wrapperInfo}>
          <Text style={styles.itemName}>{item.item.name}</Text>
          <Text>{item.item.description}</Text>
        </View>
        <View style={styles.wrapperItemPrice}>
          <Text style={styles.itemPrice}>{item.item.price}</Text>
        </View>
      </View>
    );
  };
  const [trip, setTrip] = useState('');

  const handlerSave = async () => {
    const newTrip = {
      id: new Date().getTime(),
      trip,
      price: 0,
      latitude: 0,
      longitude: 0,
    };
    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = [];
    if (tripsAS) {
      trips = JSON.parse(tripsAS);
    }
    trips.push(newTrip);
    console.log('trip', trips);
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
    //navigation.navigate('AddPoint', {id: newTrip.id});
    const {refresh} = route.params;
    navigation.goBack(refresh());
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Nome da viagem"
        onChangeText={text => setTrip(text)}
      />
      <TouchableOpacity style={styles.btn} onPress={() => handlerSave(trip)}>
        <Text>Salvar Viagem</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTripScreen;
