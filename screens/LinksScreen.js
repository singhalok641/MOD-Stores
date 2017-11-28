import React from 'react';
import { 
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppRegistry, 
} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Body } from 'native-base';
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

const data = [
  {day: 'Mon', earnings: 1300},
  {day: 'Tue', earnings: 1650},
  {day: 'Wed', earnings: 1425},
  {day: 'Thu', earnings: 1200},
  {day: 'Fri', earnings: 800},
  {day: 'Sat', earnings: 1600},
  {day: 'Sun', earnings: 1900},
];

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Overview',
  };

  render() {
    return (
      <Container style={styles.container}>
      <Content>
        <Text style={styles.headtext}>Summary</Text>
      </Content>
     </Container>
    )
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingBottom: 0
  },
  boldtext:{
    fontWeight:'bold',
    fontSize: 20,
  },
  innerview: {
    flexDirection:'column',
    alignItems: 'center',
  },
  normaltext:{
    fontSize: 16,
  },
  headtext:{
    padding: 12,
    paddingBottom: 0,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db' 
  },
  headview:{
    height: 48,
    backgroundColor: '#3498db'
  },
  graphview:{
    paddingTop:0,
    padding: 12
  },
  bodytext:{
    padding: 12,
    paddingTop:8,
    fontSize: 18
  }
});
