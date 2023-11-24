import React from 'react'
import {
    View,
    Pressable,
    TextInput,
  } from "react-native";
  import { AntDesign } from "@expo/vector-icons";
  import { Feather } from "@expo/vector-icons";
  import { primaryColor, secondaryColor } from "../assets/colors";

export default function Search() {
  return (
    <>
        <View
            style={{
              backgroundColor: primaryColor,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search in PVRD" />
            </Pressable>

            <Feather name="mic" size={24} color="white" />
          </View>
    </>
  )
}
