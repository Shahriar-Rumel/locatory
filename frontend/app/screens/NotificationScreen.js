import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import colors from '../config/colors';
import Screen from '../components/Screen';

import routes from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useElapsedTime } from 'use-elapsed-time';
import {
  getNotificationsForAction,
  getNotificationsForUserAction
} from '../actions/notificationActions';
import Message from '../components/Message';

const ReviewListSection = ({ navigation, route }) => {
  const renderItem = ({ item }) => {
    const styles = StyleSheet.create({
      createdAt: {
        color: item.read ? colors.gray : colors.primary
      },
      img: {
        width: 60,
        height: 60,
        backgroundColor: item.read ? colors.gray : colors.secondary,
        borderRadius: 60,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      item: {
        backgroundColor: item.read ? colors.white : colors.primaryLight,
        marginVertical: 0.5,
        // marginHorizontal: 15,
        paddingHorizontal: 18,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.primaryLight
      },
      header: {
        flexWrap: 'wrap',
        width: '85%',
        fontSize: 14,
        color: item.read ? colors.black : colors.black,
        lineHeight: 18,
        marginBottom: 10,
        fontWeight: '500'
      },
      notificationTop: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      name: {
        fontWeight: '700',
        color: item.read ? colors.black : colors.primary
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

    getElapsedTime(new Date('2022-10-22T11:30:33'));

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
          <View style={styles.img}>
            <Text style={styles.dpLetter}>{item.name.split('')[0]}</Text>
          </View>
          <View>
            <Text style={styles.header}>
              <Text style={styles.name}>{item.name}</Text> liked your review for{' '}
              {item.place}
            </Text>
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
      </Pressable>
    );
  };

  const dispatch = useDispatch();

  const notificationsForUserData = useSelector(
    (state) => state.notificationsForUserData
  );

  const { notificationsForUser, loading } = notificationsForUserData;

  const FlatListTop = (
    <FlatListHeaders
      route={route}
      navigation={navigation}
      loading={loading}
      notificationsForUser={notificationsForUser}
    />
  );

  useEffect(() => {
    dispatch(getNotificationsForUserAction());
  }, []);

  console.log(notificationsForUser);

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
      data={notificationsForUser ? notificationsForUser.data : []}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={FlatListTop}
    />
  );
};
const FlatListHeaders = ({
  navigation,
  route,
  loading,
  notificationsForUser
}) => {
  const styles = StyleSheet.create({
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20
    },
    notifications: {
      marginLeft: 10,
      fontSize: 20,
      fontWeight: '700'
    }
  });
  return (
    <>
      <View style={styles.notificationHeader}>
        <Ionicons name="notifications" size={24} color={colors.primary} />
        <Text style={styles.notifications}>Notifications </Text>
      </View>
      {notificationsForUser?.data?.length < 1 && (
        <Message message={'No notifications yet !'} />
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
export default function NotificationScreen({ navigation, route }) {
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
