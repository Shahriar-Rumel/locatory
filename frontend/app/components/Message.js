import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../config/colors';

const Message = ({ message, bgcolor, textcolor }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  const styles = StyleSheet.create({
    messageContainer: {
      backgroundColor: bgcolor ? bgcolor : colors.redLight,
      color: textcolor ? textcolor : colors.red,
      paddingHorizontal: 25,
      paddingVertical: 15,
      zIndex: 999,
      width: '100%',
      borderRadius: 10,
      marginVertical: 10
    },
    message: {
      color: textcolor ? textcolor : colors.red
    }
  });
  return (
    <>
      {show && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      )}
    </>
  );
};

export default Message;
