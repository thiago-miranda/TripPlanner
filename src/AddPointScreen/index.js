import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';

const AddPointScreen = ({route, navigation}) => {
  //const {id} = route.params;

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
  const [position, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [pointName, setPointName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleSave = async () => {
    console.log('id trip', id);
    const id = 1584225435779;
    const pointsAS = await AsyncStorage.getItem('trip-' + id);
    let points = [];
    if (pointsAS) {
      points = JSON.parse(pointsAS);
    }
    points.push({position, pointName, description, price});
    await AsyncStorage.setItem('trip-' + id, JSON.stringify(points));

    let total = 0;
    points.forEach(p => {
      total += p.price;
    });

    const tripsAS = await AsyncStorage.getItem('trips');
    let trips = [];
    if (tripsAS) {
      trips = JSON.parse(tripsAS);
    }

    trips.forEach((trip, index) => {
      if (trip.id === id) {
        trips[index].price = total;
        trips[index].latitude = points[0].position.latitude;
        trips[index].longitude = points[0].position.longitude;
      }
    });
    console.log(trips);
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={position}
            onDragEnd={evt => setPosition(evt.nativeEvent.coordinate)}
            draggable
          />
        </MapView>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="white" size={25} />
          </TouchableOpacity>
        </View>
        <Text style={styles.tripName}>{pointName}</Text>
        <Text style={styles.tripPrice}>{price}</Text>
        <Text>
          Position: Lat - {position.latitude} Long - {position.longitude}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nome do Ponto"
        onChangeText={text => setPointName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        onChangeText={text => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        onChangeText={text => setPrice(parseFloat(text))}
      />
      <TouchableOpacity style={styles.btn} onPress={() => handleSave()}>
        <Text>Salvar ponto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPointScreen;
