import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
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
import { likeforReview } from '../actions/reviewActions';
import { createNotificationAction } from '../actions/notificationActions';

const CoverSection = ({ navigation, route }) => {
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
      fontSize: 20,
      color: colors.white
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5,
      width: 150
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
    }
  });

  const { data } = route.params;

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
        <Text style={styles.title}>{data.title}</Text>
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

const DetailsSection = ({ data }) => {
  const [like, setLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(data?.totallikes);
  const [comment, setComment] = useState(false);
  const [dislike, setDislike] = useState(false);

  const dispatch = useDispatch();

  const likeData = useSelector((state) => state.likeData);

  const styles = StyleSheet.create({
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20
    },
    date: {
      fontWeight: '500',
      fontSize: 11,
      color: colors.black
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
      alignItems: 'center'
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
      width: '60%'
    }
  });

  return (
    <View style={styles.detailsSection}>
      <View style={styles.locationContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>
          {data.createdAt.split('T')[0] +
            ' at ' +
            data.createdAt.split('T')[1].split('.')[0]}
        </Text>
      </View>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.actionContainer}>
        <View style={styles.likeContainer}>
          <Text style={styles.statCount}>{data.totallikes}</Text>
          <Pressable
            style={styles.iconContainer}
            onPress={() => {
              // if (like) setLikeCounter((prev) => prev - 1);
              // else setLikeCounter((prev) => prev + 1);
              setLiked((prev) => !prev);
              dispatch(createNotificationAction(data._id));
              dispatch(likeforReview(data._id));
              console.log('called');
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
          <Text style={styles.statCount}>{data.likes}</Text>
          <Pressable
            style={styles.iconContainer}
            onPress={() => setComment((prev) => !prev)}
          >
            <MaterialCommunityIcons
              name={comment ? 'comment' : 'comment-outline'}
              size={22}
              color={comment ? colors.secondary : colors.gray}
            />
          </Pressable>
        </View>
        <View style={styles.likeContainer}>
          <Text style={styles.statCount}>{data.likes}</Text>
          <Pressable
            style={styles.iconContainer}
            onPress={() => setDislike((prev) => !prev)}
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

  return (
    <ScrollView style={styles.container}>
      <CoverSection navigation={navigation} route={route} />
      <DetailsSection data={data} />
      <CarouselSection data={data} />
      <View style={styles.divider}></View>
      <Banner data={data} />
      <RatingBox data={data} />
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
  }
});
