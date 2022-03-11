import React from 'react'
import {Image, ImageBackground,Picker , SafeAreaView, Text, TextInput, useWindowDimensions, View,StyleSheet,Pressable, ScrollView} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';



const Informations = ({route, navigation}) => {
  const userData  = route.params.data
  const coalitionsData = route.params.coalition

  const achievements = () => (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.cardS}>
          {
            userData?.achievements.map((item, i) => {
              return (
                <Card style={styles.cardc} key={i}>
                  <Card.Content>
                    <Title>{item.name}</Title>
                    <Paragraph>{item.description}</Paragraph>
                  </Card.Content>
                </Card>
              )
          })
          }
        </View>
        </ScrollView>
      </SafeAreaView>
  );
  
  const projects = () => (
    <SafeAreaView>
          <View style={styles.cardS}>
            {
              userData?.projects_users.map((item, i) => {
                return (
                  <Card style={styles.cardc} key={i}>
                    <Card.Content>
                      <Title>{item.project.name}</Title>
                      <Paragraph>{item.status}</Paragraph>
                      <Paragraph style={{color:"green"}}>{item.final_mark ? item.final_mark : null }</Paragraph>
                    </Card.Content>
                  </Card>
                )
            })
            }
          </View>
      </SafeAreaView>
  );
  
  const renderScene = SceneMap({
    first: projects,
    second: achievements,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'projects' },
    { key: 'second', title: 'achievements' },
  ]);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      height: 40,
      width: "80%",
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button1: {
      backgroundColor: "#7CE019",
      width: '80%',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
  },
  container1:{
    flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
  },
  cardS:{
    margin: 30
  },
  cardc:{
    margin: 10
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  });

 

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
              <View>
                  <Pressable
                  style={styles.button1}
                  onPress={()=> console.log("data", userData, "coalitions", coalitionsData)}
                  >
                  </Pressable>
                  <View style={styles.container1}>
                  <Image
                    style={{
                      
                      width: 100,
                      height: 100,
                      resizeMode: 'contain',
                    }}
                    // source={ userData?.image_url }
                    source={{ uri: userData?.image_url }}
                    />
                    <Text>Full Name : {userData?.displayname}</Text>
                    <Text>Login : {userData?.login}</Text>
                    <Text>level : {userData?.cursus_users[0].level}</Text>
                    {/* <Progress.Bar progress={userData.cursus_users[0].level} width={200} /> */}
                  </View>
                  <View>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}   
                      />
                  </View>
                
              </View>
          </ScrollView>
    </SafeAreaView>
  )
}

export default Informations