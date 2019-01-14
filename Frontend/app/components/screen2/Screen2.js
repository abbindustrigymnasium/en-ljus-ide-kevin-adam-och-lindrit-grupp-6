import React from 'react';
import { 
    StyleSheet,
    View,
} from 'react-native';
// Här importar jag alla element som behövs för att screenen ska fungera

import Component26 from './Component26';
import Component13 from './Component13';
import Component25 from './Component25';
// Här importerarna jag alla komponenter från den här mappen som ska visas på den här screenen
export default class Screen2 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            Component26Visible: true,
            Component13Visible: true,
            Component25Visible: true,
            // Här sätter det states för alla komponents så att de kan visas
        }

    }

    toggleComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';
        let val  = this.state[prop];
        if (typeof val === 'undefined') {
            return false;
        }

        this.setState({
            [prop]: val === true ? false : true
        })

        return true;

    }

    hideComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';

        this.setState({
            [prop]: false
        })

        return true;

    }

    showComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';

        this.setState({
            [prop]: true
        })

        return true;

    }

    render() {
        return (

            
            <View style={styles.container}>

                    <View style={styles.screencontainer}>

                        <View style={styles.screencontainerInner}>
                            <Component26 
                                navigation={this.props.navigation}
                                toggleComponent={ (component) => this.toggleComponent(component) }
                                hideComponent={ (component) => this.hideComponent(component) }
                                showComponent={ (component) => this.showComponent(component) }
                                visible={ this.state.Component26Visible }
                            />
                            <Component13 
                                navigation={this.props.navigation}
                                toggleComponent={ (component) => this.toggleComponent(component) }
                                hideComponent={ (component) => this.hideComponent(component) }
                                showComponent={ (component) => this.showComponent(component) }
                                visible={ this.state.Component13Visible }
                            />
                            <Component25 
                                navigation={this.props.navigation}
                                toggleComponent={ (component) => this.toggleComponent(component) }
                                hideComponent={ (component) => this.hideComponent(component) }
                                showComponent={ (component) => this.showComponent(component) }
                                visible={ this.state.Component25Visible }
                            />     
                            {/* här säger jag vilka komponents ska visa och hur dom ska visas */}
                     </View>

                    </View>



            </View>

        );
    }
}

const styles = StyleSheet.create({
// här säger jag hur screenen ska se ut
    container: {
        flex: 1,
    },
    
	screencontainer: {
	    backgroundColor: 'rgba(255,255,255,1)',
	    flex: 1,
	},
	
	screencontainerInner: {
	    flex: 1,
    },
	
});