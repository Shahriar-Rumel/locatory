import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView
} from 'react-native';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../config/colors';
import Button from '../components/Button';
import ImageInput from '../components/ImageInput';
import { Feather } from '@expo/vector-icons';
import { updateUser } from '../actions/userActions';
import routes from '../navigation/routes';
import { Ionicons } from '@expo/vector-icons';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

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

const CreateReviewForm = ({ selectedPlace, navigation }) => {
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

  const userData = useSelector((state) => state.userData);
  const {
    userDetails,
    loading: userDataLoading,
    error: userDataError
  } = userData;

  const { data } = userDetails;

  const [name, setName] = useState(data?.name);

  const [firstImage, setFirstImage] = useState(data?.photo);

  const dispatch = useDispatch();

  const userUpdateData = useSelector((state) => state.userUpdateData);

  const { userUpdate, loading, success, error } = userUpdateData;

  const handleSubmit = () => {
    const data = {
      name: name,
      photo: firstImage
    };

    dispatch(updateUser(data));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({
          type: USER_UPDATE_RESET
        });
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({
          type: USER_UPDATE_RESET
        });
      }, 3000);
    }
  }, [error]);
  return (
    <View style={styles.formContainer}>
      {error && <Message message={'Please try again !'} />}
      {success && (
        <Message
          message={'Profile updated successfully !'}
          bgcolor={colors.greenLight}
          textcolor={colors.green}
        />
      )}
      <View style={styles.form}>
        <View style={styles.imageContainer}>
          <ImageInput
            data={firstImage}
            setData={setFirstImage}
            borderRadius={200}
            height={200}
            width={200}
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
          value={name}
          label="Name"
          setData={setName}
          placeholder="Name"
          textContentType="text"
        />

        <Button
          text="Update Profile"
          width={'100%'}
          borderRadius={8}
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </View>
  );
};
export default function EditProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.reviewsHeader}>
        <Feather name="edit" size={20} color={colors.secondary} />
        <Text style={styles.reviews}>Edit Profile </Text>
        <Pressable
          onPress={() => {
            navigation.navigate(routes.PROFILE, {
              data: true
            });
          }}
          style={styles.backButton}
        >
          <View style={styles.backIcon}>
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
            />
          </View>
        </Pressable>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <CreateReviewForm navigation={navigation} />
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
  },
  backButton: {
    backgroundColor: colors.secondaryLight,
    opacity: 1,
    position: 'absolute',
    right: 15,
    top: 25,
    height: 25,
    width: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 100
  },
  backIcon: {
    marginTop: -1
  }
});
