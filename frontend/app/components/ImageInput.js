import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useState } from 'react';
import Button from './Button';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { PRODUCTION_URL } from '../config/production';

const BASE_URL = PRODUCTION_URL;

export default function ImageInput({ data, setData }) {
  // const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userLoginData = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLoginData;

  const uploadFileHandler1 = async (result) => {
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    formData.append('image', { uri: localUri, name: filename, type });
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/upload`,
        formData,
        config
      );

      setData(data.data);

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const width = 120;
  const height = 120;
  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryLight,
      borderRadius: 5,
      overflow: 'hidden'
    },
    button: {
      opacity: 0
    },
    loader: {
      position: 'absolute',
      top: 50,
      left: 50
    }
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      uploadFileHandler1(result);

      // setData(result.uri);
    }
  };

  // async function uploadFileHandler() {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3]
  //   });

  //   if (result.cancelled) {
  //     return;
  //   }

  //   let localUri = result.uri;
  //   let filename = localUri.split('/').pop();

  //   let match = /\.(\w+)$/.exec(filename);
  //   let type = match ? `image/${match[1]}` : `image`;

  //   let formData = new FormData();

  //   formData.append('image', { uri: localUri, name: filename, type });

  //   setImage(localUri);
  //   try {
  //     const data = await fetch(`${BASE_URL}/api/upload`, {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'content-type': 'multipart/form-data',
  //         Authorization: `Bearer ${userInfo.token}`
  //       }
  //     });

  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  return (
    <View style={styles.container}>
      <Pressable title="Pick Image" onPress={pickImage} styles={styles.button}>
        {data && (
          <Image
            source={{ uri: data }}
            style={{ width: width, height: height }}
          />
        )}
        {!data && !uploading && (
          <MaterialIcons
            name="add-circle-outline"
            size={34}
            color={colors.white}
          />
        )}
        {uploading && (
          <ActivityIndicator
            size={24}
            color={colors.primary}
            style={styles.loader}
          />
        )}
      </Pressable>
    </View>
  );
}
