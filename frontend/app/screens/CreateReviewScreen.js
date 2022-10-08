import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import colors from '../config/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Button from '../components/Button';
import DropDown from '../components/DropDown';
import AppFormField from '../components/forms/FormField';
import Form from '../components/forms/Form';
import SubmitButton from '../components/forms/SubmitButton';
import ImageInput from '../components/ImageInput';

const TextInputReview = ({ label, placeholder, setData, ...otherProps }) => {
  const styles = StyleSheet.create({
    inputContainer: {
      width: '100%',
      marginVertical: 3,
      justifyContent: 'space-between',
      position: 'relative'
    },
    input: {
      backgroundColor: colors.input,
      height: 50,
      borderRadius: 8,
      width: '100%',
      paddingLeft: 140
    },
    label: {
      position: 'absolute',
      zIndex: 9,
      marginTop: 13,
      marginLeft: 15,
      fontFamily: 'SFPD-semiBold'
    }
  });
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderText={placeholder}
        onChangeText={(text) => setData(text)}
        {...otherProps}
      />
    </View>
  );
};
const InputPlace = ({ label, placeholder, ...otherProps }) => {
  const styles = StyleSheet.create({
    inputContainer: {
      width: '100%',
      marginVertical: 3,
      justifyContent: 'space-between',
      position: 'relative'
    },
    input: {
      backgroundColor: colors.input,
      height: 45,
      borderRadius: 6,
      width: '100%',
      paddingLeft: 120
    },
    label: {
      position: 'absolute',
      zIndex: 9,
      marginTop: 10,
      marginLeft: 15,
      fontFamily: 'SFPD-semiBold'
    }
  });
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderText={placeholder}
        {...otherProps}
      />
    </View>
  );
};

const Cover = () => {
  const styles = StyleSheet.create({
    cover: {
      backgroundColor: colors.secondary,
      height: 220,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center'
    },
    coverImage: {
      width: 320,
      marginTop: -110
    }
  });
  return (
    <View style={styles.cover}>
      <Image
        source={require('../assets/createReview/cover.png')}
        style={styles.coverImage}
        resizeMode="contain"
      />
    </View>
  );
};
const SearchSection = () => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      marginVertical: 20
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
    smallTitle: {
      fontWeight: '600'
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
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.smallTitle}>Search the place you want to review</Text>

      <View style={styles.searchContainer}>
        <FontAwesome5
          name="search"
          size={22}
          color="black"
          style={styles.searchIcon}
        />
        <TextInput style={styles.input} placeholder="Search location" />
      </View>
    </View>
  );
};
const BannerSection = ({ setCreatePlace }) => {
  const styles = StyleSheet.create({
    bannerContainer: {
      marginHorizontal: 15,
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.secondaryLight,
      borderRadius: 5
    },
    bannerText: {
      fontSize: 12,
      color: colors.black,
      fontWeight: '600'
    }
  });
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerText}>Can't see what you are looking for?</Text>
      <Button
        text={'Create place'}
        borderRadius={5}
        width={100}
        height={35}
        onPress={() => setCreatePlace(true)}
      />
      {/* <Button text={'ok'} /> */}
    </View>
  );
};
const CreatePlaceSection = ({ setCreatePlace }) => {
  const [decoration, setDecoration] = useState(0);

  const styles = StyleSheet.create({
    createPlaceContainer: {
      marginHorizontal: 15,
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: colors.primaryLight,
      borderRadius: 5,
      marginVertical: 20
    },
    title: {
      fontSize: 16,
      color: colors.primary,
      marginVertical: 20,
      fontWeight: '600'
    },
    searchIcon: {
      position: 'absolute',
      zIndex: 8,
      top: 15,
      right: 15,
      color: colors.gray
    }
  });
  const Catagory = [
    {
      name: 'Educational',
      value: 'Educational'
    },
    {
      name: 'Health',
      value: 'Health'
    },
    {
      name: 'Entertainment',
      value: 'Entertainment'
    },
    {
      name: 'Tourist',
      value: 'Tourist'
    }
  ];

  return (
    <View style={styles.createPlaceContainer}>
      <Text style={styles.title}>Create a new place</Text>
      <Pressable
        style={styles.searchIcon}
        onPress={() => setCreatePlace(false)}
      >
        <Entypo name="circle-with-cross" size={24} color={colors.red} />
      </Pressable>
      <InputPlace label={'Name'} />
      <InputPlace label={'Address'} />
      <DropDown
        label={'Catagory'}
        items={Catagory}
        setData={setDecoration}
        placeholder={'Choose category'}
      />
      <Button text={'Save'} width={100} height={35} borderRadius={8} />
    </View>
  );
};

