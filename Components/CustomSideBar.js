import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { DrawerItems } from "react-navigation-drawer";
export default class CustomSideBarMenu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.DrawerItemContainer}>
          <DrawerItems {...this.props} />
        </View>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => {
            this.props.navigation.navigate("Welcome");
            firebase.auth().signOut();
          }}
        >
          <Text style={styles.text}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  DrawerItemContainer: {
    flex: 0.8,
  },
  inputBox: {
    justifyContent: "center",
    padding: 10,
  },
  text: { fontSize: 30, fontWeight: "bold" },
});
