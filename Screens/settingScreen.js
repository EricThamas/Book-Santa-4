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
export default class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      FirstName: "",
      LastName: "",
      Address: "",
      PhoneNumber: "",
      Password: "",
      docId: "",
    };
  }
  getUserDetailes = () => {
    var user = firebase.auth().currentUser;
    var email = user.email;
    db.collection("users")
      .where("emailId", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: doc.emailId,
            FirstName: data.First_Name,
            LastName: data.Last_Name,
            Address: data.Address,
            Password: data.password,
            PhoneNumber: data.PhoneNumber,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetailes=()=>{
db.collection("users").doc(this.state.docId).update({
    First_Name:this.state.FirstName,
    Last_Name:this.state.LastName,
    Address:this.state.Address,
    PhoneNumber:this.state.PhoneNumber,
    password:this.state.Password,
})

return Alert.alert("profile updated susscefully")
  }
  componentDidMount=()=>{
      this.getUserDetailes()
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"FirstName"}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                FirstName: text,
              });
            }}
            value={this.state.FirstName}
          ></TextInput>

          <TextInput
            style={styles.formTextInput}
            placeholder={"LastName"}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                LastName: text,
              });
            }}
            value={this.state.LastName}
          ></TextInput>

          <TextInput
            style={styles.formTextInput}
            placeholder={"PhoneNumber"}
            maxLength={10}
            keyboardType={"numeric"}
            onChangeText={(text) => {
              this.setState({
                PhoneNumber: text,
              });
            }}
            value={this.state.PhoneNumber}
          ></TextInput>

          <TextInput
            style={styles.formTextInput}
            placeholder={"Address"}
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                Address: text,
              });
            }}
            value={this.state.Address}
          ></TextInput>

          <TextInput
            style={styles.formTextInput}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                Password: text,
              });
            }}
            value={this.state.Password}
          ></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetailes();
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  formContainer: { flex: 1, width: "100%", alignItems: "center" },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: { fontSize: 25, fontWeight: "bold", color: "#fff" },
});
