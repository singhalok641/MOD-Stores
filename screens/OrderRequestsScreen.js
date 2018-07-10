import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  AsyncStorage,
  Animated, 
  Keyboard, 
  KeyboardAvoidingView,
  TouchableHighlight
} from 'react-native';
import { 
  Container, 
  Header, 
  Item, 
  Input, 
  Text, 
  List, 
  ListItem, 
  Body, 
  Content, 
  Thumbnail, 
  Left, 
  Right,
  Form,
  Item as FormItem,
  Card,
  CardItem,
  Label
} from 'native-base';
import {
  Notifications,
} from 'expo'

import { Button, Icon,  } from 'react-native-elements'
import Modal from 'react-native-modalbox'
import { ProgressDialog } from 'react-native-simple-dialogs'

var screen = Dimensions.get('window');
//import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync'

export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    header:null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected1: "key0",
      notification: {},
      orderRequests: {},
      cart: {},
      order_id: null,
      _id: null
    };
  }
  
  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('token')
    let id = await AsyncStorage.getItem('store_id')
    console.log(id);
    this.setState({
      showProgress: true
    })
    //registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    fetch(`http://192.168.0.105:8082/stores/orders/${id}`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Host': '192.168.0.105:8082'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          orderRequests:responseJson.orderRequests,
          isLoading:false,
          showProgress: false
        }, function() {
          //console.log(this.state.orderRequests)
        });
      })
      .catch((error) => {
        console.error(error);
    });
  }

  fetchOrderRequests = async () => {
    let token = await AsyncStorage.getItem('token')
    let id = await AsyncStorage.getItem('store_id')
    console.log(id);
    this.setState({
      showProgress: true
    })

    fetch(`http://192.168.0.105:8082/stores/orders/${id}`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Host': '192.168.0.105:8082'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        orderRequests:responseJson.orderRequests,
        isLoading:false,
        showProgress: false
      }, function() {
        //console.log(this.state.orderRequests)
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _handleNotification = (notification) => {
    this.fetchOrderRequests()
    this.setState({
      notification: notification,
    })
    console.log("hey")
  }

  onClose = async () => {
    this.setState({
      showProgress: true
    })
    console.log('Modal just closed')
    this.fetchOrderRequests()
  }

  decreaseByOne(productId) {
    this.setState({
      showProgress: true
    })
    fetch(`http://192.168.0.105:8082/stores/orders/reduceByOne/${this.state._id}/${productId}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Host': '192.168.56.1:8082'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          showProgress: false,
          cart: responseJson.order.cart,
          order_id: responseJson.order.order_id,
          _id: responseJson.order._id
        }, function () {
          console.log(responseJson)
          if (responseJson.success === true) {
            console.log('decreased quantity by one')
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  increaseByOne(productId) {
    this.setState({
      showProgress: true
    })
    fetch(`http://192.168.0.105:8082/stores/orders/increaseByOne/${this.state._id}/${productId}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Host': '192.168.56.1:8082'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          showProgress: false,
          cart: responseJson.order.cart,
          order_id: responseJson.order.order_id,
          _id: responseJson.order._id
        }, function () {
          console.log(responseJson)
          if (responseJson.success === true) {
            console.log('increased quantity by one')
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    })
  }

  showOrderDetails(cart, order_id, _id) {
    this.setState({
      cart: cart,
      order_id: order_id,
      _id: _id
    })
    this.refs.request.open()
  }

  render() {
    return (
      <Container>
        <Modal 
          style={ styles.modal } 
          position={"top"} ref={"request"} 
          backButtonClose={true} 
          coverScreen={true} 
          animationDuration={300} 
          backdropPressToClose={false} 
          swipeToClose={false}
          onClosed={this.onClose}
          >
          <Header style={{  backgroundColor:'#fff' }}>
            <View style={ styles.headerViewStyle }>
              <View style={{  flexDirection: 'row', alignItems: 'center'  }}>
                <Icon
                  iconStyle={{ alignSelf:'center', marginLeft:10 }}
                  size={23}
                  name='arrow-back'
                  type='materialicons'
                  color='#555555'
                  onPress={() => this.refs.request.close()}
                /> 
                <View style={styles.HeaderShapeView}>
                  <Text style={{fontSize : 15,color:'#555555',fontWeight : 'bold'}}>ORDER #{this.state.order_id}</Text>
                  <Text style={{fontSize : 14,color:'#90a4ae'}}>Request | {this.state.cart.totalQty} items, ₹{this.state.cart.totalPrice}</Text>
                </View>         
              </View>
            </View>
          </Header>
          <View style={styles.container}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
              <View>
              <Text style={{fontSize:13,color :'#03a9f4'}}>Items requiring prescriptions (1)</Text>
              <List
                dataArray={this.state.cart.items}
                renderRow={(product) =>
                (<ListItem>
                    <View style={styles.view}>
                      <Image resizeMode = 'contain' style={styles.image} source={{ uri: product.item.image_src }} />
                      <View style={ styles.info }>
                        <View style={{ justifyContent: 'flex-start', paddingTop: 3 }}>
                          <Text style={styles.pro_name}>{product.item.name}</Text>
                        </View>
                        <Text note style={styles.descrip}>{product.item.brand}</Text>
                        <View style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingLeft: 5,
                          paddingTop: 5
                        }}>
                          <Text style={{
                            flex: 1,
                            fontSize: 16,
                            color: '#4d4d4d',
                            alignSelf: 'flex-end',
                            paddingBottom: 2 }}>₹ {product.price}</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableHighlight
                              onPress={() => this.decreaseByOne(product.item._id)}
                              underlayColor='#dbdbdb'>
                              <View style={styles.button}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}> - </Text>
                              </View>
                            </TouchableHighlight>
                            <Text style={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#4d4d4d' }}> {product.qty} </Text>
                            <TouchableHighlight
                              onPress={() => this.increaseByOne(product.item._id)}
                              underlayColor='#dbdbdb'>
                              <View style={styles.buttons}>
                                <Text style={{
                                  fontSize: 17,
                                  color: '#03a9f4',
                                  fontWeight: 'bold' }}> + </Text>
                              </View>
                            </TouchableHighlight>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ListItem>)
              } />
            </View>
            {/*<View style={{paddingTop:10}}>
              <Text style={{fontSize:13,color :'#03a9f4'}}>Items not requiring prescriptions (1)</Text>
              <List>
                <ListItem>
                
                  <View style={styles.view}>
                    
                    <View style={ styles.info }>
                      <View style={{ justifyContent:'flex-start',paddingTop: 0 }}>
                        <Text style={styles.pro_name}>Whisper Ultra Nights Wings Sanitary Pads Pack of 2</Text>
                      </View>
                      <Text note style={styles.descrip}>packet of 5 pads</Text>
                    </View>
                    <View style={{justifyContent : 'flex-end'}}>
                      <Text style={{flex:1, fontSize : 15, paddingTop: 0 ,color:'#4d4d4d',alignSelf : 'flex-end'}}>₹ 300</Text>
                      <View style={{flexDirection : 'row',alignItems : 'center'}}>
                        <View style={styles.button}>
                          <Text style={{fontSize : 17,fontWeight : 'bold'}}> - </Text>  
                        </View>
                        <Text style={{fontSize : 15,fontWeight : 'bold',color : '#4d4d4d'}}>  1  </Text>
                        <View style={styles.buttons}>
                          <Text style={{fontSize : 17,color : '#03a9f4',fontWeight : 'bold'}}> + </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                
                </ListItem>

              </List>
            </View>*/}
            <View style={styles.pricing}>
              <View style={{marginLeft:10,marginRight:10,justifyContent : 'space-between'}}>
                <View style={{flexDirection : 'row',justifyContent : 'space-between',alignItems : 'center'}}>
                  <Text style={styles.price_text}>Total Items selected</Text>
                  <Text style={styles.price_text}>{this.state.cart.totalQty}</Text>
                </View>
                <View style={{flexDirection : 'row',justifyContent : 'space-between',alignItems : 'center'}}>
                  <Text style={styles.price_text}>Item Total</Text>
                  <Text style={styles.price_text}>₹ {this.state.cart.totalPrice}</Text>
                </View>
                <View style={{flexDirection : 'row',justifyContent : 'space-between',alignItems : 'center'}}>
                  <Text style={styles.price_text}>Discount Applied</Text>
                  <Text style={styles.price_text}>NA</Text>
                </View>
              </View>
              <View
                style={{
                paddingTop:6,
                borderBottomColor: '#cccccc',
                borderBottomWidth: 1,
                }}
              />
              <View style={{marginLeft:10,marginRight:10}}>
                <View style={{flexDirection : 'row',justifyContent : 'space-between',alignItems : 'center'}}>
                  <Text style={styles.price_text}></Text>
                  <Text style={styles.total}>To Pay: ₹ {this.state.cart.totalPrice}</Text>
                </View>
              </View>
            </View> 
            </ScrollView> 
          </View>
          <View style={{alignItems : 'flex-start' , flexDirection : 'row',justifyContent : 'space-around'}}>
              <Button 
                large
                containerViewStyle={{ width: '50%' }}
                buttonStyle={{ alignItems:'center', justifyContent:'center' }}
                backgroundColor={'#03a9f4'} 
                title={`ACCEPT`}
                fontWeight={'bold'}
                fontSize = {17}
              />
              <Button
                large
                containerViewStyle={{ width: '50%' }}
                buttonStyle={{ alignItems:'center', justifyContent:'center' }}
                backgroundColor={'#ffffff'} 
                textStyle={{color: '#03a9f4'}}
                title={`DECLINE`}
                fontWeight={'bold'}
                fontSize = {17}
              />
          </View>
        </Modal>

        <Header style={{  backgroundColor:'#fff' }}>
          <View style={ styles.headerViewStyle }>
            <View style={{ marginTop:0 ,marginLeft:0, marginRight:0 , flexDirection: 'row', alignItems: 'center'  }}>
              <View style = {styles.HeaderShapeView}>
                <Text style = {{paddingTop: 0 ,fontSize:20, color: '#555555', fontWeight: 'bold' }}>Order Requests</Text>
              </View>
            </View>
          </View>
        </Header>
        <View style={styles.container}>
          <ScrollView
              contentContainerStyle={styles.contentContainer} 
              showsVerticalScrollIndicator={false} >
              <List dataArray={this.state.orderRequests}
              renderRow={(order) =>
              <ListItem onPress={() => this.showOrderDetails(order.cart, order.order_id, order._id)}>
                <View style={styles.listView}>
                    <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                      <Text>#{order.order_id}</Text>
                      <Text>₹{order.cart.totalPrice}</Text>
                    </View>

                    <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                      <Text style={{ color: '#2f95dc',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.orderStatus}</Text>
                      <Text note>{order.created_at}</Text>    
                    </View>
                  </View>
                </ListItem>
              }>
            </List>
          </ScrollView>
          <ProgressDialog
            visible={this.state.showProgress}
            message='Loading order requests...'
            activityIndicatorSize='large'
            activityIndicatorColor='#0A9EFC'
          />
        </View>
        {/*<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>*/}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:10,
  },
  button:{
    height:21,
    width:21,
    borderWidth:1,
    borderRadius : 21,
    borderColor : '#555555',
    alignItems : 'center',
    justifyContent : 'center',
    alignContent : 'center'
  },
  listView: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems: 'stretch' 
  },
  buttons:{
    height:21,
    width:21,
    borderWidth:1,
    borderRadius : 21,
    borderColor : '#03a9f4',
    alignItems : 'center',
    justifyContent : 'center',
    alignContent : 'center'
  },
  HeaderShapeView:{
    paddingLeft: 10,
    justifyContent : 'center',
    borderRadius: 1,
  },
  image:{
    width: 75, 
    height: 75 
  },
  headerViewStyle:{
    flex:1, 
    flexDirection: 'row',
  },
  view: {
    flexDirection:'row',
    justifyContent : 'space-between'
  },
  view1: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems: 'stretch' 
  },
  modal: {
    justifyContent: 'flex-start',
  },
  pro_name:{
    fontSize :13,
    paddingLeft:7
  },
  descrip:{
    fontSize :12,
    paddingTop:3,
    alignSelf : 'stretch',
    paddingLeft:7
  },
  info:{
    flex:1,
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'flex-start',
  },
  pricing:{
    paddingTop: 20
  },
   price_text:{
    fontSize:13,
    color:'#555555',
    paddingTop:4,
    paddingBottom:4
  },
  total:{
    fontSize:16,
    color:'#4d4d4d',
    fontWeight : 'bold',
    paddingTop:8,
    marginBottom:13,

  },
});
