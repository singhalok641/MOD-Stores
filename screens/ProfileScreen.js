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

const image=require('../assets/images/icon.png');

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected1: "key0"
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }
 
  render() {
    return (
      <Container>
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
          <ScrollView>
             <View style={styles.view}>
              <View>
                <Text style={styles.name}>Delhi Pharmacy</Text>
                <Text note style={{fontSize :16}}>Indirapuram</Text>
              </View>
              
                <Image style={styles.pic} resizeMode="contain" source={image}/>
              
             </View>

             <List style={{paddingTop :20}}>
              <ListItem style={styles.option}>
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
               <ListItem style={styles.option}>
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
               <ListItem style={styles.option}>
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:20,

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