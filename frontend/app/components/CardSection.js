import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Card from './Card';
import routes from '../navigation/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPlacesAction,
  getNearbyPlacesAction,
  getPlacesByCatagoryAction
} from '../actions/placeActions';

const CardSection = ({ title, data, navigation, isReady }) => {
  const styles = StyleSheet.create({
    cardContainer: {
      marginVertical: 0,
      overflow: 'visible',
      width: '110%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: -15
    },
    cardContainerWrapper: {
      paddingHorizontal: 10,
      overflow: 'visible'
    },
    container: {
      marginVertical: 15
    },

    forYou: {
      fontWeight: '700',
      fontSize: 18,
      fontFamily: 'SFPD-bold'
    },
    reload: {
      position: 'absolute',
      right: 5,
      top: 7
    }
  });

  const getFirstTenChars = (data) => {
    const array = data?.split('') ? data?.split('') : 'loading';
    let ans = '';
    for (let i = 0; i <= 20; i++) ans += array[i];
    for (let i = 1; i <= 3; i++) ans += ' .';

    return ans;
  };

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData);
  const {
    userDetails,
    loading: userDataLoading,
    error: userDataError
  } = userData;

  const getDistance = (item) => {
    let lat1 = 0;
    let lat2 = 0;
    let lon1 = 0;
    let lon2 = 0;

    if (item?.location) {
      lat1 = item?.location?.coordinates[1]
        ? item?.location?.coordinates[1]
        : 0;
      lat2 = userDetails?.data?.location?.coordinates[1]
        ? userDetails?.data?.location?.coordinates[1]
        : 0;

      lon1 = item?.location?.coordinates[0];
      lon2 = userDetails?.data?.location?.coordinates[0]
        ? userDetails?.data?.location?.coordinates[0]
        : 0;
    }
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    const res = d / 1000;

    return res.toFixed(2) + ' Km';
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.forYou}>{title}</Text>
        <MaterialCommunityIcons
          name="reload"
          size={16}
          color={colors.gray}
          style={styles.reload}
          onPress={() => {
            dispatch(getNearbyPlacesAction());
            dispatch(getPlacesByCatagoryAction('tourist'));
            dispatch(getAllPlacesAction());
          }}
        />
      </View>
      <View style={styles.cardContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.cardContainerWrapper}
        >
          {data.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate(routes.LOCATION_DETAILS, {
                  data: item._id
                })
              }
            >
              <Card
                title={item.name}
                distance={!isReady && !userDataLoading ? getDistance(item) : 0}
                location={
                  item?.location?.formattedAddress?.length > 20
                    ? getFirstTenChars(item?.location?.formattedAddress)
                    : item?.location?.formattedAddress
                }
                imguri={item.photo}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CardSection;
