import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { ListItem, Card, Header, Icon } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../Components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SlideFromRightIOS } from "react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionPresets";
export default class RecieverDetailes extends React.Component {
  constructor() {
    super();
    this.state = {
      UserId: firebase.auth().currentUser.email,
      RecieverId: this.props.navigation.getParam("details")["userId"],
      bookname: this.props.navigation.getParam("details")["bookname"],
      requestId: this.props.navigation.getParam("details")["requestId"],
      reasonToRequest: this.props.navigation.getParam("details")[
        "reasonToRequest"
      ],
      recieverName: "",
      recieverConatct: "",
      reciverAddress: "",
      reciverRequestDocId: "",
    };
  }
  getRecieverDetails = async () => {
    db.collection("users")
      .where("emailId", "==", this.state.UserId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverName: doc.data().First_Name,
            recieverConatct: doc.data().PhoneNumber,
            recieverAddress: doc.data().Address,
          });
        });
      });
    db.collection("requestedBooks")
      .where("requestId", "==", this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            reciverRequestDocId: doc.id,
          });
        });
      });
  };
  render() {
    return (
      <View>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: "recieverDetails",
              style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
            }}
            backgroundColor="#eaf8fe"
            leftComponent={
              <Icon
                name="arrow-left
              "
                type="feather"
                color="black"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            }
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title="bookInformation" titleStyle={{ fontSize: 30 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name:{this.state.bookname}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Reason:{this.state.reasonToRequest}
              </Text>
            </Card>
          </Card>
        </View>

        <View style={{ flex: 0.3 }}>
          <Card title="recieverInformation" titleStyle={{ fontSize: 30 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name:{this.state.recieverName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                contact:{this.state.recieverConatct}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
               Address:{this.state.recieverAddress}
              </Text>
            </Card>
          </Card>
        </View>
        <View>
            {
                this.state.RecieverId!=this.state.userId?(
                    <TouchableOpacity>
                        <Text>I want to Donate</Text>
                    </TouchableOpacity>

                )
                :(
                    null
                )
            }
        </View>
      </View>
    );
  }
}
