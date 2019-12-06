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
 
  // async functions to call the Java native methods
  async ReaderOpenEx() {
    UFR.ReaderOpenEx();
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
	   <Text style={{fontWeight: 'bold'}}>
       Go to your Bluetooth settings and pair with uFR Online reader (default pin is: 123456) and then click 'CONNECT'
		</Text>
		<Separator />
        <Button
          title="CONNECT"
          onPress={ this.ReaderOpenEx }
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
