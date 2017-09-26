import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import {screen as HomeScreen} from './home';
import SearchScreen from './SearchScreen';
import AddScreen from './AddScreen';
import NotifScreen from './NotifScreen';
import AskScreen from './AskScreen';
import DebugScreen from './DebugScreen';
import {screen as FriendScreen} from './community';
import ActivityScreen from '../activity/screen';
import LineupListScreen from '../lineup/listScreen';
import LineupDetailScreen from '../lineup/detailScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('goodsh.LoginScreen', () => LoginScreen, store, Provider);
    Navigation.registerComponent('goodsh.HomeScreen', () => HomeScreen, store, Provider);
    Navigation.registerComponent('goodsh.SearchScreen', () => SearchScreen, store, Provider);
    Navigation.registerComponent('goodsh.AddScreen', () => AddScreen, store, Provider);
    Navigation.registerComponent('goodsh.NotifScreen', () => NotifScreen, store, Provider);
    Navigation.registerComponent('goodsh.AskScreen', () => AskScreen, store, Provider);
    Navigation.registerComponent('goodsh.DebugScreen', () => DebugScreen, store, Provider);
    Navigation.registerComponent('goodsh.CommunityScreen', () => FriendScreen, store, Provider);
    Navigation.registerComponent('goodsh.ActivityScreen', () => ActivityScreen, store, Provider);
    Navigation.registerComponent('goodsh.LineupListScreen', () => LineupListScreen, store, Provider);
    Navigation.registerComponent('goodsh.LineupDetailScreen', () => LineupDetailScreen, store, Provider);
}