import React from 'react';
import { 
  View,
  StyleSheet,
} from 'react-native';
import { 
  Container, 
  Header, 
  Content, 
  List, 
  ListItem, 
  Thumbnail, 
  Text,
  Body, 
  Left, 
  Right, 
  Badge, 
  Picker, 
  Form, 
  Icon,
  Item as FormItem, } from 'native-base';
import { Notifications,} from 'expo';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class OrderRequestsScreen extends React.Component {
  static navigationOptions = {
    title: 'Order Requests',
  };

  state = {
    notification: {},
  };

  componentWillMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };


  render() {
    console.log(JSON.stringify(this.state.notification.data));

    return (
      <Container style={styles.container}>
        <Content>
        {/*<Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data.data.status)}</Text>*/}
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Text note style={{fontSize: 20}}> No order requests yet ! </Text>
          </View>

        </Content>
      </Container>
    )
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
   pickerStyle: {
    width:160, 
    height:20, 
    justifyContent:'flex-end', 
    alignItems:'center', 
    color:'#000',
  },
  view: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems: 'stretch' 
  },
  innerviewleft: {
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems:'flex-start'
  },
  innerviewright: {
    flexDirection:'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end', 
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
