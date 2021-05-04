import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import DonateScreen from "../Screens/DonateScreen";
import RequestScreen from "../Screens/RequestScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";

export const AppTabNavigator = createBottomTabNavigator({
  DonateBook: {
    screen: DonateScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request-list.png")}
          style={{ width: 30, height: 30 }}
        />
      ),
      tabBarLabel:"Donate  Book"
    },
  },

  RequestBook: {
    screen: RequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request-book.png")}
          style={{ width: 30, height: 30 }}
        />
      ),
      tabBarLabel:"Request Book"
    },
  },
});
