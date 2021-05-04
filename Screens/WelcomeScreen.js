import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      First_Name: "",
      Last_Name: "",
      PhoneNumber: "",
      Address: "",
      ConfirmPassword: "",
      IsModalVisible: false,
    };
  }

  userlogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        //return Alert.alert("succesfully Loged in");
        this.props.navigation.navigate("DonateBook")
      })
      .catch((error) => {
        var errorcode = error.code;
        var errormessage = error.message;
        return Alert.alert(errormessage);
      });
  };

  usersignup = (emailId, password, ConfirmPassword) => {
    if (password != ConfirmPassword) {
      return Alert.alert("PassWord Does Not Match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection("users").add({
            Address: this.state.Address,
            First_Name: this.state.First_Name,
            Last_Name: this.state.Last_Name,
            PhoneNumber: this.state.PhoneNumber,
            password: this.state.password,
            emailId: this.state.emailId,
          });
          return Alert.alert("User Added Successfully");
        });
      this.setState({
        IsModalVisible: false,
      });
    }
  };
  showModal = () => {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.state.IsModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.inputBox}
                placeholder={"First Name"}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    First_Name: text,
                  });
                }}
              ></TextInput>

              <TextInput
                style={styles.inputBox}
                placeholder={"Last Name"}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    Last_Name: text,
                  });
                }}
              ></TextInput>

              <TextInput
                style={styles.inputBox}
                placeholder={"Phone Number"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    PhoneNumber: text,
                  });
                }}
              ></TextInput>
              <TextInput
                style={styles.inputBox}
                placeholder={"Address"}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    Address: text,
                  });
                }}
              ></TextInput>
              <TextInput
                style={styles.inputBox}
                placeholder={"Eamil Id"}
                KeyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              ></TextInput>
              <TextInput
                style={styles.inputBox}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              ></TextInput>
              <TextInput
                style={styles.inputBox}
                placeholder={"ConfirmPassword"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    ConfirmPassword: text,
                  });
                }}
              ></TextInput>
              <View style={styles.modalButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.usersignup(
                      this.state.emailId,
                      this.state.password,
                      this.state.ConfirmPassword
                    );
                  }}
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({
                      IsModalVisible: false,
                    });
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {this.showModal()}
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>BookSanta</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.loginBox}
            placeholder={"abcd@gmail.com"}
            keyboardType={"email-address"}
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
          ></TextInput>

          <TextInput
            style={styles.loginBox}
            placeholder={"EnterPassword"}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          ></TextInput>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => {
              this.userlogin(this.state.emailId, this.state.password);
            }}
          >
            <Text style={styles.buttonText}>LogIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ IsModalVisible: true });
            }}
          >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8BE85",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 30,
    color: "#ff3d00",
    textAlign: "center",
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "#ff8a65",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "200",
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#ff5722",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  inputBox: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: "#ff5722",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  cancelButtonText: {
    color: "#ff5722",
  },
});
