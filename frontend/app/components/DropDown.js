import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';

const DropDown = ({
  label,
  items,
  height,
  setData,
  placeholder,
  ...otherProps
}) => {
  const [value, setValue] = useState('');
  const [showList, setShowList] = useState(false);
  const styles = StyleSheet.create({
    chooseItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 8
    },
    chooseItemIcon: {
      // marginTop: 8
      zIndex: -999
    },

    inputContainer: {
      width: '100%',
      marginVertical: 3,
      justifyContent: 'space-between',
      position: 'relative'
    },
    input: {
      backgroundColor: colors.input,
      height: height ? height : 45,
      borderRadius: 6,
      paddingLeft: 140,
      justifyContent: 'center'
    },
    item: {
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.white,
      fontSize: 12,
      textTransform: 'capitalize'
    },
    itemslist: {
      backgroundColor: colors.input,
      paddingVertical: 10,
      left: 100,
      top: 2,
      position: 'absolute',
      width: '70%',
      borderRadius: 5,
      zIndex: 999,
      elevation: 2
    },
    label: {
      position: 'absolute',
      zIndex: 9,
      marginTop: 12,
      marginLeft: 15,
      fontFamily: 'SFPD-semiBold'
    },
    value: {}
  });
  const DropDownBox = () => {
    return (
      <>
        <Pressable
          style={styles.input}
          onPress={() => setShowList((prev) => !prev)}
        >
          <View style={styles.chooseItem}>
            <Text style={styles.value}>{value ? value : placeholder}</Text>
            <AntDesign
              name="caretdown"
              size={20}
              color={colors.black}
              style={styles.chooseItemIcon}
            />
          </View>
        </Pressable>
        {showList && (
          <View style={styles.itemslist}>
            {items.map((item, index) => (
              <Pressable
                onPress={() => {
                  setValue(item.name);
                  setData(item.value);
                  setShowList(false);
                }}
                key={index}
              >
                <Text style={styles.item}>{item.name}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </>
    );
  };
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <DropDownBox />
    </View>
  );
};
export default DropDown;
