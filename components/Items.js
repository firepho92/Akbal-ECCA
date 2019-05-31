import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';

export class Items extends React.Component {
  render() {
    return (
			<ScrollView ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight) => {this.scrollView.scrollToEnd({animated: true})}}>
	    	{
	    		this.props.registries.map((registry, index) => (
	    			<Item key={index} index={index} registry={registry} min_temp={this.props.recipe.temperatura_minima} max_temp={this.props.recipe.temperatura_maxima}/>
	    		))
	    	}
	    </ScrollView>
    )
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	red: '#F44336',
    	green: '#43A047',
    	blue: '#1E88E5'
    }
    this.fade = new Animated.Value(0);
  }

  componentDidMount() {
    this.fadeIn(this.props.index);
  }
  
  fadeIn = (index) => {
    this.fade.setValue(0);
    Animated.timing(
      this.fade,
      {
       toValue: 1,
       duration: 350,
      }
    ).start(); 
  }

  _getColor = (temperature) => {
  	if(temperature > this.props.max_temp) {
  		return this.state.red;
  	} else {
  		if(temperature < this.props.min_temp) {
  			return this.state.blue;
  		} else {
  			return this.state.green;
  		}
  	}
  }

  _addZero = (date) => {
  	let minutes = new Date(minutes).getMinutes;
  	if(minutes < 10) {
  		return '0';
  	} else {
  		return '';
  	}
  }

  render() {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return (
      <Animated.View style={[{opacity: this.fade}, styles.item]}>
        <View>
        	<Text style={{color: this._getColor(this.props.registry.temperature), fontWeight: 'bold'}}>{Number.parseFloat(this.props.registry.temperature).toFixed(1) + '°C'}</Text>
          <Text>{Number.parseFloat(this.props.registry.humidity).toFixed(1) + '%  ' + new Date(this.props.registry.date).getDate() + '/' + months[new Date(this.props.registry.date).getMonth()] + '/' + new Date(this.props.registry.date).getFullYear() + ' ' + new Date(this.props.registry.date).getHours() + ':' + this._addZero(this.props.registry.date) + new Date(this.props.registry.date).getMinutes()}</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: '#fff',
    width: 250,
    elevation: 5
  }
});