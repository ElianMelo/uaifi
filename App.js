import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/components/Home';
import Room from './src/components/Room';
import CreateRoom from './src/components/CreateRoom';
import WifiList from './src/components/WifiList';
import Report from './src/components/Report';
import Help from './src/components/Help';

const Stack = createNativeStackNavigator();
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ title: 'Página Inicial' }} />
          <Stack.Screen name="Room" component={Room} options={{ title: 'Cômodos' }} />
          <Stack.Screen name="CreateRoom" component={CreateRoom} options={{ title: 'Criar Cômodo' }} />
          <Stack.Screen name="WifiList" component={WifiList} options={{ title: 'Lista de WiFi' }} />
          <Stack.Screen name="Report" component={Report} options={{ title: 'Relatório' }} />
          <Stack.Screen name="Help" component={Help} options={{ title: 'Ajuda' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
