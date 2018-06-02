import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  AsyncStorage,
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
  Button,
  Icon,
  Item as FormItem, } from 'native-base';
import Display from 'react-native-display';

const Item = Picker.Item;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      past_orders:[],
      active_orders:[],
      selected1: "key0",
      enable1: true,
      enable2: true,
    }
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('store_id');
    console.log(id);
    
    fetch(`http://159.89.168.254:8082/stores/orders/${id}`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Host': '159.89.168.254:8082'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          past_orders:responseJson.past_orders,
          active_orders:responseJson.active_orders,
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
    });
    {
      value == 'key0' ? (this.state.enable1 = true , this.state.enable2 = true) : (value == 'key1' ? (this.state.enable2 = false , this.state.enable1 = true) : (this.state.enable2 = true , this.state.enable1 = false)) 
    }
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
          <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center' ,paddingBottom:20}}>
            <Left>
              <Button 
                light 
                block
                style={styles.refreshButtonStyle}>
                <View style={{ flex:2,flexDirection: 'row' ,alignItems: 'center', justifyContent:'center',paddingLeft:12}}>
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
          <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <Display enable={this.state.enable1}>
            <Text style={{ fontWeight:'bold', paddingBottom:20}}>Active Orders ({this.state.active_orders.length})</Text>
            <List dataArray={this.state.active_orders}
              renderRow={(order) =>
              <ListItem>
                <View style={styles.view}>
                    <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                      <Text>#{order.order_id}</Text>
                      <Text>₹{order.total}</Text>
                    </View>

                    <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                      {
                        order.status == 'Waiting' ?
                        (<Text style={{ color: '#2f95dc',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.status}</Text>)
                        :
                        (
                        order.status == 'Confirmed' ?
                          (
                            <Text style={{ color: '#00b200',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.status}</Text>
                          )
                          :
                          (
                            <Text style={{ color: '#E69500',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.status}</Text>
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
            <Text style={{ fontWeight:'bold'}}>Past Orders ({this.state.past_orders.length})</Text>
             <List dataArray={this.state.past_orders}
              renderRow={(order) =>
              <ListItem>
                <View style={styles.view}>
                    <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                      <Text>#{order.order_id}</Text>
                      <Text>₹{order.total}</Text>
                    </View>

                    <View style={{ flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-start' }}>
                      {
                        order.status == 'Delivered' ?
                        (<Text style={{ color: '#2f95dc',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.status}</Text>)
                        :
                        (<Text style={{ color: '#ff1919',textAlign: 'center', fontSize:15, fontWeight:'bold' }}>{order.status}</Text>)
                      }
                      <Text note>{order.created_at}</Text>    
                    </View>
                  </View>
                </ListItem>
              }>
            </List>
            </Display>
            </ScrollView>
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
  headerViewStyle:{
    flex:1, 
    flexDirection: 'row',
  },
  HeaderShapeView:{
    paddingLeft: 10,
    justifyContent : 'center',
    borderRadius: 1,
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
    borderRadius:5,
    width:160,
  },
  refreshIconStyle: {
    fontSize: 20,
    height: 20,
    color: 'black',
  },
});