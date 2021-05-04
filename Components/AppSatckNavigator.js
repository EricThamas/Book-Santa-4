import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DonateScreen from "../screens/DonateScreen";
import RecieverDetailes from "../screens/Reciever'sdetails";

export const AppStackNavigator = createStackNavigator(
  {
    DonateBookList: {
      screens: DonateScreen,
    },
    RecieverDetailes: { screen: RecieverDetailes },
  },
  {
      initialRouteName:"DonateBookList"
  }
);
