import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import AddScreen from './AddScreen';
import NotifScreen from './NotifScreen';
import AskScreen from './AskScreen';
import LineUpScreen from './LineUpScreen';
import CommunityScreen from './CommunityScreen';
import DebugScreen from './DebugScreen';
import ActivityScreen from '../activity/screen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('goodsh.LoginScreen', () => LoginScreen, store, Provider);
    Navigation.registerComponent('goodsh.HomeScreen', () => HomeScreen, store, Provider);
    Navigation.registerComponent('goodsh.SearchScreen', () => SearchScreen, store, Provider);
    Navigation.registerComponent('goodsh.AddScreen', () => AddScreen, store, Provider);
    Navigation.registerComponent('goodsh.NotifScreen', () => NotifScreen, store, Provider);
    Navigation.registerComponent('goodsh.AskScreen', () => AskScreen, store, Provider);
    Navigation.registerComponent('goodsh.DebugScreen', () => DebugScreen, store, Provider);
    Navigation.registerComponent('goodsh.LineUpScreen', () => LineUpScreen, store, Provider);
    Navigation.registerComponent('goodsh.CommunityScreen', () => CommunityScreen, store, Provider);
    Navigation.registerComponent('goodsh.ActivityScreen', () => ActivityScreen, store, Provider);
}