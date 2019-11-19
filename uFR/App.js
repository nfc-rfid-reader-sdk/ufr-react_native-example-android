import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  TextInput
} from 'react-native';

function Separator() {
  return <View style={styles.separator} />;
}
 
// We are importing the native Java module here
import {NativeModules} from 'react-native';
var UFR = NativeModules.UFR;

type Props = {};
export default class App extends Component<Props> {
	
  constructor(props){
    super(props)

    this.state = {
      address: ''
    }
  }
 
  // async functions to call the Java native methods
  async ReaderOpenEx(address) {
    UFR.ReaderOpenEx(address);
  }
  
  _handlePress() {
	 UFR.ReaderOpenEx(this.state.address);
  }
  
  async ReaderUISignal() {
    UFR.ReaderUISignal(1, 1);
  }
  
  async GetCardIdEx() {
    UFR.GetCardIdEx( (err) => {console.log(err)}, (msg) => {alert(msg)} );
  }
 
  render() {
    return (
	<SafeAreaView style={styles.container}>
      <View>
		<TextInput
          style={styles.textInputStyle}
          placeholder="Enter MAC address"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({address:text})}
		/>
        <Button
          title="READER OPEN"
          onPress={() => this._handlePress()}
        />
      </View>
      <Separator />
      <View>
        <Button
          title="BEEP"
          onPress={ this.ReaderUISignal }
        />
      </View>
	  <Separator />
	  <Separator />
	  <Separator />
	  <View>
        <Button
          title="GET UID"
          onPress={ this.GetCardIdEx }
        />
      </View>
	  </SafeAreaView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
