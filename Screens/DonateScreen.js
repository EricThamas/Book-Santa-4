import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../Components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default class DonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      requestBookList: [],
    };
    this.rquestdata = null;
  }

  getRequestBooklist = () => {
    this.rquestdata = db.collection("requestedBooks").onSnapshot((snapshot) => {
      var requestedbook = snapshot.docs.map((document) => document.data());
      console.log(requestedbook);
      this.setState({
        requestBookList: requestedbook,
      });
    });
  };

  componentDidMount (){
    this.getRequestBooklist();
  };

  componentWillUnmount() {
    this.rquestdata();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.bookname}
        subtitle={item.reasonToRequest}
        titleStyle={{ color: "black", fontWeight: "bold", fontSize: 30 }}
        rightElement={
          <TouchableOpacity style={styles.button} onPress={() => {
            this.props.navigation.navigate("RecieverDetailes",{"details":item})
          }}>
            <Text style={{ color: "black" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          

          <View style={{ flex: 1 }}>
            {this.state.requestBookList.length === 0 ? (
              <View styel={styles.subContainer}>
                <Text style={{ fontSize: 30 }}>
                  {" "}
                  no requestBookList in firebase{" "}
                </Text>
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestBookList}
                renderItem={this.renderItem}
              />
            )}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
  },
});
