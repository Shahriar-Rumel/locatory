import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import Screen from '../components/Screen';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { deleteReview, getReviewsByUser } from '../actions/reviewActions';

const ReviewListSection = ({ navigation, route }) => {
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
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: 14,
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
        marginBottom: 10
      },
      dpLetter: {
        fontSize: 30,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: colors.white
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
      for (let i = 0; i <= 40; i++) ans += array[i];
      for (let i = 1; i <= 3; i++) ans += ' .';

      return ans;
    };
    const deleteHandler = () => {
      dispatch(deleteReview(item._id));
      dispatch(getReviewsByUser());
    };
    return (
      <Pressable
        style={styles.item}
        // onPress={() =>
        //   navigation.navigate(routes.REVIEW, {
        //     data: item
        //   })
        // }
        key={item.name}
      >
        <View style={styles.notificationTop}>
          <ImageBackground
            style={styles.img}
            source={{
              uri: `${item?.photo}`
            }}
            resizeMode="cover"
          />

          <View>
            <Text style={styles.header}>
              <Text style={styles.name}>{item.title}</Text>
            </Text>
            <Text style={styles.desc}>
              {item.description.length > 40
                ? getFirstHundredChars(item.description)
                : item.description}
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
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={deleteHandler}
              >
                <MaterialIcons name="delete" size={24} color={colors.red} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const dispatch = useDispatch();

  const reviewsByUserData = useSelector((state) => state.reviewsByUserData);

  const { reviewsByUser, loading } = reviewsByUserData;

  const FlatListTop = (
    <FlatListHeaders
      route={route}
      navigation={navigation}
      loading={loading}
      reviewsByUser={reviewsByUser}
    />
  );

  useEffect(() => {
    dispatch(getReviewsByUser());
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

  return (
    <FlatList
      data={reviewsByUser ? reviewsByUser.data : []}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={FlatListTop}
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
        <MaterialIcons name="rate-review" size={18} color={colors.primary} />
        <Text style={styles.reviews}>Reviews </Text>
      </View>
      {reviewsByUser?.data?.length < 1 && (
        <Message message={"You haven't created any reviews yet !"} />
      )}
      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      )}
    </>
  );
};
export default function UserReviewScreen({ navigation, route }) {
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
  }
});
