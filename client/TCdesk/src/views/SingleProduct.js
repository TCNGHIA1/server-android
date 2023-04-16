import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import data from "../../database/dbProducts";
import COLORS from "../components/Colors";
import Rating from "../components/Rating";
import request from "../api/request";
import AppLoading from "../components/AppLoading";
const SingleProduct = ({ route }) => {
  const id = route.params.id;

  const [product, setProduct] = useState({
    image: "",
    name: "",
    price: 0,
    rating: 0,
    description: "",
  });
  const { width, height } = useWindowDimensions();
  const [loadding, setLoadding] = useState(true);
  //get item product
  const time = setTimeout(() => {
    setLoadding(false);
  }, 1500);

  const getItem = async () => {
    try {
      const req = await request.get(`client/product/${route.params.id}`);
      if (req.data) {
        setProduct(req.data);
        time;
      } else {
        setLoadding(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    setLoadding(true);
    getItem();
    return clearTimeout(time);
  }, []);
  //show more text
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  //click button cart
  const handleCart = () => {
    Alert.alert("Thực hiên công việc đặt hàng!");
  };

  return (
    <View style={{ flex: 1 }}>
      {loadding ? (
        <AppLoading />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card_image}>
            {product.image ? (
              <Image source={{ uri: product.image }} style={styles.image} />
            ) : (
              <Image
                source={require("../images/no_image.png")}
                style={styles.image}
              />
            )}
          </View>
          <Text style={styles.title}>Thông tin sản phẩm</Text>
          {/* Detail product */}
          <View style={styles.detail}>
            <View style={[styles.card, { width: "95%" }]}>
              <View style={[styles.row, styles.around]}>
                <Text style={[styles.card_title, styles.flex]}>
                  Tên sản phẩm:
                </Text>
                <Text
                  style={[styles.card_title, styles.flex, styles.text_center]}
                >
                  {product.name}
                </Text>
              </View>
              <View style={[styles.row, styles.around]}>
                <Text style={[styles.card_title, styles.flex]}>Giá tiền:</Text>
                <Text
                  style={[styles.card_price, styles.flex, styles.text_center]}
                >
                  {product.price} đồng
                </Text>
              </View>
              <View style={[styles.row, styles.around]}>
                <Text style={[styles.card_title, styles.flex]}>Đánh giá:</Text>
                <Rating
                  value={product.rating}
                  style={{ justifyContent: "center" }}
                />
              </View>
              <View style={[styles.row, styles.around]}>
                <Text style={[styles.card_title, styles.flex]}>
                  Tình trạng:
                </Text>
                <Text
                  style={[styles.card_title, styles.flex, styles.text_center]}
                >
                  Còn hàng
                </Text>
              </View>
            </View>
          </View>
          {/* more */}
          <Text style={styles.title}>Chi tiết</Text>

          <View style={{ marginHorizontal: 10 }}>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 3}
              style={{ lineHeight: 21 }}
            >
              {product.description}
            </Text>

            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  lineHeight: 21,
                  marginTop: 4,
                  color: COLORS.blueviolet,
                }}
              >
                {textShown ? "Read less..." : "Read more..."}
              </Text>
            ) : null}
          </View>
          {/* button to add cart */}
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleCart()}
            >
              <Text style={styles.button_text}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    margin: 5,
  },
  around: {
    justifyContent: "space-around",
  },
  container: { width: "100%" },
  card_image: {
    alignItems: "center",
    maxHeight: 260,
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
  detail: {
    alignItems: "center",
    flex: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
  },
  card: {
    borderRadius: 15,
    borderWidth: 0.5,
    backgroundColor: COLORS.azure,
  },
  card_title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card_price: {
    fontSize: 16,
    color: "red",
    fontStyle: "italic",
    marginLeft: 10,
    fontWeight: 500,
  },
  flex: {
    flex: 1,
  },
  text_center: {
    textAlign: "center",
  },
  button: {
    width: "95%",
    backgroundColor: "green",
  },
  button_text: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    paddingVertical: 5,
  },
});
