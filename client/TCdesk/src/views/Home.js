import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import request from "../api/request";
import ItemListProduct from "../components/ItemListProduct";
import AppLoading from "../components/AppLoading";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState({});
  const { width, height } = useWindowDimensions();

  const [loading, setLoading] = useState(true);

  const timeOut = setTimeout(() => {
    setLoading(false);
  }, 3000);
  useEffect(() => {
    const getProdcuts = async () => {
      try {
        const req = await request.get("client/product/getAll");
        if (req.data) {
          setProducts(req.data);
          timeOut;
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getProdcuts();
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      {!loading ? (
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
      ) : (
        <AppLoading />
      )}
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
