/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
const {width} = Dimensions.get('screen');

const VideoPlayerComponent = () => {
  const [paused, setPaused] = useState(true);
  const [videoProgressData, setVideoProgressData] = useState({});
  const onVideoProgress = eventData => {
    setVideoProgressData(eventData);
  };

  return (
    <View style={styles.container}>
      <View>
        <Video
          paused={paused}
          onProgress={onVideoProgress}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }} // Can be a URL or a local file.
          style={styles.backgroundVideo}
        />
        <Text style={styles.text}>
          CURRENT TIME: {videoProgressData?.currentTime?.toFixed(0)}
        </Text>
        <Text style={styles.text}>
          DURATION: {videoProgressData?.seekableDuration?.toFixed(0)}
        </Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => setPaused(true)}>
          <Text style={styles.text}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setPaused(false)}>
          <Text style={styles.text}>Play</Text>
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
  backgroundVideo: {
    height: 300,
    width: width,
    backgroundColor: '#FFFFFF',
  },
});
export default VideoPlayerComponent;
