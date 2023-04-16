import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";
import COLORS from "./Colors";
const AppLoading = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <ActivityIndicator size={80} color={COLORS.aqua} />
      <Text style={{ marginHorizontal: 10, fontSize: 24, color: COLORS.white }}>
        Loading....
      </Text>
    </View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    flexDirection: "row",
    zIndex: 1,
  },
});
