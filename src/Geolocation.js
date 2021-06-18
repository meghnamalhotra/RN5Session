/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const GeolocationComponent = () => {
  const [position, setPosition] = useState(null);
  const [lastPosition, setLastPosition] = useState(null);
  const watchIDRef = useRef(null);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      error => console.log('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    watchIDRef.current = Geolocation.watchPosition(pos => {
      setLastPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });

    return () => {
      watchIDRef.current !== null && Geolocation.clearWatch(watchIDRef.current);
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Initial position: </Text>
        <Text>Latitude: {position?.latitude} </Text>
        <Text>Longitude: {position?.longitude} </Text>
        <Text style={styles.headerText}>Current position: </Text>
        <Text>Latitude: {lastPosition?.latitude} </Text>
        <Text>Longitude: {lastPosition?.longitude}</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'purple',
  },
});
export default GeolocationComponent;
