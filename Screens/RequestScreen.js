import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class RequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookname: "",
      reasonToRequest: "",
    };
  }

  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

  addrequest = (bookname, reasonToRequest) => {
    var userId = this.state.userId;
    var randomrequest = this.createUniqueId();
    db.collection("requestedBooks").add({
      userId: userId,
      bookname: bookname,
      reasonToRequest: reasonToRequest,
      requestId: randomrequest,
    });
    this.setState({
      bookname: "",
      reasonToRequest: "",
    });
    return Alert.alert("Book Requested Successfully");
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView>
          <View>
            <TextInput
              style={styles.inputBox}
              placeholder={" Enter the Book Name"}
              onChangeText={(text) => {
                this.setState({
                  bookname: text,
                });
              }}
              value={this.state.bookname}
            ></TextInput>

            <TextInput
              style={styles.inputBox}
              placeholder={" Enter the Request Reason  "}
              onChangeText={(text) => {
                this.setState({
                  reasonToRequest: text,
                });
              }}
              value={this.state.reasonToRequest}
            ></TextInput>
            <TouchableOpacity
              onPress={() => {
                this.addrequest(this.state.bookname,this.state.reasonToRequest)
              }}
              style={styles.button}
            >
              <Text>Request</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputBox: {
    width: "75%",
    height: 30,
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginLeft: 230,
    padding: 30,
  },
});
