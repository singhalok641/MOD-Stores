import React, { Component } from 'react'
import { Container, 
  Header, 
  Content, 
  List, 
  ListItem, 
  Thumbnail, 
  Text, 
  Body, 
  Icon,  
  Item, 
  Input,  } from 'native-base'
import { StyleSheet, 
  Image, 
  View, 
  TabNavigator, 
  ListView, 
  ActivityIndicator, 
  TouchableOpacity, 
  AsyncStorage, 
  ScrollView,
  Keyboard, 
  KeyboardAvoidingView,
  Animated, } from 'react-native'
import { Button } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation'
import { ProgressDialog } from 'react-native-simple-dialogs'
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync'

const IMAGE_HEIGHT_SMALL = 60

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }
 
  constructor(props) {
    super(props);
    this.imageHeight = new Animated.Value(120);
    this.state = {
      isLoading: true,
      store_id: '',
      password: '',
      auth:{}
    }
  }

  componentDidMount = async () => {
    registerForPushNotificationsAsync()
    const resetActionMain = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    });
    try {
      let token = await AsyncStorage.getItem('token');
      console.log(token);
      if(token!== null) { 
        this.props.navigation.dispatch(resetActionMain);
        /*this.setState({
          isLoading: false
        });*/
      }
      else{
        this.setState({
            isLoading: false
          });
      }
    }
    catch (error) {
      alert(error);
    }
  }

  /*componentWillMount () {
    console.log("mounted");
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    console.log('unmounted');
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
    console.log('image reduced');
  };*/

/*  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };*/

  onLoginPress = async () => {
    const resetActionMain = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ]
    });
      this.setState({ showProgress: true })

      fetch('http://192.168.0.105:8082/stores/authenticate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          store_id: this.state.store_id,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          auth: responseJson
        }, function() {
          console.log("auth"+this.state.auth);
          //console.log(this.state.store_id);
          //console.log(this.state.password);
          //console.log(this.state.auth.store.store_id);
          if(this.state.auth.success === true){
            //console.log("done");
            //alert("success");
            AsyncStorage.setItem("token",this.state.auth.token);
            AsyncStorage.setItem("store_id",this.state.auth.store.store_id);
            this.setState({ showProgress: false })
            this.props.navigation.dispatch(resetActionMain);
          }
          else{
            console.log("Wrong credentials");
            alert('Wrong storeID/password');

          }
        });
      }).catch(e => console.log(e));;
  }

  /*focusPasswordInput() {
    this._passwordInput._textInput.focus();
  }*/

  render() {
    
    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator color='#2f95dc' size='large'/>
        </View>
      );
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <ScrollView style={styles.scroll}>
          <Container style={ styles.container }>
                <View style={{ flex:1,flexDirection:'column',alignItems:'center',marginTop:40 }}>
                  <View>
                    <Animated.Image resizeMode="contain" style={styles.imageStyle} source={require('../assets/images/icon2.png')}/>
                    <Text style= {{ fontSize:18, fontWeight:'bold',color:'#0A9EFC',marginBottom:45, alignSelf:'center' }}> STORES </Text>
                    <Item style={{ marginBottom:10, width:300 }} >
                      <Input 
                        placeholder='StoreID' 
                        keyboardType = 'numeric' 
                        returnKeyType="next"
                        //autoFocus={true} 
                        onChangeText={(store_id) => this.setState({store_id})}
                        value={this.state.store_id} />
                    </Item>
                    <Item style={{ marginBottom:10, width:300 }}>
                      <Input 
                        placeholder='Password' 
                        secureTextEntry 
                        //autoFocus={true}
                        returnKeyType="go"
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}/>
                    </Item>
                  </View>
                  
                  <View style={ styles.viewStyle } >
                    <TouchableOpacity style={styles.register} onPress={this.onLoginPress}>
                      <Text style={{color:'#ffffff', fontWeight:'bold' }}>LOGIN</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <ProgressDialog
                    visible={this.state.showProgress}
                    message="Logging in..."
                    activityIndicatorSize="large"
                    activityIndicatorColor="black"
                  />
                </View>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  scroll: {
    backgroundColor: '#fff',
    padding: 30,
    flexDirection: 'column'
  },
  imageStyle: {
    height: 100,
    width: 100,
    alignSelf:'center',

  },
  viewStyle:{
    width: 300,
    height:80,
    marginTop:50,
  },
  loginButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
   // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: window.width - 30,
},
  register:{
    marginBottom:20, 
    width:window.width -100,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor: '#3f3f3f',
    borderRadius:10,
}
});