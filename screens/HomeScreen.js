import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { 
  Container, 
  Header, 
  Content, 
  List, 
  ListItem, 
  Thumbnail, 
  Body, 
  Left, 
  Right, 
  Badge, 
  Picker, 
  Form, 
  Button,
  Icon,
  Item as FormItem } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title:'Past Orders',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      orders:{},
    }
  }

  render() {

   /* if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }*/

    const { navigate } = this.props.navigation;
    var orders =   [{"id":"UB00201BC22","amount":"50","status":"Delivered","date":"21 Sep 2017","time":"14:24"},
                    {"id":"UB00201BC30","amount":"100","status":"Cancelled","date":"21 Sep 2017","time":"14:24"},
                    {"id":"UB00201BC36","amount":"320","status":"Delivered","date":"21 Sep 2017","time":"14:24"}];
    return (
      <Container style={styles.container}>
        <Content>
          <View style={{flexDirection:'row',justifyContent: 'space-around',}}>
            <Left>
              <Button light block style={styles.refreshButtonStyle}>
                <Text> All Orders </Text>
              </Button>
            </Left>
            <Right>
              <Button iconLeft block light style={styles.refreshButtonStyle}>
                <Icon name='refresh' />
                <Text> Refresh </Text>
              </Button>
            </Right>

          </View>
          <List dataArray={orders}
            renderRow={(order) =>
              <ListItem>
              <View style={styles.view}>
                  <View style={styles.innerviewleft}>
                    <Text style={styles.boldtext}>{order.id}</Text>
                    <Text>{order.time}</Text>
                  </View>

                  <View style={styles.innerviewright}>
                    <Text style={styles.boldtext}>₹{order.amount}</Text>
                    {
                          order.status == 'Delivered' ? (
                            <Badge style={{ backgroundColor: '#388e3c',width:80,justifyContent: 'center'}}>
                              <Text style={{ color: 'white',textAlign: 'center'}}>{order.status}</Text>
                            </Badge>
                          )
                          :
                          (
                            <Badge style={{ backgroundColor: '#f39c12',width:80,justifyContent: 'center'}}>
                              <Text style={{ color: 'white',textAlign: 'center'}}>{order.status}</Text>
                            </Badge>
                          )
                    }
                  </View>
                </View>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    paddingLeft:10,
  },
  boldcolortext:{
    fontWeight:'bold',
    color: '#3498db'
  },
  boldtext:{
    fontWeight:'bold',
  },
  lefttext:{
    fontWeight:'bold',
    fontSize: 30,
    color: '#2980b9'
  },
  view: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'stretch' 
  },
  innerviewleft: {
    flexDirection:'column',
    justifyContent: 'space-around',
  },
  innerviewright: {
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems: 'center', 
  },
  boldtext:{
    fontWeight:'bold',
  },
  refreshButtonStyle:{
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius:10,
  },
  refreshIconStyle: {
    fontSize: 20,
    height: 22,
    color: 'black',
  },
});
