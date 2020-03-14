import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TripScreen = ({navigation: {goBack}}) => {
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

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialCommunityIcons name="arrow-left" color="white" size={25} />
          </TouchableOpacity>
        </View>
        <Text style={styles.tripName}>{trip.name}</Text>
        <Text style={styles.tripPrice}>{trip.price}</Text>
      </View>
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 16, paddingLeft: 16}}
        data={trip.places}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TripScreen;
