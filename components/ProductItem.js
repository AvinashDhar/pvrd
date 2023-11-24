import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { primaryColor, secondaryColor } from "../assets/colors";
import { AntDesign } from "@expo/vector-icons";
const ProductItem = ({ item }) => {
  //const [addedToCart, setAddedToCart] = useState(false);
  //const dispatch = useDispatch();
  const navigation = useNavigation();
  // const addItemToCart = (item) => {
  //   setAddedToCart(true);
  //   dispatch(addToCart(item));
  //   setTimeout(() => {
  //     setAddedToCart(false);
  //   }, 2000);
  // };
  return (<View style={{
    backgroundColor: 'white',
    elevation: 20,
    shadowColor: secondaryColor,
    shadowOpacity: 0.4,
    width: '50%'
  }}>
    <Pressable
      style={{ padding: 10, marginVertical: 25, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onPress={() =>
        navigation.navigate("Info", {
          id: item.id,
          title: item?.name,
          carouselImages: item?.images,
          item: item,
        })
      }>
      <View
        style={{
          width: "100%",
          height: 40,
          borderRadius: 20,
          display:"flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          flexDirection: "row",
          marginTop: "auto",
          marginLeft: 20,
          marginBottom: 20,
        }}
      >
        <View style={{flex:4,width:"80%"}}></View>
        <AntDesign style={{flex:3, fontWeight:"bold"}} name="hearto" size={24} color={secondaryColor} />
      </View>
      <Image
        style={{ width: 80, height: 120, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <View
        style={{
          marginTop: 5,
          display: 'flex',
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 13, color: primaryColor, fontWeight: "bold", fontFamily: "OpenSans" }}>
          {item?.category?.name}
        </Text>
        <Text numberOfLines={2} style={{ fontSize: 12, width: 150, marginTop: 5, fontFamily: "OpenSans-Light" }}>
          {item?.name}
        </Text>
        <Text style={{ marginTop: 5, fontSize: 15, fontWeight: "bold", fontFamily: "OpenSans" }}>MRP ₹{item?.productVariants[0]?.price}</Text>

      </View>

      {/* <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable> */}
    </Pressable>
  </View>


  );
};

export default ProductItem;

const styles = StyleSheet.create({

});