const CreateReviewForm = () => {
  const validationSchema = Yup.object().shape({
    // email: Yup.string().required().email().label('Email'),
    // password: Yup.string().required().min(4).label('Password')
  });

  const styles = StyleSheet.create({
    formContainer: {
      marginHorizontal: 15
    },
    form: {
      marginVertical: 20
    },
    imageContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginHorizontal: 5
    },
    headerText: {
      fontSize: 12,
      fontWeight: '500'
    },
    headerPlace: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary
    }
  });
  const items = [
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 }
  ];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [averageBudget, setAverageBudget] = useState('');
  const [accessibility, setAccessibility] = useState(0);
  const [decoration, setDecoration] = useState(0);
  const [service, setService] = useState(0);
  const [familyFriendly, setFamilyFriendly] = useState(0);
  const [transportation, setTransportation] = useState('');
  const [setting, setSetting] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [firstImage, setFirstImage] = useState('');

  const handleSubmit = () => {
    console.log(
      title,
      description,
      accessibility,
      decoration,
      averageBudget,
      service,
      familyFriendly,
      setting
    );
  };
  console.log(firstImage);

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>You are reviewing</Text>
        <Text style={styles.headerPlace}>University of Dhaka</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.imageContainer}>
          <ImageInput data={firstImage} setData={setFirstImage} />
          <ImageInput data={firstImage} setData={setFirstImage} />
          <ImageInput data={firstImage} setData={setFirstImage} />
        </View>
        <TextInputReview
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="text"
          name="title"
          label="Title"
          setData={setTitle}
          placeholder="Title"
          textContentType="text"
        />
        <TextInputReview
          autoCapitalize="none"
          autoCorrect={false}
          name="description"
          label="Description"
          setData={setDescription}
          placeholder="Description"
          textContentType="textArea"
        />
        <TextInputReview
          autoCapitalize="none"
          autoCorrect={false}
          name="averageBudget"
          setData={setAverageBudget}
          label="Avg. Budget"
          placeholder="avergeBudget"
          textContentType="number"
          keyboardType="numeric"
        />
        <DropDown
          items={items}
          height={50}
          setData={setAccessibility}
          label={'Accessibility'}
          placeholder={'Choose Rating'}
        />
        <DropDown
          items={items}
          height={50}
          setData={setDecoration}
          label={'Decoration'}
          placeholder={'Choose Rating'}
        />
        <DropDown
          items={items}
          height={50}
          setData={setService}
          label={'Service'}
          placeholder={'Choose Rating'}
        />
        <DropDown
          items={items}
          height={50}
          setData={setFamilyFriendly}
          label={'Family Friendly'}
          placeholder={'Choose Rating'}
        />
        <DropDown
          items={items}
          height={50}
          setData={setTransportation}
          label={'Transportation'}
          placeholder={'Choose Rating'}
        />
        <DropDown
          items={items}
          height={50}
          setData={setSetting}
          label={'Setting'}
          placeholder={'Choose Rating'}
        />
        <DropDown
          items={items}
          height={50}
          setData={setOverallRating}
          label={'Overall Rating'}
          placeholder={'Choose Rating'}
        />

        <Button
          text="Create Review"
          width={'100%'}
          borderRadius={8}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};
export default function CreateReviewScreen({ navigation }) {
  const [createPlace, setCreatePlace] = useState(false);
  const handleSubmit = ({ email, password }) => {
    navigation.navigate(routes.FEED);
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
    >
      <Cover />
      <SearchSection />
      <BannerSection setCreatePlace={setCreatePlace} />
      {createPlace && <CreatePlaceSection setCreatePlace={setCreatePlace} />}
      <CreateReviewForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollContainer: {
    width: '100%',
    right: 0
  }
});
