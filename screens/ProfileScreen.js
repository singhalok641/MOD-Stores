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
  Item as FormItem } from 'native-base';
import Display from 'react-native-display';

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
        <View style={styles.container}>
          <ScrollView>
             <View style={styles.view}>
              <View>
                <Text style={styles.name}>Delhi Pharmacy</Text>
                <Text note style={{fontSize :15}}>Indirapuram</Text>
              </View>
              
                <Image style={styles.pic} resizeMode="contain" source={image}/>
              
             </View>

             <List style={{paddingTop :20}}>
              <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>My Profile</Text>
                </View>
                  <Icon
                    name='ios-contact'
                    type='Iconicons'
                    color='#666666'
                    size={28}
                    />
               </ListItem>
               <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Earnings</Text>
                </View>
                  <Icon
                    name='ios-flash'
                    type='Iconicons'
                    color='#666666'
                    size={28}
                    />
               </ListItem>
               <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Get help</Text>
                </View>
                  <Icon
                    name='ios-help-circle'
                    type='Iconicons'
                    color='#666666'
                    size={28}
                    />
               </ListItem>
              
               <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Logout</Text>
                </View>
                  <Icon
                    name='ios-power'
                    type='Iconicons'
                    color='#666666'
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
    paddingTop:10,

  },
  view: {
    paddingLeft:20,
    paddingRight:20,
    flex:1,
    paddingTop:45,
    flexDirection:'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  name:{
    color:'#555555',
    fontSize :24,
    fontWeight : 'bold'
  },
  pic:{

    width: 80,
    height: 80,
    borderRadius :15
  },
  
  option:{
    flexDirection:'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  op_name:{
    fontSize:19,
    color:'#666666',
  }
});