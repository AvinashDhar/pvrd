import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputSpinner from "react-native-input-spinner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import Search from "../components/Search";
import { primaryColor, secondaryColor } from "../assets/colors";

const ProductInfoScreen = (props) => {

  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;

  const dispatch = useDispatch();
  const route = useRoute();
  const cart = useSelector((state) => state.cart.cart);

  const [productsData, setProductsData] = useState(route?.params?.item);
  const [addedToCart, setAddedToCart] = useState(false);
  console.log("inside product info screen: ", route?.params?.item)
  const addItemToCart = (item) => {
    let orderItems = JSON.parse(JSON.stringify(productsData));
    orderItems = orderItems?.productVariants?.filter(variant => !!variant.quantity);
    if (orderItems.length < 1) {
      Alert.alert("Login Error", "Please provide valid quantity for atleast one variant");
      return;
    }
    let payload = orderItems?.map(variant => {
      return {
        id: variant.id,
        orderItem: {
          product: productsData.id,
          productVariant: variant.id,
          quantity: variant.quantity
        }
      }
    });

    setAddedToCart(true);
    dispatch(addToCart(payload));
  };

  const handleQuantityChange = (num, variantId) => {
    let temp = productsData;
    let changedProductVariantsData = temp?.productVariants?.map(item => {
      if (item.id === variantId) {
        item.quantity = num;
        return item;
      }
      return item;
    })
    temp.productVariants = changedProductVariantsData;
    setProductsData(temp)
  }

  return (
    <ScrollView
      style={{ width: '100%', backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <Search />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {

          route.params.item.images?.length > 0 ? (route.params?.item.images?.map((item, index) => (
            <ImageBackground
              style={{ width, height, marginTop: 25, resizeMode: "contain" }}
              source={{ uri: item }}
              key={index}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#C60C30",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    20% off
                  </Text>
                </View>

                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </View>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </ImageBackground>
          ))) : (<ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            source={{ uri: route.params.item.image }}
            key={route.params.item.id}
          >
            {/* <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={28}
                  color={primaryColor}
                />
              </View>
            </View> */}

            {/* <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 20,
                backgroundColor: '#eee',
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <Feather name="heart" size={28} color={primaryColor} />
            </View> */}
          </ImageBackground>)}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route?.params?.item?.title}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          ₹{route?.params?.price}
        </Text>
      </View>

      <Text style={{ height: 0.5, borderColor: "#D0D0D0", borderWidth: 0.5, marginBottom:10 }} />
      {productsData?.productVariants?.map(variant => {
        return (<>


          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>

            <View>
              <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
                <Text>Color: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {variant.colour ? variant.colour : 'No Choice'}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
                <Text>Size: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {variant.size ? variant.size : 'Free Size'}
                </Text>
              </View>
            </View>
            <InputSpinner
              skin="modern"
              max={100}
              min={0}
              step={1}
              style={{ fontSize: 10, fontWeight: 'bold' }}
              colorMax={primaryColor}
              colorMin={primaryColor}
              color={primaryColor}
              value={variant?.quantity ? variant?.quantity : 0}
              onChange={(num) => {
                handleQuantityChange(num, variant?.id)
              }}
            />
          </View>

          <Text style={{ height: 0.5, borderColor: "#D0D0D0", borderWidth: 0.5, marginTop:10 }} />
        </>)
      })}

      {/* <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total : ₹{route?.params?.price}
        </Text>
        <Text style={{ color: "#00CED1" }}>
          FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons name="location" size={24} color="black" />

          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Deliver To Sujan - Bangalore 560019
          </Text>
        </View>
      </View> */}

      {/* <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
        IN Stock
      </Text> */}

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: secondaryColor,
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 20,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>

      {/* <Pressable
        style={{
          backgroundColor: "#FFAC1C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text>Buy Now</Text>
      </Pressable> */}
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
