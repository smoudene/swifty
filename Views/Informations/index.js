import React from 'react'
import {Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View,StyleSheet,Pressable} from "react-native";

const Informations = ({route}) => {
  return (
    <View>
        <Pressable
         onPress={()=> console.log("data",route.params)}
        >

        </Pressable>
    </View>
  )
}

export default Informations