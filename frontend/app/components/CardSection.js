import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Card from './Card';
import routes from '../navigation/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import { useDispatch } from 'react-redux';
import {
  getAllPlacesAction,
  getNearbyPlacesAction,
  getPlacesByCatagoryAction
} from '../actions/placeActions';

const CardSection = ({ title, data, navigation }) => {
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
            dispatch(getPlacesByCatagoryAction('restaurant'));
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
                  data: item
                })
              }
            >
              <Card
                title={item.name}
                distance={'0.2 Km'}
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
