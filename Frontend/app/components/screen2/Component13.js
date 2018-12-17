import React from "react";
import Slider from "react-native-slider";
import { 
   StyleSheet, 
   View, 
   Text, 
} from "react-native";



export default class Component13 extends React.Component {
  constructor(props)
  {
    super(props)
    this.state= {
      value: 0.5,
      Bright: 1,
      Warm: 1024,
      Cold: 1024,
      Warmpr: 1,
      Coldpr: 1
    }
  }

  GetDataFromServer =() => {
    let self= this; 
    fetch('http//192.168.0.118:1337/lampa',{
        method: 'GET'
    }).then((Response) => response.json()).then((responseJSON)=>
    {
      console.log(responseJSON);
          self.setState({
            Bright: responseJSON.Bright
          });
    }).then(this.UpdateDataToServer())
  }
  
  UpdateDataToServer =() => {

    const {value, Bright, Warm, Cold, Warmpr, Coldpr} = this.state;
      fetch('http://192.168.0.118:1337/lampa/',{
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: "AdamTest",
          Warmpr: value,
          Coldpr: (1-value),
          Warm: (1024*Bright*value),
          Cold: (1024*Bright*(1-value))
            })
      }).then((response) => response.json()).then(responseJSON => {
  
        console.log(responseJSON);
  
      }).catch((error)=>{
        console.log(error);
      });
      
  };

  render() {
    return (
      <View style={styles.container}>
        <Slider
          value={this.state.value}
          onValueChange={value => { this.setState({ value }); this.GetDataFromServer();}}
        />
        <Text>
          Value: {this.state.value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});

// AppRegistry.registerComponent("Component13", () => Component13);