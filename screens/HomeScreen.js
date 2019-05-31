import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { MonoText } from '../components/StyledText';
import { Button } from 'react-native-paper';
import Theme from '../constants/Theme';

import socketio from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hot: '#cd106f',
      cold: '#cd106f',
      normal: '#fff',
      registry: null,
      recipe: {
        id_receta: 1,
        nombre: 'Stout',
        descripcion: 'hola',
        temperatura_maxima: 21.5,
        temperatura_minima: 19.0
      }
    }
    this.socket = socketio('https://akbal-ecs.herokuapp.com/', {transports: ['websocket']});
  }
  static navigationOptions = {
    header: null,
  };

  _start = () => {
    axios.get('http://192.168.100.144:8000')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    /*axios.get('http://192.168.100.144:8000/recipe')
    .then(response => {
      if(response.data.status) {
        this.setState({
          recipe: {
            id_receta: response.data.results.id_receta,
            nombre: response.data.results.nombre,
            descripcion: response.data.results.descripcion,
            temperatura_maxima: response.data.results.temperatura_maxima,
            temperatura_minima: response.data.results.temperatura_minima
          }
        });
      }
    })
    .catch(error => {
      console.log(error);
    });*/
    this._handleSocketIncoming();
  }


  _handleSocketIncoming = () => {
    this.socket.on('data', registry => {
      this.setState({
        registry
      });
    });
  }

  _renderButton = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <Button mode="text" theme={Theme} onPress={() => this._start()}>
          Iniciar
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionWrapper}>
          {this.state.registry === null ? this._renderButton() : <Registry registry={this.state.registry} recipe={this.state.recipe} hot={this.state.hot} cold={this.state.cold} normal={this.state.normal}/>}
        </View>
      </View>
    );
  }

}

//{ this.state.registries.length > 0 && this.state.recipe !== null ? <Items registries={this.state.registries} recipe={this.state.recipe}/> : this._renderButton() }

export class Registry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hot: '#cd106f',
      cold: '#01aad7',
      normal: '#fff',
    }
    this.fade = new Animated.Value(0);
    this.socket = socketio('https://akbal-ecs.herokuapp.com/', {transports: ['websocket']});
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
       duration: 500,
       delay: 300
      }
    ).start(); 
  }

  _getColor = (temperature) => {
    if(temperature > this.props.recipe.temperatura_maxima) {
      return this.state.hot;
    } else {
      if(temperature < this.props.recipe.temperatura_minima) {
        return this.state.cold;
      } else {
        return this.state.normal;
      }
    }
  }

  render() {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return (
      <Animated.View style={{opacity: this.fade}}>
        <View>
          <Text style={{color: Theme.colors.primary}}>{this.props.recipe.nombre}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="ios-thermometer" size={60} color={Theme.colors.primary} />
          <Text style={{color: this._getColor(this.props.registry.temperature), fontSize: 60}}>{' ' + Number.parseFloat(this.props.registry.temperature).toFixed(1) + '°C'}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="ios-water" size={16} color={'#8f9cbf'} />
          <Text style={{color: Theme.colors.primary, fontSize: 16}}>{' ' + Number.parseFloat(this.props.registry.humidity).toFixed(1) + '%'}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="md-time" size={16} color={Theme.colors.primary} />
          <Text style={{color: Theme.colors.primary, fontSize: 16}}>{' ' + moment(new Date(this.props.registry.date)).format('MMMM Do YYYY, h:mm:ss a')}</Text>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080a24',
    padding: 10
  },
  sectionWrapper: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});