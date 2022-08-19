import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import colors from '../config/colors';
import constants from '../config/constants';
import Screen from '../components/Screen';

const TopBar = () => {
  return (
    <View style={styles.topBar}>
      <View style={styles.greetContainer}>
        <Text style={styles.greet}>Good Evening,</Text>
        <Text style={[styles.greet, styles.greetName]}>Rumel</Text>
      </View>
      <ImageBackground
        style={styles.dp}
        source={require('../assets/ST.jpg')}
        resizeMode="cover"
      />
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
    <View style={styles.filterTag}>
      <Text>{text}</Text>
    </View>
  );
};
export default function FeedScreen() {
  return (
    <Screen style={styles.container}>
      <TopBar />
      <SearchBar />
      <View style={styles.filterContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FilterTag text={'Trending'} />
          <FilterTag text={'Indoors'} />
          <FilterTag text={'Tour'} />
          <FilterTag text={'Restaurants'} />
          <FilterTag text={'Trending'} />
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: constants.CONTAINER_PADDING
  },
  dp: {
    width: 35,
    height: 35,
    backgroundColor: 'green',
    borderRadius: 50,
    overflow: 'hidden'
  },
  filterContainer: {
    flexDirection: 'row',
    height: 50,
    overflow: 'scroll',
    marginTop: 10
  },
  filterTag: {
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    height: 45,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
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
    color: colors.black
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
});
