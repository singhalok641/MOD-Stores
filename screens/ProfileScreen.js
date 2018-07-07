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
  Item as FormItem } from 'native-base';
import Display from 'react-native-display';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';

const image=require('../assets/images/icon.png');

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      store: {}
    };
  }

  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('token');
    fetch(`http://192.168.0.103:8082/stores/profile`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Host': 'http://192.168.0.103:8082'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        auth: responseJson
      }, function() {
          if(this.state.auth.success === true){
            this.setState({
              store: this.state.auth.store      
            })
          }
          else{
            console.log("Error");
            //alert('Wrong storeID/password');
          }
      });
    })
  }  
 
  render() {
    return (
      <Container>

        <Modal style={ styles.modal } position={"top"} ref={"profile"} backButtonClose={true} coverScreen={true} animationDuration={300} backdropPressToClose={false} swipeToClose={false}>
          <Header style={{  backgroundColor:'#fff' }}>
            <View style={ styles.headerViewStyle }>
              <View style={{  flexDirection: 'row', alignItems: 'center'  }}>
                <Icon
                  iconStyle={{ alignSelf:'center', marginLeft:10 }}
                  size={23}
                  name='arrow-back'
                  type='materialicons'
                  color='#555555'
                  onPress={() => this.refs.profile.close()}
                />
                <Text style = {{fontSize:17, fontWeight : 'bold',color: '#555555',paddingLeft:7 }}>MY PROFILE</Text>
              </View>
            </View>
          </Header>
          <View style={styles.container1}>
            <ScrollView
              style={styles.container1}
              contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
              <Text style = {{fontSize:18, color: '#666666',paddingBottom:3 }}>M O D - STORE:</Text>
              <Text style = {{fontSize:20,color: '#03a9f4',paddingBottom:17, }}>Delhi Pharmacy (0001)</Text>
              <Text style = {{fontSize:18, color: '#666666',paddingBottom:3 }}>NAME:</Text>
              <Text style = {{fontSize:20,color: '#03a9f4',paddingBottom:17 }}>Ravi Dutt</Text>
              <Text style = {{fontSize:18, color: '#666666',paddingBottom:3 }}>PHONE NUMBER:</Text>
              <Text style = {{fontSize:20,color: '#03a9f4',paddingBottom:17, }}>9212071108</Text>
              <Text style = {{fontSize:18, color: '#666666',paddingBottom:3 }}>EMAIL:</Text>
              <Text style = {{fontSize:20,color: '#03a9f4',paddingBottom:17, }}>ravi_dutt@gmail.com</Text>
              <Text style = {{fontSize:18, color: '#666666',paddingBottom:3 }}>LOCATION:</Text>
              <Text style = {{fontSize:20,color: '#03a9f4',paddingBottom:17,}}>Indirapuram</Text>
              <Text style = {{fontSize:18, color: '#666666',paddingBottom:3 }}>ADDRESS:</Text>
              <Text style = {{fontSize:20,color: '#03a9f4',paddingBottom:17, }}>G-52, HIG Colony, Indirapuram</Text>
            </ScrollView>
          </View>
        </Modal>

        <Modal style={ styles.modal } position={"top"} ref={"earnings"} backButtonClose={true} coverScreen={true} animationDuration={300} backdropPressToClose={false} swipeToClose={false}>
          <Header style={{  backgroundColor:'#fff' }}>
            <View style={ styles.headerViewStyle }>
              <View style={{  flexDirection: 'row', alignItems: 'center'  }}>
                <Icon
                  iconStyle={{ alignSelf:'center', marginLeft:10 }}
                  size={23}
                  name='arrow-back'
                  type='materialicons'
                  color='#555555'
                  onPress={() => this.refs.earnings.close()}
                />
                <Text style = {{fontSize:17, fontWeight : 'bold',color: '#555555',paddingLeft:7 }}>EARNINGS</Text>
              </View>
            </View>
          </Header>
          <View style={styles.container}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
              <Text style = {{fontSize:15,color: '#666666',paddingBottom:3, alignSelf : 'center' }}>Total sales till date</Text>
              <Text style = {{fontSize:13,color: '#555555',paddingBottom:20, alignSelf : 'center' }}>15 Feb 2017 - 15 Mar 2017</Text>
              <Text style = {{fontSize:45, fontWeight : 'bold',color: '#03a9f4',paddingBottom:3,alignSelf : 'center' }}>₹ 1,10,506</Text>
            </ScrollView>
          </View>
        </Modal>

        <Modal style={ styles.modal } position={"top"} ref={"help"} backButtonClose={true} coverScreen={true} animationDuration={300} backdropPressToClose={false} swipeToClose={false}>
          <Header style={{  backgroundColor:'#fff' }}>
            <View style={ styles.headerViewStyle }>
              <View style={{  flexDirection: 'row', alignItems: 'center'  }}>
                <Icon
                  iconStyle={{ alignSelf:'center', marginLeft:10 }}
                  size={23}
                  name='arrow-back'
                  type='materialicons'
                  color='#555555'
                  onPress={() => this.refs.help.close()}
                />
                <Text style = {{fontSize:17, fontWeight : 'bold',color: '#555555',paddingLeft:7 }}>GET HELP</Text>
              </View>
            </View>
          </Header>

          <View style={styles.container}>
            
            <Text note style = {{fontSize:13 }}>FOLLOW THESE SIMPLE STEPS</Text>

            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.help}>
                <Text style={styles.help_step}>1. You have new order request</Text>
                <Icon
                    name='list'
                    type='entypo'
                    color='#006b76'
                    size={45}
                    />
              </View>
              <View style={styles.help}>
                <Icon
                    name='emoji-happy'
                    type='entypo'
                    color='#ff9800'
                    size={45}
                    />
                <Text style={styles.help_step}>2. Open and select the items available at the store and press ACCEPT</Text>
                
              </View>
              <View style={styles.help}>
                <Text style={styles.help_step}>3. If no item is available at the store press DECLINE</Text>
                <Icon
                    name='emoji-sad'
                    type='entypo'
                    color='#db3e00'
                    size={45}
                    />
              </View>
              <View style={styles.help}>
                <Icon
                    name='credit-card'
                    type='entypo'
                    color='#1976d2'
                    size={45}
                    />
                <Text style={styles.help_step}>4. After confirming, wait for the user to do the payment and confirm the order</Text>
                
              </View>
              <View style={styles.help}>
                <Text style={styles.help_step}>5. After the order is confirmed, pack the order and hand it to the delivery boy and press DISPATCHED</Text>
                <Icon
                    name='package-variant'
                    type='material-community'
                    color='#03a9f4'
                    size={45}
                    />
              </View>
            </ScrollView>
          </View>
        </Modal>

        <Header style={{  backgroundColor:'#fff' }}>
          <View style={ styles.headerViewStyle }>
            <View style={{ marginTop:0 ,marginLeft:0, marginRight:0 , flexDirection: 'row', alignItems: 'center'  }}>
              <View style = {styles.HeaderShapeView}>
                <Text style = {{paddingTop: 0 ,fontSize:20, color: '#555555', fontWeight: 'bold' }}>Account</Text>
              </View>
            </View>
          </View>
        </Header>  
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
             <View style={styles.view}>
              <View>
                <Text style={styles.name}>Delhi Pharmacy</Text>
                <Text note style={{fontSize :16}}>Indirapuram</Text>
              </View>
                <Image style={styles.pic} resizeMode="contain" source={image}/>
             </View>

             <List style={{paddingTop :20}}>
              <ListItem style={styles.option} onPress={() => this.refs.profile.open()}>
                <View>
                  <Text style={styles.op_name}>My Profile</Text>
                </View>
                  <Icon
                    name='shop'
                    type='entypo'
                    color='#0693e3'
                    size={28}
                    />
               </ListItem>
               <ListItem style={styles.option} onPress={() => this.refs.earnings.open()}>
                <View>
                  <Text style={styles.op_name}>Earnings</Text>
                </View>
                  <Icon
                    name='monetization-on'
                    type='material'
                    color='#2d8659'
                    size={28}
                    />
               </ListItem>
               <ListItem style={styles.option} onPress={() => this.refs.help.open()}>
                <View>
                  <Text style={styles.op_name}>Get help</Text>
                </View>
                  <Icon
                    name='help-with-circle'
                    type='entypo'
                    color='#2d5d86'
                    size={28}
                    />
               </ListItem>
              
               <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Logout</Text>
                </View>
                  <Icon
                    name='power-settings-new'
                    type='material'
                    color='#f47373'
                    size={28}
                    />
               </ListItem>
             </List>
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
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop:15,

  },
  
  help:{
    flexDirection:'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingBottom: 32
  },
  help_step:{
    paddingLeft:15,
    flex:1,
    fontSize : 18,
    color: '#555555'
  },
  view: {
    paddingLeft:25,
    paddingRight:25,
    flex:1,
    
    flexDirection:'row',
    alignItems : 'center',
    justifyContent : 'space-between'
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
  name:{
    color:'#555555',
    fontSize :24,
    fontWeight : 'bold'
  },
  pic:{
    width: 70,
    height: 70,
    borderRadius :15
  },
  modal: {
    justifyContent: 'flex-start',
  },
  option:{
    flexDirection:'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  op_name:{
    fontSize:18,
    color:'#666666',
  }
});