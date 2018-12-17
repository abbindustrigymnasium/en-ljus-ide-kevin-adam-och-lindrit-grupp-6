import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	Switch,
} from 'react-native';


export default class Component7 extends React.Component {

constructor(props) {
    
    super(props);

    this.state = {
		switchValue: false,
			fetch:('192.168.0.114:3000/lampa',{
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({

				})
			})
    }

}

InsertDataToServer =() => {

	const {switchValue} = this.state;
		fetch('http//192.168.0.118:1337/lampa',{
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Name: "AdamTest",
				LED: switchValue
			    })
		}).then((response) => response.json()).then(responseJSON => {

			console.log(responseJSON);
			alert(responseJSON.message+'   '+ response.JSON.Product[0])

		}).catch((error)=>{
			console.log(error);
		});
		
}

    render() {

        if (!this.props.visible) {
            return false;
        }
        

        return (

            <View 
                style={styles.component}
            >

                <View style={styles.layouts}>

                	<View style={styles.layout1}>

                		<View style={styles.itemcontainer1}>

                			<View style={styles.itemcontainer1Inner}>

                                <View style={styles.item1}>
										<Switch 
											value={this.state.switchValue}
											onValueChange={(val) => this.InsertDataToServer({ switchValue : val })}
										/>
									</View>

                			</View>

                		</View>

                	</View>
                	
                </View>

            </View>
            
        );

    }

}

const styles = StyleSheet.create({
    
	component: {
	    width: '100%',
	    flexDirection: 'row',
	    paddingLeft: 7.5,
	    paddingRight: 7.5,
	    paddingTop: 7.5,
	    paddingBottom: 7.5,
	},
	
	layouts: {
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	},
	
	layout1: {
	    width: '100%',
	    height: 109.5,
	},
	
	itemcontainer1: {
	    width: '100%',
	    height: '100%',
	    paddingTop: 7.5,
	    paddingBottom: 7.5,
	    paddingLeft: 7.5,
	    paddingRight: 7.5,
	},
	
	itemcontainer1Inner: {
	    width: '100%',
	    height: '100%',
	    position: 'relative',
	    alignItems: 'center',
	    justifyContent: 'center',
	},
	
	item1: {
	    width: '100%',
	    height: '100%',
	    alignItems: 'center',
	    justifyContent: 'center',
	    overflow: 'hidden',
	    borderStyle: 'solid',
	    borderWidth: 0,
	    backgroundColor: 'rgba(239,239,239,1)',
	},
	
});