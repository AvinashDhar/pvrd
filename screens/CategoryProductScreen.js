import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    Image,
  } from "react-native";
  import React, { useState, useEffect, useCallback, useContext } from "react";
  import { Feather } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { SliderBox } from "react-native-image-slider-box";
  import axios from "axios";
  import ProductItem from "../components/ProductItem";
  import DropDownPicker from "react-native-dropdown-picker";
  import { useNavigation } from "@react-navigation/native";
  import { useSelector } from "react-redux";
  import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { UserType } from "../UserContext";
  import jwt_decode from "jwt-decode";
  import { BASE_API_URL } from "@env";
import Search from "../components/Search";
import { secondaryColor } from "../assets/colors";

  const HomeScreen = (props) => {
  
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [category, setCategory] = useState("");
    const { userId, setUserId } = useContext(UserType);
    const [selectedAddress,setSelectedAdress] = useState("");
    //console.log(selectedAddress)
    const [categoryItems, setCategoryItems] = useState([]);
    const [categoryList ,setCategoryList] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${BASE_API_URL}/api/v1/categories/${props?.route?.params?.categoryId}/products`);
          setProducts(response.data);
        } catch (error) {
          console.log("error while fetching products", error);
        }
      };
  
      fetchProducts();
    }, [props?.route?.params?.categoryId]);
    const onGenderOpen = useCallback(() => {
      setCompanyOpen(false);
    }, []);
  
    //const cart = useSelector((state) => state.cart.cart);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
      if (userId) {
        fetchAddresses();
      }
    }, [userId, modalVisible]);
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/addresses/${userId}`
        );
        const { addresses } = response.data;
  
        setAddresses(addresses);
      } catch (error) {
        console.log("error while fetching address: ", error);
      }
    };
    useEffect(() => {
      const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      };
  
      fetchUser();
    }, []);
    //console.log("address", addresses);
    return (
      <>
        <SafeAreaView
          style={{
            paddinTop: Platform.OS === "android" ? 40 : 0,
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <ScrollView>
            <Search />
  
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                padding: 10,
                backgroundColor: secondaryColor,
              }}
            >
              <Ionicons name="location-outline" size={24} color="black" />
  
              <Pressable>
              {selectedAddress ? (
                  <Text>
                    Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                      Add a Address
                  </Text>
                )}
              </Pressable>
  
              <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
            </Pressable>
                                
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {products
                ?.map((item, index) => (
                  <ProductItem item={item} key={item.id} />
                ))}
            </View>
            
  
            {/* <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 2,
                marginTop: 15,
              }}
            /> */}
  
          </ScrollView>
        </SafeAreaView>
  
        <BottomModal
          onBackdropPress={() => setModalVisible(!modalVisible)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          onHardwareBackPress={() => setModalVisible(!modalVisible)}
          visible={modalVisible}
          onTouchOutside={() => setModalVisible(!modalVisible)}
        >
          <ModalContent style={{ width: "100%", height: 400 }}>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Choose your Location
              </Text>
  
              <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
                Select a delivery location to see product availabilty and delivery
                options
              </Text>
            </View>
  
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* already added addresses */}
              {addresses?.map((item, index) => (
                <Pressable
                onPress={() => setSelectedAdress(item)}
                  style={{
                    width: 140,
                    height: 140,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    marginRight: 15,
                    marginTop: 10,
                    backgroundColor:selectedAddress === item ? "#FBCEB1" : "white"
                  }}
                >
                  <View
                    style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
  
                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    {item?.houseNo},{item?.landmark}
                  </Text>
  
                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    {item?.street}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    India, Bangalore
                  </Text>
                </Pressable>
              ))}
  
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Address");
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  marginTop: 10,
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#0066b2",
                    fontWeight: "500",
                  }}
                >
                  Add an Address or pick-up point
                </Text>
              </Pressable>
            </ScrollView>
  
            <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Entypo name="location-pin" size={22} color="#0066b2" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Enter an Indian pincode
                </Text>
              </View>
  
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Use My Currect location
                </Text>
              </View>
  
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <AntDesign name="earth" size={22} color="#0066b2" />
  
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Deliver outside India
                </Text>
              </View>
            </View>
          </ModalContent>
        </BottomModal>
      </>
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({});
  