/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
const {width, height} = Dimensions.get('screen');
const MapsComponent = () => {
  const [region, setRegion] = useState(null);
  const [markerState, setMarkerState] = useState({
    latitude: 28.5355,
    longitude: 77.391,
  });
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={{height: height, width: width}}
        initialRegion={{
          latitude: 28.5355,
          longitude: 77.391,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={region}
        onRegionChange={reg => setRegion(reg)}>
        <Marker
          draggable={true}
          coordinate={markerState}
          title={'I AM HERE'}
          description={'I am waiting near petrol pump'}
          onDragEnd={event => {
            setMarkerState(event.nativeEvent.coordinate);
          }}
        />
      </MapView>
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
export default MapsComponent;
