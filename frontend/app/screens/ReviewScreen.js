import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import colors from '../config/colors';
import routes from '../navigation/routes';

import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  dislikeforReview,
  getFavoritReviews,
  getReviewsByID,
  likeforReview
} from '../actions/reviewActions';
import { createNotificationAction } from '../actions/notificationActions';

const CoverSection = ({ navigation, route, data }) => {
  const styles = StyleSheet.create({
    img: {
      width: '100%',
      height: 350,
      backgroundColor: colors.secondary
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      bottom: 0,
      width: '100%',
      backgroundColor: colors.black
    },
    nameContainer: {
      width: '90%'
    },
    title: {
      fontWeight: '700',
      fontSize: 20,
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
      width: 120
    },
    location: {
      fontWeight: '500',
      fontSize: 11,
      color: colors.white
    },
    distance: {
      fontWeight: '500',
      fontSize: 11,
      color: colors.secondary
    },
    place: {
      color: colors.gray,
      fontSize: 12,
      marginLeft: -2,
      marginBottom: 8
    }
  });

  const list = [1, 2, 3, 4, 5];

  return (
    <ImageBackground
      style={styles.img}
      source={{
        uri: `${data.photo}`
      }}
      resizeMode="cover"
    >
      <Pressable
        onPress={() => navigation.navigate(routes.FEED)}
        style={styles.backButton}
      >
        <View style={styles.backIcon}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color={colors.white}
          />
        </View>
      </Pressable>
      <View style={styles.bottom}>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.place}>
            <Ionicons
              name="md-location-sharp"
              size={20}
              color={colors.primaryLight}
            />
            {data.place.name}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          {list.map((_item, index) => (
            <MaterialCommunityIcons
              name={data.rating > index ? 'star' : 'star-outline'}
              size={20}
              color={colors.secondary}
              key={index}
            />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const DetailsSection = ({ data, fav }) => {
  const [likeCounter, setLikeCounter] = useState(data?.totallikes);
  const [dislikeCounter, setDisikeCounter] = useState(data?.totaldislikes);
  const [dislike, setDislike] = useState(false);

  const dispatch = useDispatch();

  const likeData = useSelector((state) => state.likeData);

  const isLiked = () => {
    for (let i = 0; i < fav?.length; i++) {
      if (fav[i].review === data._id) return true;
    }
  };

  const [like, setLiked] = useState(isLiked());

  useEffect(() => {
    setLiked(isLiked());
  }, []);

  const styles = StyleSheet.create({
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20
    },
    date: {
      fontWeight: '500',
      fontSize: 11,
      color: colors.gray
    },
    description: {
      fontWeight: '400',
      fontSize: 12,
      color: colors.gray,
      marginTop: 10
    },
    distance: {
      fontWeight: '500',
      fontSize: 11,
      color: colors.secondary
    },
    detailsSection: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      width: '100%'
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 15
    },
    likeContainer: {
      flexDirection: 'row',
      backgroundColor: colors.light,
      width: '32%',
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderRadius: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: 10
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: 5
    },

    statCount: {
      fontSize: 12,
      fontWeight: '500',
      borderRightWidth: 1,
      borderRightColor: 'white',
      paddingHorizontal: 15
    },
    title: {
      fontWeight: '700',
      fontSize: 20,
      color: colors.primary,
      width: '100%'
    },
    dpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: -2,
      width: '100%'
    },
    dp: {
      backgroundColor: colors.secondary,
      height: 60,
      width: 60,
      borderRadius: 150,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    nameContainer: {
      marginLeft: 10
    },
    greetName: {
      fontSize: 32,
      color: colors.white,
      fontWeight: '700',
      textTransform: 'capitalize'
    },
    nameParentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%'
    },
    verified: {
      backgroundColor: colors.greenLight,
      color: colors.green,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      textTransform: 'capitalize'
    }
  });

  return (
    <View style={styles.detailsSection}>
      <View style={styles.locationContainer}>
        <View style={styles.dpContainer}>
          <ImageBackground
            style={styles.dp}
            source={{
              uri: `${data.userphoto}`
            }}
            resizeMode="cover"
          >
            {!data?.userphoto && (
              <Text style={[styles.greet, styles.greetName]}>
                {data?.username?.split(' ')[0]}
              </Text>
            )}
          </ImageBackground>
          <View style={styles.nameParentContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.title}>
                {data.username ? data.username : 'Anonymous'}
              </Text>
              <Text style={styles.date}>
                {data.createdAt.split('T')[0] +
                  ' at ' +
                  data.createdAt.split('T')[1].split('.')[0]}
              </Text>
            </View>
            <Text style={styles.verified}>{data.setting}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.actionContainer}>
        <View style={styles.likeContainer}>
          <Text style={styles.statCount}>{likeCounter}</Text>
          <Pressable
            style={styles.iconContainer}
            onPress={() => {
              if (like) setLikeCounter((prev) => prev - 1);
              else setLikeCounter((prev) => prev + 1);
              setLiked((prev) => !prev);

              dispatch(createNotificationAction(data._id));
              dispatch(likeforReview(data._id));
            }}
          >
            <MaterialCommunityIcons
              name={like ? 'heart' : 'heart-outline'}
              size={22}
              color={like ? colors.red : colors.gray}
            />
          </Pressable>
        </View>

        <View style={styles.likeContainer}>
          <Text style={styles.statCount}>{dislikeCounter}</Text>
          <Pressable
            style={styles.iconContainer}
            onPress={() => {
              if (dislike) setDisikeCounter((prev) => prev - 1);
              else setDisikeCounter((prev) => prev + 1);
              setDislike((prev) => !prev);
              dispatch(dislikeforReview(data._id));
            }}
          >
            <AntDesign
              name={dislike ? 'dislike1' : 'dislike2'}
              size={22}
              color={dislike ? colors.black : colors.gray}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const CarouselSection = ({ data }) => {
  const styles = StyleSheet.create({
    carouselImage: {
      height: 300,
      backgroundColor: colors.primaryLight,
      marginHorizontal: 15,
      borderRadius: 5,
      marginTop: 20,
      overflow: 'hidden'
    }
  });

  return (
    <View>
      <ImageBackground
        source={{
          uri: `${data.photo}`
        }}
        resizeMode="cover"
        style={styles.carouselImage}
      ></ImageBackground>
    </View>
  );
};

const Banner = ({ data }) => {
  const styles = StyleSheet.create({
    bannerContainer: {
      height: 80,
      backgroundColor: colors.primary,
      marginHorizontal: 15,
      borderRadius: 5,
      marginTop: 20,
      overflow: 'hidden',
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 45
    },
    amount: { fontSize: 14, fontWeight: '700', color: colors.secondary },
    avgBudget: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.white
    },
    logo: {
      width: 50,
      height: 50
    }
  });
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.avgBudget}>Average Budget</Text>
      <Image
        style={styles.logo}
        resizeMode={'contain'}
        source={require('../assets/budget.png')}
      />
      <Text style={styles.amount}>{data.averagebudget} ৳</Text>
    </View>
  );
};
const Rating = ({ data, title, src, text }) => {
  const styles = StyleSheet.create({
    attribute: {
      fontSize: 10,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.gray
    },
    ratingBox: {
      backgroundColor: colors.white,
      elevation: 4,
      width: 105,
      paddingVertical: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignContent: 'center',
      marginVertical: 5
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5,
      width: '25%',
      marginLeft: 17
    },
    logo: {
      width: 40,
      height: 40,
      marginVertical: 10,
      marginLeft: 34
    },
    value: {
      fontSize: 10,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.secondary,
      textTransform: 'capitalize'
    }
  });
  const list = [1, 2, 3, 4, 5];

  return (
    <View style={styles.ratingBox}>
      <Text style={styles.attribute}> {title}</Text>
      <Image style={styles.logo} resizeMode={'contain'} source={src} />
      {!text ? (
        <View style={styles.ratingContainer}>
          {list.map((_item, index) => (
            <MaterialCommunityIcons
              name={data > index ? 'star' : 'star-outline'}
              size={14}
              color={colors.secondary}
              key={index}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.value}>{text}</Text>
      )}
    </View>
  );
};
const RatingBox = ({ data }) => {
  const styles = StyleSheet.create({
    ratingBoxContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginHorizontal: 15
    }
  });

  const accessibility = require('../assets/RatingBox/accessibility.png');
  const decoration = require('../assets/RatingBox/decoration.png');
  const service = require('../assets/RatingBox/service.png');
  const family = require('../assets/RatingBox/family.png');
  const transportation = require('../assets/RatingBox/transportation.png');
  const location = require('../assets/RatingBox/location.png');

  return (
    <View style={styles.ratingBoxContainer}>
      <Rating
        data={data.accessibility}
        title={'Accessibility'}
        src={accessibility}
      />
      <Rating data={data.decoration} title={'Decoration'} src={decoration} />
      <Rating data={data.service} title={'Service'} src={service} />
      <Rating
        data={data.familyfriendly}
        title={'Family Friendly'}
        src={family}
      />
      <Rating
        data={data.transportation}
        title={'Transportation'}
        src={transportation}
        text={data.transportation}
      />
      <Rating
        data={data.setting}
        title={'Location Type'}
        src={location}
        text={data.setting}
      />
    </View>
  );
};
export default function ReviewScreen({ navigation, route }) {
  const { data } = route.params;

  const dispatch = useDispatch();

  const reviewsByIDData = useSelector((state) => state.reviewsByIDData);

  const { loading, reviewsByID } = reviewsByIDData;

  useEffect(() => {
    dispatch(getReviewsByID(data));
  }, []);

  const favoriteReviewsData = useSelector((state) => state.favoriteReviewsData);

  const { favoriteReviews } = favoriteReviewsData;

  useEffect(() => {
    dispatch(getFavoritReviews());
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : (
        <>
          {reviewsByID && (
            <>
              <CoverSection
                navigation={navigation}
                route={route}
                data={reviewsByID}
              />
              <DetailsSection data={reviewsByID} fav={favoriteReviews} />
              <CarouselSection data={reviewsByID} />
              <View style={styles.divider}></View>
              <Banner data={reviewsByID} />
              <RatingBox data={reviewsByID} />
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 0.5,
    backgroundColor: colors.dark,
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 20
  },
  loader: {
    marginVertical: 40
  }
});
