import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import data from "../../database/dbProducts";

import request from "../api/request";
import ItemListProduct from "../components/ItemListProduct";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    const dataProdcut = () => {
      setProducts(data);
    };
    dataProdcut();
    // getProdcuts();
  }, []);
  // const getProdcuts = async () => {
  //   try {
  //     const res = await request.get("client/products");
  //     setProducts(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Danh sách sản phẩm</Text>
        <FlatList
          data={products}
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ItemListProduct
              item={item}
              onPress={() => {
                navigation.navigate("SingleProduct", { id: item._id });
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "ghostwhite",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 5,
  },
});
