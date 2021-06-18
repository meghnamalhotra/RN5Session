/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import TrackPlayer, {useTrackPlayerProgress} from 'react-native-track-player';
const {width} = Dimensions.get('screen');
const tracks = [
  {
    id: '1111',
    url: 'https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj',
    title: 'Longing',
    artist: 'David Chavez',
    artwork: require('./images/img1.jpg'),
    duration: 143,
  },
  {
    id: '2222',
    url: 'https://drive.google.com/uc?export=download&id=1VM9_umeyzJn0v1pRzR1BSm9y3IhZ3c0E',
    title: 'Soul Searching (Demo)',
    artist: 'David Chavez',
    artwork: require('./images/img2.jpg'),
    duration: 77,
  },
  {
    id: '3333',
    url: 'https://drive.google.com/uc?export=download&id=1bmvPOy2IVbkUROgm0dqiZry_miiL4OqI',
    title: 'Lullaby (Demo)',
    artist: 'David Chavez',
    artwork: require('./images/img3.jpg'),
    duration: 71,
  },
  {
    id: '4444',
    url: 'https://drive.google.com/uc?export=download&id=1V-c_WmanMA9i5BwfkmTs-605BQDsfyzC',
    title: 'Rhythm City (Demo)',
    artist: 'David Chavez',
    artwork: require('./images/img4.jpg'),
    duration: 106,
  },
];
const TrackPlayerComponent = () => {
  const {position, duration} = useTrackPlayerProgress();
  const [currentTrack, setCurrentTrack] = useState({});
  useEffect(() => {
    initiateAudioPlayer();
    return () => TrackPlayer.destroy();
  }, []);

  const initiateAudioPlayer = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add(tracks);
    setCurrentTrack(tracks[0]);

    // Start playing it
  };
  const setCurrentTrackObj = async () => {
    const getTrackId = await TrackPlayer.getCurrentTrack();
    const trackData = await TrackPlayer.getTrack(getTrackId);
    setCurrentTrack(trackData);
  };
  const onNextPress = async () => {
    await TrackPlayer.skipToNext();
    setCurrentTrackObj();
  };
  const onPrevPress = async () => {
    await TrackPlayer.skipToPrevious();
    setCurrentTrackObj();
  };
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={currentTrack?.artwork} />
        <Text style={styles.text}>{currentTrack?.title}</Text>
        <Text style={styles.text}>{currentTrack?.artist}</Text>
        <Text style={styles.text}>{position.toFixed(0)}</Text>
        <Text style={styles.text}>{duration.toFixed(0)}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.pause()}>
          <Text style={styles.text}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => TrackPlayer.play()}>
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            onPrevPress();
          }}>
          <Text style={styles.text}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            onNextPress();
          }}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btn: {
    backgroundColor: '#ff0044',
    padding: 15,
    borderRadius: 5,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    height: 300,
    width: width,
  },
});
export default TrackPlayerComponent;
