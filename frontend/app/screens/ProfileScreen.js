import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, { useEffect } from 'react';
import colors from '../config/colors';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import routes from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logOut } from '../actions/userActions';
import { AntDesign } from '@expo/vector-icons';

const CoverSection = ({ data }) => {
  const styles = StyleSheet.create({
    cover: {
      backgroundColor: colors.primary,
      alignItems: 'center',
      paddingBottom: 20,
      marginBottom: 10
    },
    dp: {
      backgroundColor: colors.secondary,
      height: 130,
      width: 130,
      marginTop: 60,
      borderRadius: 150
    },
    headingcontainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    detailscontainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10
    },
    username: {
      color: colors.white,
      fontSize: 28,
      fontWeight: '500'
    },
    email: {
      color: colors.white
    },
    footertext: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '500'
    },
    coverBottomText: {
      color: colors.white,
      fontSize: 12
    },
    coverBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      marginTop: 30
    },
    bottomleft: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  });

  const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return (
    <View style={styles.cover}>
      <View style={styles.dp}></View>
      <View style={styles.headingcontainer}>
        <View style={styles.detailscontainer}>
          <Text style={styles.username}>{data?.name}</Text>
          <Text style={styles.email}>{data?.email}</Text>
        </View>
        <Button
          style={styles.editbutton}
          text={'Edit'}
          width={90}
          height={30}
          borderRadius={8}
          color={colors.white}
          bgColor={colors.secondary}
        />
      </View>
      <View style={styles.coverBottom}>
        <View style={styles.bottomleft}>
          <Ionicons
            name="md-location-sharp"
            size={24}
            color={colors.secondary}
          />
          <Text style={styles.coverBottomText}>Dhaka,Bangladesh</Text>
        </View>
        <Text style={styles.coverBottomText}>
          Joined at {data.createdAt.split('-')[2].split('T')[0]}{' '}
          {Months[data.createdAt.split('-')[1] - 1]} ,{' '}
          {data.createdAt.split('-')[0]}
        </Text>
      </View>
    </View>
  );
};
// 2022-10-03T18:30:24.223Z
const ProfileActivity = ({ navigation, dispatch }) => {
  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.light,
      paddingVertical: 15,
      paddingHorizontal: 20
    },
    itemleft: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      marginLeft: 10,
      fontSize: 14
    }
  });
  const activityList = [
    {
      icon: <FontAwesome name="heart" size={16} color="black" />,
      title: 'Favorites',
      link: routes.USER_REVIEWS
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="office-building-marker"
          size={18}
          color="black"
        />
      ),
      title: 'Places',
      link: routes.USER_REVIEWS
    },
    {
      icon: <MaterialIcons name="rate-review" size={18} color="black" />,
      title: 'Reviews',
      link: routes.USER_REVIEWS
    },
    {
      icon: <AntDesign name="logout" size={18} color={colors.red} />,
      title: 'Logout',
      link: routes.USER_REVIEWS
    }
  ];

  return (
    <View>
      {activityList.map((item, index) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            index < activityList.length - 1
              ? navigation.navigate(item.link)
              : dispatch(logOut())
          }
          key={index}
        >
          <View style={styles.itemleft}>
            {item.icon}
            <Text
              style={[
                styles.title,
                {
                  color:
                    index === activityList.length - 1
                      ? colors.red
                      : colors.black
                }
              ]}
            >
              {item.title}
            </Text>
          </View>
          {/* <Ionicons name="arrow-forward-circle-sharp" size={24} color="black" /> */}
          {/* <MaterialCommunityIcons name="greater-than" size={18} color="black" /> */}
          {index < activityList.length - 1 && (
            <Ionicons
              name="arrow-forward-circle-outline"
              size={20}
              color="black"
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const {
    userDetails,
    loading: userDataLoading,
    error: userDataError
  } = userData;

  // console.log(userDetails);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  return (
    <>
      {userDataLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : (
        <>
          <CoverSection data={userDetails?.data} />
          <ProfileActivity navigation={navigation} dispatch={dispatch} />
        </>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
