import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
const Loading = props => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
      <Text style={{color: 'black'}}>Loading {props.loadingText}</Text>
    </View>
  );
};

export default Loading;
