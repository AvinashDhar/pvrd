import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import { useFonts } from 'expo-font';
import StackNavigator from "./navigation/StackNavigator";
import store from "./store";
import { UserContext } from "./UserContext";

export default function App() {
  let [fontsLoaded] = useFonts({
    'Sans' : require('./assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf'),
    'OpenSans' : require('./assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
  })
  if(!fontsLoaded){
    return <><Text>Loading...</Text></>
  }
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
