import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "./Colors";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";

const ItemListProduct = ({ item, onPress }) => {
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width * 0.9,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,

        padding: 5,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.bisque,
          borderRadius: 10,
          flexDirection: "row",
          flex: 1,
        }}
      >
        {/* card image */}
        <View
          style={{
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
            borderRightColor: COLORS.brown,
            borderRightWidth: 0.3,
          }}
        >
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
          ) : (
            <Image
              source={require("../images/products/product02.png")}
              style={{ width: "95%", resizeMode: "contain" }}
            />
          )}
        </View>
        {/* card body */}
        <View
          style={{
            flex: 3,
            paddingLeft: 5,
            paddingTop: 5,
            justifyContent: "space-evenly",
          }}
        >
          <Text
            style={{ flex: 1, fontSize: 18, fontWeight: "bold" }}
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Rating value={item.rating} />
          <Text
            style={{ flex: 1, fontSize: 16, color: "red", fontWeight: "bold" }}
          >
            {item.price} dong
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemListProduct;

const styles = StyleSheet.create({});
