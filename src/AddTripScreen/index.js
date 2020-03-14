import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';

const AddTripScreen = ({navigation: {goBack}}) => {
  const trip = {
    name: 'Eurotrip 2020',
    price: 'R$ 5000',
    places: [
      {
        id: '1',
        name: 'Amsterdan',
        description: 'Chegada',
        price: 100,
        lat: 0,
        long: 0,
      },
      {
        id: '2',
        name: 'Bruxelas',
        description: 'Hospedagem',
        price: 100,
        lat: 0,
        long: 0,
      },
    ],
  };

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
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="white" size={25} />
          </TouchableOpacity>
        </View>
        <Text style={styles.tripName}>{trip.name}</Text>
        <Text style={styles.tripPrice}>{trip.price}</Text>
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
        onChangeText={text => setPrice(text)}
      />
      <TouchableOpacity style={styles.btn}>
        <Text>Salvar ponto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTripScreen;
