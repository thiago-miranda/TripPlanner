import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import assets from './assets';
import isIphoneX from '../utils/IsIphoneX';

const HomeScreen = ({navigation}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <ImageBackground
      source={assets.background}
      imageStyle={{resizeMode: 'stretch'}}
      style={styles.background}>
      <View style={styles.wrapperLogoTripPlanner}>
        <Image source={assets.tripplanner} />
      </View>
      <View style={styles.wrapperLogoDevPleno}>
        <Image source={assets.devpleno} />
      </View>
      {!show ? (
        <TouchableWithoutFeedback
          onPress={() => {
            handleShow();
          }}>
          <View
            style={[
              styles.buttonBackground,
              isIphoneX() ? {paddingBottom: 32} : null,
            ]}>
            <Text style={styles.buttonText}>COMEÇAR!</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Trips');
          }}>
          <View style={styles.buttonEmptyStateBackground}>
            <SimpleLineIcons
              style={styles.pin}
              name="location-pin"
              color="black"
              size={50}
            />
            <Text style={styles.buttonEmptyStateText}>
              Vamos planejar sua primeira viagem?
            </Text>
            <MaterialCommunityIcons
              name="arrow-right"
              color="black"
              size={20}
              style={[styles.arrow, isIphoneX() ? {marginBottom: 16} : null]}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </ImageBackground>
  );
};

export default HomeScreen;
