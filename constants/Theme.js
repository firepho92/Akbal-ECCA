import {DefaultTheme} from 'react-native-paper';

export default Theme = {
  ...DefaultTheme,
  containerMaxHeight: {height: 465},
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8f9cbf',
    accent: '#424242',
    surface: '#fff',
    background: '#f5f6fa'
  }
}