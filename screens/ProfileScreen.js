import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_API_URL } from "@env";
import { primaryColor, secondaryColor } from "../assets/colors";
const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: secondaryColor,
      },
      headerLeft: () => (
        <Image
          style={{ width: 100, height: 90, resizeMode: "contain" }}
          source={require('../assets/pvrd-logo.png')}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
      ),
    });
  }, []);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error while fetching profile: ", error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/api/v1/orders/get/userorders/${userId}`
        );
        const orders = response.data;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error while fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Welcome {user?.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 20,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your orders</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Logout</Text>
        </Pressable>
      </View>

      {/* horizontal showsHorizontalScrollIndicator={false} */}
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders?.length > 0 ? (
          orders?.map((order) => (
            <View>
              <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1, marginBottom: 10 }} />
              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16,color:primaryColor }}>
                  Status: {order?.status}
                </Text>
                <Text style={{ fontWeight: "light", fontSize: 12, color: '#aaa' }}>
                  Ordered Date: {order.dateOrdered.split('T')[0]}
                </Text>
              </View>
              <ScrollView>
                {order?.orderItems?.map(item => (
                  <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 3,
                    padding: 10,
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    elevation: 20,
                    shadowColor: secondaryColor,
                    shadowOpacity: 0.4,
                  }}>
                    <Image
                      style={{ width: 50, height: 50, resizeMode: "contain", flex: 1 }}
                      source={{ uri: item.product.image }}
                    />
                    <View style={{ flex: 3 }}>
                      <Text style={{fontWeight: "bold", fontSize: 14, color:primaryColor, fontFamily:'Open Sans'}}>
                        {item.product.name}
                      </Text>
                      <Text style={{fontWeight: "light", fontSize: 12, color:'#777'}}>
                        Quantity: {item.quantity}
                      </Text>
                      <Text style={{fontWeight: "light", fontSize: 12, color:'#777'}}>
                        Size: {item.product.productVariants.filter(variant => variant.id == item.productVariant)[0].size}
                      </Text>
                      <Text style={{fontWeight: "light", fontSize: 12, color:'#777'}}>
                        Colour:  {item.product.productVariants.filter(variant => variant.id == item.productVariant)[0].colour}
                      </Text>
                      <Text style={{fontWeight: "bold", fontSize: 14, color:'#555'}}>
                        Price: {item.product.productVariants.filter(variant => variant.id == item.productVariant)[0].price}
                      </Text>
                      <Text style={{fontWeight: "bold", fontSize: 14, color: '#aaa'}}>
                        Status: {item?.status}
                      </Text>
                    </View>
                  </View>

                ))}
              </ScrollView>
              <View style={{display:'flex', alignItems:'flex-end'}}>
              <Text style={{ fontWeight: "bold", fontSize: 18,marginVertical:10,marginRight:10, color:secondaryColor }}>
                Total Price: {order?.totalPrice}
              </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
