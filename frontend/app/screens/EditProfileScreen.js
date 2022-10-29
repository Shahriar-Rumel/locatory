import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import colors from '../config/colors';
import Button from '../components/Button';
import DropDown from '../components/DropDown';
import ImageInput from '../components/ImageInput';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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

const CreateReviewForm = ({ selectedPlace }) => {
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
      justifyContent: 'center',
      marginVertical: 5
    },
    editIcon: {
      position: 'absolute',
      bottom: 5
    }
  });
  const items = [
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 }
  ];

  const [name, setName] = useState('');
  const [accessibility, setAccessibility] = useState(0);

  const [firstImage, setFirstImage] = useState('');

  const dispatch = useDispatch();
  const createReviewForPlaceData = useSelector(
    (state) => state.createReviewForPlaceData
  );

  const { createReviewForPlace, loading, error } = createReviewForPlaceData;

  const handleReviewSubmit = () => {
    const data = {
      name: name,
      photo: firstImage
    };

    // dispatch(createReviewByPlace(selectedPlace._id, data));
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.form}>
        <View style={styles.imageContainer}>
          <ImageInput
            data={firstImage}
            setData={setFirstImage}
            borderRadius={90}
          />
          <Feather
            name="edit"
            size={20}
            color={colors.white}
            style={styles.editIcon}
          />
        </View>
        <TextInputReview
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="text"
          name="name"
          label="Name"
          setData={setName}
          placeholder="Name"
          textContentType="text"
        />
        <DropDown
          items={items}
          height={50}
          setData={setAccessibility}
          label={'Accessibility'}
          placeholder={'Choose Rating'}
        />

        <Button
          text="Create Review"
          width={'100%'}
          borderRadius={8}
          onPress={handleReviewSubmit}
          loading={loading}
        />
      </View>
    </View>
  );
};
export default function EditProfileScreen({ navigation }) {
  const [item, setItem] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.reviewsHeader}>
        <Feather name="edit" size={20} color={colors.secondary} />
        <Text style={styles.reviews}>Edit Profile </Text>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <CreateReviewForm selectedPlace={item} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 25
  },
  scrollContainer: {
    width: '100%',
    right: 0
  },
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
