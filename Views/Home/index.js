import React from 'react'
import {Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View,StyleSheet,Pressable} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {_id, _secret} from "../../helpers/data.json"
import axios from 'axios';
import Informations from '../Informations';

const Home = ({navigation}) => {

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      height: 40,
      width: "80%",
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: {
      backgroundColor: "#7CE019",
      width: '80%',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
  },
  });

  const [login, onChangeLogin] = React.useState("");

  // https://api.intra.42.fr/oauth/authorize?client_id=2582e5ab9cef84a4205e746b98e7b456fd1b1b68a37c7131e974daae1b3de7ac&redirect_uri=http%3A%2F%2Flocalhost%3A19006%2F&response_type=code
//   const askLogin = async () => {
//     try {
//         const Login = await axios.get("https://api.intra.42.fr/oauth/authorize?client_id=2582e5ab9cef84a4205e746b98e7b456fd1b1b68a37c7131e974daae1b3de7ac&redirect_uri=http%3A%2F%2Flocalhost%3A19006%2F&response_type=code", {
//             grant_type: "authorization_code",
//         });

//         if (Login.data) {
//             return Login.data;
//         }
//     } catch (error) {
//         return null;
//     }
// };

  const getAccessToken = async () => {
      try {
          const token = await axios.post("https://api.intra.42.fr/oauth/token/", {
              client_id: _id,
              client_secret: _secret,
              grant_type: "client_credentials",
          });

          if (token.data) {
              console.log(token.data)
              return token.data;
          }
      } catch (error) {
          return null;
      }
  };
  // console.log("hna",token)
 const getInfos = async (login, token) => {
  try {
    var response = await axios.get(
        "https://api.intra.42.fr/v2/users/" + (login.trim()).toLowerCase(),
        {
            headers: {
                Authorization: "Bearer " + token.access_token,
            },
        }
    );
    if (response.data) {
      console.log("datadata",response.data)
        var coalition = await axios.get(
            "https://api.intra.42.fr/v2/users/"+response.data.id+"/coalitions",
            {
                headers: {
                    Authorization: "Bearer " + token.access_token,
                },
            }
        )
        if (coalition.data) {
            navigation.navigate("Informations", { data: response.data, coalition: coalition.data });
        }
    }
    } catch (error) {
    console.log(error.message);
    alert("login doesnt exist");
    }
}; 


const fetchLogin = async (login) => {
  login.trim();
  if (login && login !== "") {
      try {
          var token = await AsyncStorage.getItem("access_token");
          if (token) {
              token = JSON.parse(token);
              if ((token.created_at + token.expires_in) <= (Date.now() / 1000)) {
                  console.log("token expired");
                  token = await getAccessToken();
                  if (token)
                      await AsyncStorage.setItem("access_token", JSON.stringify(token));
              }
          }
          else {
              token = await getAccessToken();
              if (token)
                  await AsyncStorage.setItem("access_token", JSON.stringify(token));
          }
          await getInfos(login, token);
      }
      catch (error) {
          console.log(error);
          alert(error);
      }

  }
  else
      alert("you should set a login first");
}
// const checkToken = async (token) => {
//   try {
//     const response = await axios.get("https://api.intra.42.fr/oauth/token/info", 
//     {
//       headers: {
//         Authorization: "Bearer " + token,
//     },
//     });
//     if (response.data) {
//         return response.data;
//     }
// } catch (error) {
//     return null;
// }

// }
// const fetchLogin = async (login) => {
//   login.trim();
//   if (login && login !== "") {
//       try {
//           var token = await AsyncStorage.getItem("access_token");
//           if (token) {
//               token = JSON.parse(token);
//               if (checkToken(token) === null) {
//                   console.log("token expired");
//                   token = await getAccessToken();
//                   if (token)
//                       await AsyncStorage.setItem("access_token", JSON.stringify(token));
//               }
//           }
//           else {
//               token = await getAccessToken();
//               if (token)
//                   await AsyncStorage.setItem("access_token", JSON.stringify(token));
//           }
//           await getInfos(login, token);
//       }
//       catch (error) {
//           console.log(error);
//           alert(error);
//       }

//   }
//   else
//       alert("you should set a login first");
// }


  return (
    <View style={styles.container} >
        <TextInput
          style={styles.input} 
          onChangeText={onChangeLogin}
          value={login}
          placeholder="Login"
          />
          <Pressable
             style={styles.button}
             onPress={ () => fetchLogin(login) }
          >
           <Text style={styles.text}>Search</Text>
          </Pressable>
    </View>
  )
}

export default Home