import React, { useCallback, useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  RefreshControl,
  FlatList
} from 'react-native';

import colors from '../config/colors';
import Screen from '../components/Screen';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { deleteReview, getReviewsByUser } from '../actions/reviewActions';
import routes from '../navigation/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getPlacesByUserAction } from '../actions/placeActions';

const PlacesListSection = ({ navigation, route }) => {
  const renderItem = ({ item }) => {
    const styles = StyleSheet.create({
      bottomContainer: {
        position: 'relative',
        overflow: 'visible'
      },
      createdAt: {
        color: colors.gray,
        fontSize: 12
      },
      deleteButton: {
        position: 'absolute',
        left: 240,
        marginTop: -2
      },
      img: {
        width: 60,
        height: 60,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      },
      item: {
        backgroundColor: colors.white,
        marginVertical: 0.5,
        paddingHorizontal: 18,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.light
      },
      content: {
        width: '80%'
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 14,
        width: '100%',
        color: colors.black,
        fontWeight: '400'
      },
      notificationTop: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      name: {
        fontWeight: '600',
        color: colors.primary
      },
      desc: {
        color: colors.gray,
        marginBottom: 10,
        fontSize: 12
      },
      dpLetter: {
        fontSize: 30,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: colors.white
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        marginTop: 5,
        right: 20,
        top: 30,
        width: 60
      }
    });

    let day = 0;
    let hour = 0;
    let minute = 0;
    let second = 0;

    const getElapsedTime = (t2) => {
      const t1 = new Date().getTime();

      let ts = (t1 - t2.getTime()) / 1000;

      var d = Math.floor(ts / (3600 * 24));
      var h = Math.floor((ts % (3600 * 24)) / 3600);
      var m = Math.floor((ts % 3600) / 60);
      var s = Math.floor(ts % 60);

      if (d) day = d;
      if (h) hour = h;
      if (m) minute = m;
      if (s) second = s;
    };

    getElapsedTime(new Date(item?.createdAt?.split('.')[0]));

    const getFirstHundredChars = (data) => {
      const array = data?.split('') ? data?.split('') : 'loading';
      let ans = '';
      for (let i = 0; i <= 45; i++) ans += array[i];
      for (let i = 1; i <= 3; i++) ans += ' .';

      return ans;
    };
    const deleteHandler = () => {
      dispatch(deleteReview(item._id));
      dispatch(getReviewsByUser());
    };

    const list = [1, 2, 3, 4, 5];

    return (
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate(routes.LOCATION_DETAILS, {
            data: item._id
          })
        }
        key={item._id}
      >
        <View style={styles.notificationTop}>
          <ImageBackground
            style={styles.img}
            source={{
              uri: `${item?.photo}`
            }}
            resizeMode="cover"
          />

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.name}>{item.name}</Text>
              <View>
                <Text style={styles.like}>
                  <View style={styles.ratingContainer}>
                    {list.map((_item, index) => (
                      <MaterialCommunityIcons
                        name={
                          item.averageRating > index ? 'star' : 'star-outline'
                        }
                        size={12}
                        color={colors.secondary}
                        key={index}
                      />
                    ))}
                  </View>
                </Text>
              </View>
            </View>
            <Text style={styles.desc}>
              {item?.reviewdescription?.length > 45
                ? getFirstHundredChars(item?.country)
                : item?.location.formattedAddress}
            </Text>
            <View style={styles.bottomContainer}>
              {day ? (
                <Text style={styles.createdAt}>{day} days ago</Text>
              ) : hour ? (
                <Text style={styles.createdAt}>{hour} hours ago</Text>
              ) : minute ? (
                <Text style={styles.createdAt}>{minute} minutes ago </Text>
              ) : (
                <Text style={styles.createdAt}>{second} seconds ago </Text>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const dispatch = useDispatch();

  const placesbyUserData = useSelector((state) => state.placesbyUserData);

  const { placesbyUser, loading } = placesbyUserData;

  const FlatListTop = (
    <FlatListHeaders
      route={route}
      navigation={navigation}
      loading={loading}
      reviewsByUser={placesbyUser}
    />
  );

  useEffect(() => {
    dispatch(getPlacesByUserAction());
  }, []);

  const data = [
    {
      name: 'Shahriar Rumel',
      place: 'University of Dhaka',
      createdAt: '1 min ago',
      read: false
    },
    {
      name: 'Shahriar Rumel',
      place: 'University of Dhaka',
      createdAt: '1 min ago',
      read: false
    },
    {
      name: 'Shahriar Rumel',
      place: 'University of Dhaka',
      createdAt: '1 min ago',
      read: true
    },
    {
      name: 'Shahriar Rumel',
      place: 'University of Dhaka',
      createdAt: '1 min ago',
      read: true
    },
    {
      name: 'Shahriar Rumel',
      place: 'University of Dhaka',
      createdAt: '1 min ago',
      read: true
    }
  ];

  const onRefresh = useCallback(() => {
    dispatch(getPlacesByUserAction());
  }, []);
  return (
    <FlatList
      data={placesbyUser ? placesbyUser : []}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={FlatListTop}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          progressViewOffset={60}
        />
      }
    />
  );
};
const FlatListHeaders = ({ navigation, route, loading, reviewsByUser }) => {
  const styles = StyleSheet.create({
    reviewsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.light
    },
    reviews: {
      marginLeft: 10,
      fontSize: 20,
      fontWeight: '700'
    }
  });
  return (
    <>
      <View style={styles.reviewsHeader}>
        <MaterialCommunityIcons
          name="office-building-marker"
          size={18}
          color={colors.secondary}
        />
        <Text style={styles.reviews}>Places </Text>
      </View>
      {reviewsByUser?.data?.length < 1 && (
        <Message message={"You haven't created any places yet !"} />
      )}
      {/* {loading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      )} */}
    </>
  );
};
export default function UserPlacesScreen({ navigation, route }) {
  return (
    <Screen style={styles.container}>
      <PlacesListSection navigation={navigation} route={route} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    width: '100%',
    backgroundColor: 'white'
  },
  scrollContainer: {
    width: '100%',
    right: 0
  }
});
