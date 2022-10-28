import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
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
import {
  getAllPlacesAction,
  getNearbyPlacesAction,
  getPlacesByCatagoryAction
} from '../actions/placeActions';
import LargeCard from '../components/LargeCard';
import { getTopRatedPlaceAction } from '../actions/filterActions';
import Button from '../components/Button';
import routes from '../navigation/routes';

const TopBar = ({ navigation }) => {
  const dispatch = useDispatch();

  const userLoginData = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLoginData;

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

  let partsofDay = '';

  const partsofDayList = [
    'Good Morning',
    'Good Noon',
    'Good Afternoon',
    'Good Evening'
  ];
  const getPartsofTheDay = () => {
    let localTime = new Date().toLocaleString();

    const time = localTime.split(' ')[3].split(':')[0];

    if (time < 11) return partsofDayList[0];
    if (time < 14) return partsofDayList[1];
    if (time < 18) return partsofDayList[2];
    if (time < 24) return partsofDayList[3];
  };

  partsofDay = getPartsofTheDay();
  return (
    <View style={styles.topBar}>
      <View style={styles.greetContainer}>
        <Text style={styles.greet}>
          {partsofDay ? partsofDay : 'Good Morning'} ,
        </Text>
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
const SearchBar = ({ allPlaces, navigation }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [item, setItem] = useState();
  const [filteredPlaces, setFilteredPlaces] = useState(allPlaces?.data);

  const searchStyles = StyleSheet.create({
    itemContainer: {
      paddingVertical: 10,
      elevation: 5,
      marginVertical: 5,
      backgroundColor: colors.input,
      borderRadius: 5,
      height: 300,
      paddingBottom: 20
    },
    item: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      // backgroundColor: colors.primaryLight,
      borderBottomColor: colors.primary,
      borderBottomWidth: 0.5,
      fontSize: 12,
      fontWeight: '400',
      color: colors.dark
    }
  });

  const searchList = (allPlaces, property, value) => {
    let name = property;
    return allPlaces.data.filter((Object) =>
      Object.name.toString().toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSearch = (text) => {
    setName(text);

    setFilteredPlaces(searchList(allPlaces, 'name', text));
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <FontAwesome5
          name="search"
          size={22}
          color="black"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search location"
          value={name}
          onChangeText={(text) => {
            handleSearch(text);
          }}
          onPressIn={() => {
            setOpen((prev) => !prev);
          }}
          // onBlur={() => name && setOpen(false)}
        />
      </View>
      {open && filteredPlaces && (
        <ScrollView style={searchStyles.itemContainer}>
          {filteredPlaces?.map((item) => (
            <Text
              style={searchStyles.item}
              key={item._id}
              onPress={() => {
                setName(item.name);
                // setItem(item);
                setOpen(false);
                // console.log(item.name);

                navigation.navigate(routes.LOCATION_DETAILS, {
                  data: item
                });
              }}
            >
              {item.name}
            </Text>
          ))}
        </ScrollView>
      )}
    </>
  );
};
const FilterTag = ({ text, onPress }) => {
  const styles = StyleSheet.create({
    filterTag: {
      paddingHorizontal: 10,
      backgroundColor: colors.input,
      height: 35,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      flexDirection: 'row'
    }
  });
  return (
    <TouchableOpacity style={styles.filterTag} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const FilterBar = ({ filtered, setFiltered, navigation }) => {
  const styles = StyleSheet.create({
    clearFilterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10
    },
    filterContainer: {
      flexDirection: 'column',
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
    topRatedPlace: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.primary
    }
  });

  const dispatch = useDispatch();

  const topRatedPlaceData = useSelector((state) => state.topRatedPlaceData);
  const {
    topRatedPlace,
    loading: topRatedPlaceLoading,
    error: topRatedPlaceError
  } = topRatedPlaceData;

  const getFirstTenChars = (data) => {
    const array = data?.split('') ? data?.split('') : 'loading';
    let ans = '';
    for (let i = 0; i <= 40; i++) ans += array[i] ? array[i] : '';
    for (let i = 1; i <= 3; i++) ans += ' .';

    return ans;
  };

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
        <FilterTag
          text={'Top Rated'}
          onPress={() => {
            setFiltered(true);
            dispatch(getTopRatedPlaceAction(3));
          }}
        />
        <FilterTag text={'Indoors'} />
        <FilterTag text={'Tour'} />
        <FilterTag text={'Restaurants'} />
      </ScrollView>

      {filtered && (
        <>
          {topRatedPlaceLoading ? (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={styles.loader}
            />
          ) : (
            <>
              <View style={styles.clearFilterContainer}>
                <Text style={styles.topRatedPlace}>Top Rated Places</Text>
                <Button
                  text={'Clear Filter'}
                  height={40}
                  width={100}
                  secondary={true}
                  color={colors.primary}
                  onPress={() => setFiltered(false)}
                />
              </View>
              {topRatedPlace?.data?.map((item) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate(routes.LOCATION_DETAILS, {
                      data: item
                    })
                  }
                >
                  <LargeCard
                    title={item.name}
                    distance={'0.2 Km'}
                    location={
                      item.location?.formattedAddress?.length > 30
                        ? getFirstTenChars(item.location?.formattedAddress)
                        : item.location?.formattedAddress
                    }
                    imguri={item.photo}
                    rating={item.averageRating}
                  />
                </Pressable>
              ))}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default function FeedScreen({ navigation }) {
  const [filtered, setFiltered] = useState(false);
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

  const nearbyPlacesData = useSelector((state) => state.nearbyPlacesData);
  const {
    nearbyPlaces,
    loading: nearbyPlacesLoading,
    error: nearbyPlacesError
  } = nearbyPlacesData;

  const placesbyCatagoryData = useSelector(
    (state) => state.placesbyCatagoryData
  );
  const {
    placesbyCatagory,
    loading: placesbyCatagoryLoading,
    error: placesbyCatagoryError
  } = placesbyCatagoryData;

  useEffect(() => {
    dispatch(getNearbyPlacesAction());
  }, []);

  useEffect(() => {
    dispatch(getPlacesByCatagoryAction('theatre'));
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(getNearbyPlacesAction());
  }, []);

  return (
    <Screen style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={nearbyPlacesLoading}
        //     onRefresh={onRefresh}
        //     colors={[colors.primary]}
        //     progressViewOffset={60}
        //   />
        // }
      >
        <TopBar navigation={navigation} />
        <SearchBar allPlaces={allPlaces} navigation={navigation} />
        <FilterBar
          filtered={filtered}
          setFiltered={setFiltered}
          navigation={navigation}
        />

        {!filtered && (
          <>
            {nearbyPlacesLoading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.loader}
              />
            ) : (
              <>
                <CardSection
                  title={'For you'}
                  data={nearbyPlaces ? nearbyPlaces.data : data}
                  navigation={navigation}
                />
              </>
            )}
            {placesbyCatagoryLoading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.loader}
              />
            ) : (
              <>
                <CardSection
                  title={'Meet with friends'}
                  data={placesbyCatagory ? placesbyCatagory.data : data}
                  navigation={navigation}
                />
              </>
            )}

            {allPlacesLoading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.loader}
              />
            ) : (
              <>
                <CardSection
                  title={'Most Reviewed'}
                  data={allPlaces ? allPlaces.data : data}
                  navigation={navigation}
                />
              </>
            )}
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 60,
    // paddingHorizontal: constants.CONTAINER_PADDING,
    backgroundColor: colors.white
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
