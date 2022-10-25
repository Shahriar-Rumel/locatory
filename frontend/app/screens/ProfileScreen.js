import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import Button from "../components/Button";

const ProfileScreen = () => {
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
          backgroundColor={colors.secondary}
        />
      </View>
      <View style={styles.coverBottom}>
        <Text style={styles.coverBottomText}>Dhaka,Bangladesh</Text>
        <Text style={styles.coverBottomText}>Joined at 26 May , 2022</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  cover: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    paddingBottom: 20,
  },
  dp: {
    backgroundColor: colors.white,
    height: 100,
    width: 100,
    marginTop: 60,
    borderRadius: 50,
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
    fontSize: 24,
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
});
