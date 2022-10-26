import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../config/colors";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import routes from "../navigation/routes";

const CoverSection = () => {
  const styles = StyleSheet.create({
    cover: {
      backgroundColor: colors.primary,
      alignItems: "center",
      paddingBottom: 20,
      marginBottom: 10,
    },
    dp: {
      backgroundColor: colors.secondary,
      height: 150,
      width: 150,
      marginTop: 60,
      borderRadius: 150,
    },
    headingcontainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    detailscontainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    username: {
      color: colors.white,
      fontSize: 32,
      fontWeight: "500",
    },
    email: {
      color: colors.white,
    },
    footertext: {
      color: colors.white,
      fontSize: 20,
      fontWeight: "500",
    },
    coverBottomText: {
      color: colors.white,
    },
    coverBottom: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
      marginTop: 30,
    },
    bottomleft: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.cover}>
      <View style={styles.dp}></View>
      <View style={styles.headingcontainer}>
        <View style={styles.detailscontainer}>
          <Text style={styles.username}>Anonymous User</Text>
          <Text style={styles.email}>example@gmail.com</Text>
        </View>
        <Button
          style={styles.editbutton}
          text={"Edit"}
          width={100}
          height={35}
          borderRadius={8}
          color={colors.white}
          bgColor={colors.secondary}
        />
      </View>
      <View style={styles.coverBottom}>
        <View style={styles.bottomleft}>
          <Ionicons
            name="md-location-sharp"
            size={24}
            color={colors.secondary}
          />
          <Text style={styles.coverBottomText}>Dhaka,Bangladesh</Text>
        </View>
        <Text style={styles.coverBottomText}>Joined at 26 May , 2022</Text>
      </View>
    </View>
  );
};
const ProfileActivity = ({ navigation }) => {
  const styles = StyleSheet.create({
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.light,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    itemleft: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      marginLeft: 10,
      fontSize: 14,
    },
  });
  const activityList = [
    {
      icon: <FontAwesome name="heart" size={16} color="black" />,
      title: "Favorites",
      link: "/",
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="office-building-marker"
          size={18}
          color="black"
        />
      ),
      title: "Places",
      link: "/",
    },
    {
      icon: <MaterialIcons name="rate-review" size={18} color="black" />,
      title: "Reviews",
      link: "/",
    },
    {
      icon: <Ionicons name="ios-settings" size={18} color="black" />,
      title: "Settings",
      link: "/",
    },
  ];

  return (
    <View>
      {activityList.map((item) => (
        <TouchableOpacity
          style={styles.item}
          // onPress={() => navigation.navigate(routes.NOTIFICATION)}
        >
          <View style={styles.itemleft}>
            {item.icon}
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {/* <Ionicons name="arrow-forward-circle-sharp" size={24} color="black" /> */}
          {/* <MaterialCommunityIcons name="greater-than" size={18} color="black" /> */}
          <Ionicons
            name="arrow-forward-circle-outline"
            size={20}
            color="black"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
const ProfileScreen = ({ navigation }) => {
  return (
    <>
      <CoverSection />
      <ProfileActivity navigation={navigation} />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
