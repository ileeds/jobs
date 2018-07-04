import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Notifications } from 'expo';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import registerForNotifications from './services/push_notifications';
import configureStore from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

const stackNavigator = createStackNavigator({
  review: ReviewScreen,
  settings: SettingsScreen
});
stackNavigator.navigationOptions = {
  title: 'Review Jobs',
  tabBarIcon: ({ tintColor }) => {
    return <Icon name="favorite" size={30} color={tintColor} />;
  }
};

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok' }]
        );
      }
    });
  }

  render() {
    const { persistor, store } = configureStore();

    const MainNavigator = createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: createBottomTabNavigator({
        map: MapScreen,
        deck: DeckScreen,
        review: stackNavigator
      }, {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
        }
      })
    }, {
      navigationOptions: {
        tabBarVisible: false
      }
    });

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
