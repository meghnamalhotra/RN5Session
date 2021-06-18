/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import GeolocationComponent from './src/Geolocation';
import MapsComponent from './src/Maps';
import TrackPlayerComponent from './src/TrackPlayer';
import VideoPlayerComponent from './src/VideoPlayer';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return <VideoPlayerComponent />;
};

export default App;
