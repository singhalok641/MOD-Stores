import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'
import { 
  Container, 
  Header, 
  Input, 
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
  Item as FormItem,
  Card,
  CardItem,
  Label,
  Button } from 'native-base'
import Display from 'react-native-display'
import Modal from 'react-native-modalbox'
import { Icon  } from 'react-native-elements'
import { ProgressDialog } from 'react-native-simple-dialogs'
import PickerInButton from '../components/PickerInButton'

const Item = Picker.Item;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      past_orders: {},
      active_orders: {},
      cart: {},
      order_id: null,
      _id: null,
      selected1: "key0",
      enable1: true,
      enable2: true,
    }
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('store_id');
    console.log(id);
    
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
          past_orders:responseJson.pastOrders,
          active_orders:responseJson.activeOrders,
          isLoading:false,
        }, function() {
          //console.log(this.state.past_orders);
          //console.log(this.state.active_orders);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    })
    {
      value == 'key0' ? (this.state.enable1 = true , this.state.enable2 = true) : (value == 'key1' ? (this.state.enable2 = false , this.state.enable1 = true) : (this.state.enable2 = true , this.state.enable1 = false)) 
    }
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
    if (this.state.isLoading) {
      return (
        <Container>
        <Header style={{  backgroundColor:'#fff' }}>
          <View style={ styles.headerViewStyle }>
            <View style={{ marginTop:0 ,marginLeft:0, marginRight:0 , flexDirection: 'row', alignItems: 'center'  }}>
              <View style = {styles.HeaderShapeView}>
                <Text style = {{paddingTop: 0 ,fontSize:20, color: '#555555', fontWeight: 'bold' }}>Orders</Text>
              </View>
            </View>
          </View>
        </Header>
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
        </Container>
      );
    }   

    const { navigate } = this.props.navigation;
    
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
                  <Text style={{fontSize : 15, color:'#555555',fontWeight : 'bold'}}>ORDER #{this.state.order_id}</Text>
                  <Text 
                    style={{fontSize : 14, color:'#90a4ae'}}>
                    Request | { this.state.cart.totalQty } items, ₹{ this.state.cart.totalPrice }
                  </Text>
                </View>         
              </View>
            </View>
          </Header>
          <View style={styles.container}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
              <View>
              {/*<Text style={{fontSize:13,color :'#03a9f4'}}>Items requiring prescriptions (1)</Text>*/}
              <List
                dataArray={this.state.cart.items}
                renderRow={(product) =>
                (<ListItem>
                    <View style={styles.modalView}>
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
        </Modal>
        
        <Header style={{  backgroundColor: '#fff' }}>
          <View style={ styles.headerViewStyle }>
            <View style={{ marginTop: 0 ,marginLeft: 0, marginRight: 0 , flexDirection: 'row', alignItems: 'center'  }}>
              <View style = {styles.HeaderShapeView}>
                <Text style = {{paddingTop: 0 ,fontSize:20, color: '#555555', fontWeight: 'bold' }}>Orders</Text>
              </View>
            </View>
          </View>
        </Header>

        <View style={ styles.container }>
          <View style={{ flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center' ,paddingBottom: 20 }}>
            <Left>
              <Button 
                light 
                block
                style={styles.refreshButtonStyle}>
                <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent:'center', paddingRight:5 }}>
                  <Picker
                    style={ styles.pickerStyle }
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange.bind(this)}>
                    <Item label="All Orders" value="key0" />
                    <Item label="Active Orders" value="key1" />
                    <Item label="Past Orders" value="key2" />
                  </Picker>
                </View>
              </Button>
            </Left>
            <Right>
              <Button
                onPress={this.componentDidMount} 
                iconLeft 
                block 
                light 
                style={styles.refreshButtonStyle}>
                <Icon color='#555555' name='refresh' />
                <Text color='#555555'> Refresh </Text>
              </Button>
            </Right>
          </View>
          
          <ScrollView 
            contentContainerStyle={styles.contentContainer} 
            showsVerticalScrollIndicator={false}>
            <Display enable={this.state.enable1}>
              <Text style={{ fontWeight: 'bold', paddingBottom: 10, paddingTop: 10 }}>Active Orders ({this.state.active_orders.length})</Text>
              <List dataArray={this.state.active_orders}
                renderRow={(order) =>
                <ListItem onPress={() => this.showOrderDetails(order.cart, order.order_id, order._id)}>
                  <View style={styles.view}>
                      <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                        <Text>#{order.order_id}</Text>
                        <Text>₹{order.cart.totalPrice}</Text>
                      </View>

                      <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                        {
                          order.status == 'Waiting' ?
                          (<Text style={{ color: '#2f95dc',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.orderStatus}</Text>)
                          :
                          (
                          order.status == 'Confirmed' ?
                            (
                              <Text style={{ color: '#00b200',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.orderStatus}</Text>
                            )
                            :
                            (
                              <Text style={{ color: '#E69500',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.orderStatus}</Text>
                            )
                          )
                        }
                        <Text note>{order.created_at}</Text>    
                      </View>
                    </View>
                  </ListItem>
                }>
              </List>
            </Display>

            <Display enable={this.state.enable2}>
              <Text style={{ fontWeight: 'bold', paddingBottom: 10, paddingBottom: 10 }}>Past Orders ({this.state.past_orders.length})</Text>
              <List dataArray={this.state.past_orders}
                renderRow={(order) =>
                <ListItem onPress={() => this.showOrderDetails(order.cart, order.order_id, order._id)}>
                  <View style={styles.view}>
                      <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                        <Text>#{order.order_id}</Text>
                        <Text>₹{order.cart.totalPrice}</Text>
                      </View>

                      <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                        {
                          order.status == 'Delivered' ?
                          (<Text style={{ color: '#2f95dc',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.orderStatus}</Text>)
                          :
                          (<Text style={{ color: '#ff1919',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.orderStatus}</Text>)
                        }
                        <Text note>{order.created_at}</Text>    
                      </View>
                    </View>
                  </ListItem>
                }>
              </List>
            </Display>
          </ScrollView>
          <ProgressDialog
            visible={this.state.showProgress}
            message='Loading orders...'
            activityIndicatorSize='large'
            activityIndicatorColor='#0A9EFC'
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop:15,
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
  headerViewStyle:{
    flex:1, 
    flexDirection: 'row',
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
    width:80, 
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
  modalView: {
    flexDirection:'row',
    justifyContent : 'space-between'
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
    width:150,
    borderRadius: 10
  },
  refreshIconStyle: {
    fontSize: 20,
    height: 20,
    color: 'black',
  },
});