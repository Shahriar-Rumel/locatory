import React, { useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import colors from '../config/colors';
import constants from '../config/constants';
import Screen from '../components/Screen';
import CardSection from '../components/CardSection';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logOut } from '../actions/userActions';
import { getAllPlacesAction } from '../actions/placeActions';

const TopBar = ({ navigation }) => {
  const dispatch = useDispatch();

  const userLoginData = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLoginData;

  // useEffect(() => {
  //   if (!userInfo) {
  //     // navigation.navigate('Login');
  //     console.log(userInfo);
  //   }
  // }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getCurrentUser());
      dispatch(getAllPlacesAction());
    }
  }, [userInfo]);

  const userData = useSelector((state) => state.userData);
  const {
    userDetails,
    loading: userDataLoading,
    error: userDataError
  } = userData;

  const logoutHandler = () => {
    dispatch(logOut());
  };
  return (
    <View style={styles.topBar}>
      <View style={styles.greetContainer}>
        <Text style={styles.greet}>Good Evening,</Text>
        <Text style={[styles.greet, styles.greetName]}>
          {userDetails?.data?.name?.split(' ')[0]}
        </Text>
      </View>
      <Pressable onPress={logoutHandler}>
        {userData?.dp ? (
          <ImageBackground
            style={styles.dp}
            source={{
              uri: 'https://images.unsplash.com/photo-1657214059212-104dac959c56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
            }}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.dp}>
            <Text style={styles.dpText}>
              {userDetails?.data?.name?.split('')[0]}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};
const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <FontAwesome5
        name="search"
        size={22}
        color="black"
        style={styles.searchIcon}
      />
      <TextInput style={styles.input} placeholder="Search location" />
    </View>
  );
};
const FilterTag = ({ text }) => {
  return (
    <TouchableOpacity style={styles.filterTag}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const FilterBar = () => {
  return (
    <View style={styles.filterContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.filterTag}>
          <Image
            source={require('../assets/icons/filter.png')}
            style={styles.filterIcon}
            resizeMode={'contain'}
          />
          <Text>Filter</Text>
        </View>
        <FilterTag text={'Trending'} />
        <FilterTag text={'Indoors'} />
        <FilterTag text={'Tour'} />
        <FilterTag text={'Restaurants'} />
        <FilterTag text={'Trending'} />
      </ScrollView>
    </View>
  );
};

export default function FeedScreen({ navigation }) {
  const data = [
    {
      title: 'University of Dhaka',
      location: 'Nilkhet Road,Dhaka 1000',
      distance: '0.2Km',
      imaguri:
        'https://images.unsplash.com/photo-1626964143945-b13d22dfe399?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
    },
    {
      title: 'Saint Martin Island',
      location: "Cox's Bazar , Chittagong 1000",
      distance: '150.2Km',
      imaguri:
        'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      title: 'University of Dhaka',
      location: 'Nilkhet Road,Dhaka 1000',
      distance: '0.2Km',
      imaguri:
        'https://images.unsplash.com/photo-1611175522050-9e702da5b464?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80'
    }
  ];
  const dispatch = useDispatch();

  const allPlacesData = useSelector((state) => state.allPlacesData);
  const {
    allPlaces,
    loading: allPlacesLoading,
    error: allPlacesError
  } = allPlacesData;

  console.log(allPlaces?.data[0].name);

  return (
    <Screen style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <TopBar navigation={navigation} />
        <SearchBar />
        <FilterBar />
        {/* <View>
          <ActivityIndicator size="large" color={colors.primaryLight} />
        </View> */}
        {allPlacesLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loader}
          />
        ) : (
          <>
            <CardSection
              title={'For you'}
              data={allPlaces ? allPlaces.data : data}
              navigation={navigation}
            />
            <CardSection
              title={'Meet with colleagues'}
              data={allPlaces ? allPlaces.data : data}
              navigation={navigation}
            />
            <CardSection
              title={'Most Reviewed'}
              data={allPlaces ? allPlaces.data : data}
              navigation={navigation}
            />
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // paddingHorizontal: constants.CONTAINER_PADDING,
    backgroundColor: 'white'
  },
  dp: {
    width: 35,
    height: 35,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dpText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    color: colors.white
  },
  filterContainer: {
    flexDirection: 'row',
    height: 35,
    overflow: 'scroll',
    marginTop: 10
  },
  filterIcon: {
    width: 14,
    height: 14,
    marginRight: 5
  },
  filterTag: {
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row'
  },
  greetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greet: {
    fontSize: 14,
    fontFamily: 'SFPD-semiBold',
    color: colors.gray
  },
  greetName: {
    marginLeft: 3,
    color: colors.black,
    textTransform: 'capitalize'
  },
  input: {
    backgroundColor: colors.input,
    height: 50,
    borderRadius: 14,
    width: '100%',
    paddingLeft: 50,
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'SFPD-medium'
  },
  loader: {
    marginVertical: 40
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: constants.CONTAINER_PADDING + 5,
    right: 0
  },
  searchContainer: {
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 8,
    marginTop: 23,
    marginLeft: 15,
    color: colors.gray
  },
  secondaryButtonText: {
    padding: 10,
    backgroundColor: colors.primary,
    color: 'white',
    width: '50%',
    borderRadius: 6,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
});
