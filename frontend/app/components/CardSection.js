import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Card from './Card';
import routes from '../navigation/routes';

const CardSection = ({ title, data, navigation }) => {
  const styles = StyleSheet.create({
    cardContainer: {
      marginVertical: 0,
      overflow: 'visible',
      width: '110%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: -15
    },
    cardContainerWrapper: {
      paddingHorizontal: 10,
      overflow: 'visible'
    },
    container: {
      marginVertical: 15
    },

    forYou: {
      fontWeight: '700',
      fontSize: 18
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.forYou}>{title}</Text>
      <View style={styles.cardContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.cardContainerWrapper}
        >
          {data.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate(routes.LOCATION_DETAILS, {
                  data: item
                })
              }
            >
              <Card
                title={item.title}
                distance={item.distance}
                location={item.location}
                imguri={item.imaguri}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CardSection;
