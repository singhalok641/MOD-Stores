import React from 'react';
import { Text } from 'react-native';
import { Picker, Item as FormItem } from 'native-base';

export class PickerInButton extends React.Component {
  render() {
    return (
    	<View style={{ flex:3,flexDirection: 'row' ,alignItems: 'center', justifyContent:'center', paddingRight:8}}>
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
    );
  }
}