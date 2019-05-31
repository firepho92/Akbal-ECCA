import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Theme from '../constants/Theme';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  static navigationOptions = {
    title: 'Crear nuevo lote',
  };

  render() {
    return (
      <View>
        <TextInput
          mode='outlined'
          theme={Theme}
          label='Receta'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
