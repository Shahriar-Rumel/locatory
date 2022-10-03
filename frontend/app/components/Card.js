import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import colors from '../config/colors';

const Card = ({ title, location, distance, imguri }) => {
  const styles = StyleSheet.create({
    card: {
      width: 200,
      backgroundColor: 'white',
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.9,
      shadowRadius: 2.65,
      clipTopadding: 0,
      elevation: 4,
      //   marginLeft: 20,
      marginHorizontal: 5,
      marginVertical: 10
    },
    bottom: {
      paddingHorizontal: 10,
      paddingVertical: 10
    },

    img: {
      backgroundColor: '#31244E',
      width: '100%',
      height: 120
    },
    title: {
      fontWeight: '700',
      fontSize: 16
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5
    },
    location: {
      fontWeight: '500',
      fontSize: 11,
      color: colors.gray
    },
    distance: {
      fontWeight: '500',
      fontSize: 11,
      color: colors.gray
    }
  });
  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.img}
        source={{
          uri: `${imguri}`
        }}
        resizeMode="cover"
      />
      <View style={styles.bottom}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.distance}>{distance}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
