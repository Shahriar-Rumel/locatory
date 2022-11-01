import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../config/colors';
import Screen from '../components/Screen';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import routes from '../navigation/routes';
import { getReviewsByPlace } from '../actions/reviewActions';
import { getPlaceByIDAction } from '../actions/placeActions';

const CoverSection = ({ navigation, data }) => {
  const styles = StyleSheet.create({
    img: {
      width: '100%',
      height: 300,
      backgroundColor: colors.primary
    },
    backButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      opacity: 1,
      position: 'absolute',
      left: 15,
      top: 50,
      height: 40,
      width: 40,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 100
    },
    backIcon: {
      marginTop: 3
    },
    bottom: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      position: 'absolute',
      bottom: 10,
      width: '100%'
    },
    title: {
      fontWeight: '700',
      fontSize: 26,
      color: colors.white,
      textTransform: 'capitalize'
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
      color: colors.white,
      width: '80%'
    },
    distance: {
      fontWeight: '500',
      fontSize: 11,
      color: colors.secondary
    }
  });

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
    <ImageBackground
      style={styles.img}
      source={{
        uri: `${data?.photo}`
      }}
      resizeMode="cover"
    >
      <Pressable
        onPress={() => navigation.navigate('Feed')}
        style={styles.backButton}
      >
        <View style={styles.backIcon}>
          <Ionicons name="chevron-back-outline" size={30} color="white" />
        </View>
      </Pressable>
      <View style={styles.bottom}>
        <Text style={styles.title}>{data?.name}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{data?.location.formattedAddress}</Text>
          <Text style={styles.distance}>{getDistance(data)}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};
const OverviewSection = ({ data, tor }) => {
  const styles = StyleSheet.create({
    overviewContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.light,
      paddingVertical: 15
    },
    avgRatingContainer: {
      borderRightWidth: 1,
      borderRightColor: colors.secondary,
      width: '33%'
    },
    number: {
      fontWeight: '700',
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    attribute: {
      fontWeight: '700',
      textAlign: 'center',
      color: colors.primary,
      fontSize: 10,
      marginTop: 5
    },
    totalLikesContainer: {
      borderRightWidth: 1,
      borderRightColor: colors.secondary,
      width: '33%'
    },
    totalReviewsContainer: {
      width: '33%'
    }
  });

  return (
    <View style={styles.overviewContainer}>
      <View style={styles.avgRatingContainer}>
        <Text style={styles.number}>
          {data?.averageRating ? data?.averageRating.toFixed(2) : 0}
        </Text>
        <Text style={styles.attribute}>Avg. Rating</Text>
      </View>
      <View style={styles.totalLikesContainer}>
        <Text style={styles.number}>{data?.category}</Text>
        <Text style={styles.attribute}>Category</Text>
      </View>
      <View style={styles.totalReviewsContainer}>
        <Text style={styles.number}>
          {tor > 1000 ? tor / 1000 : tor}
          {tor > 1000 && 'k'}
        </Text>
        <Text style={styles.attribute}>Total Reviews</Text>
      </View>
    </View>
  );
};
const MapSection = ({ data }) => {
  const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: 200
    }
  });

  // console.log(data?.location.coordinates);
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: data?.location.coordinates
          ? data?.location.coordinates[1]
          : 25.0141875,
        longitude: data?.location.coordinates
          ? data?.location.coordinates[0]
          : 91.9187031,
        latitudeDelta: 0.0042,
        longitudeDelta: 0.0041
      }}
      provider="google"
      //   scrollEnabled={false}
    >
      <Marker
        coordinate={{
          latitude: data?.location.coordinates
            ? data?.location.coordinates[1]
            : 25.0141875,
          longitude: data?.location.coordinates
            ? data?.location.coordinates[0]
            : 91.9187031
        }}
      />
    </MapView>
  );
};
const ReviewListSection = ({ navigation, route }) => {
  const renderItem = ({ item }) => {
    const styles = StyleSheet.create({
      actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        width: '35%'
      },
      img: {
        width: 100,
        height: '100%'
      },
      item: {
        backgroundColor: colors.light,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden'
      },
      leftContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10
      },
      likeContainer: {
        flexDirection: 'row'
      },
      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '75%'
      },
      title: {
        fontSize: 14,
        fontWeight: '600',
        width: '90%'
      },
      date: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.gray
      },
      desc: {
        fontSize: 12,
        marginTop: 8,
        fontWeight: '400',
        color: colors.gray
      },
      statCount: {
        fontSize: 12,
        marginRight: 5,
        fontWeight: '500'
      }
    });

    const getFirstHundredChars = (data) => {
      const array = data?.split('') ? data?.split('') : 'loading';
      let ans = '';
      for (let i = 0; i <= 40; i++) ans += array[i];
      for (let i = 1; i <= 3; i++) ans += ' .';

      return ans;
    };

    return (
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate(routes.REVIEW, {
            data: item._id
          })
        }
        key={item.name}
      >
        <ImageBackground
          style={styles.img}
          source={{
            uri: `${item.photo}`
          }}
          resizeMode="cover"
        />
        <View style={styles.leftContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item?.createdAt?.split('T')[0]}</Text>
          </View>
          <Text style={styles.desc}>
            {item.description.length > 40
              ? getFirstHundredChars(item.description)
              : item.description}
          </Text>
          <View style={styles.actionContainer}>
            <View style={styles.likeContainer}>
              <Text style={styles.statCount}>
                {item.totallikes} {item.totallikes >= 1000 && k}
              </Text>
              <FontAwesome5 name="heart" size={18} color={colors.primary} />
            </View>
            {/* <View style={styles.likeContainer}>
              <Text style={styles.statCount}>12k</Text>
              <Octicons name="comment" size={18} color={colors.secondary} />
            </View> */}
            <View style={styles.likeContainer}>
              <Text style={styles.statCount}>
                {item.totaldislikes} {item.totaldislikes >= 1000 && k}
              </Text>
              <AntDesign name="dislike2" size={18} color={colors.gray} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const dispatch = useDispatch();

  const reviewsByPlaceData = useSelector((state) => state.reviewsByPlaceData);

  const { reviewsByPlace, loading } = reviewsByPlaceData;

  const placesbyIDData = useSelector((state) => state.placesbyIDData);

  const { placesbyID, loading: placeLoading } = placesbyIDData;

  const { data } = route.params;

  const FlatListTop = (
    <FlatListHeaders
      navigation={navigation}
      loading={loading}
      placeLoading={placeLoading}
      reviewsByPlace={reviewsByPlace}
      placesbyID={placesbyID}
    />
  );
  useEffect(() => {
    dispatch(getPlaceByIDAction(data));
  }, [data]);

  useEffect(() => {
    dispatch(getReviewsByPlace(data));
  }, [data]);

  return (
    <FlatList
      data={reviewsByPlace?.data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={FlatListTop}
    />
  );
};
const FlatListHeaders = ({
  navigation,
  loading,
  reviewsByPlace,
  placeLoading,
  placesbyID
}) => {
  return (
    <>
      {placeLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : (
        <>
          <CoverSection navigation={navigation} data={placesbyID} />
          <OverviewSection
            data={placesbyID}
            tor={reviewsByPlace?.data?.length}
          />
          <MapSection data={placesbyID} />
          <Text style={styles.reviews}> Reviews </Text>
        </>
      )}

      {!placeLoading && loading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      )}
    </>
  );
};
export default function LocationDetailsScreen({ navigation, route }) {
  return (
    <Screen style={styles.container}>
      <ReviewListSection navigation={navigation} route={route} />
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
  },
  reviews: {
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '700'
  }
});
