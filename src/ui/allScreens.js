import {Navigation} from 'react-native-navigation';

import {screen as LoginScreen} from './screens/login';
import {screen as NetworkScreen} from './screens/network';
import {screen as SearchItemScreen} from './screens/searchitems';
import {SearchNavBar} from './screens/search';
import DebugScreen from './screens/debug';

import {screen as ActivityDetailScreen} from './activity/activityDetail';
import {LineupListScreen} from './screens/lineuplist';
import {screen as AddInScreen} from './screens/addinscreen';
import {screen as LineupScreen} from './screens/lineup';
import {screen as HomeScreen} from './screens/home';
import {screen as CommentsScreen} from './screens/comments';
import {screen as SaveScreen} from './screens/save';
import {screen as ShareScreen} from './screens/share';
import ProfileScreen from './screens/profile';
import FriendScreen from './screens/friends';
import {CommunityScreen} from './screens/community';
import SendScreen from './screens/send';
import AskScreen from './screens/ask';
import AlgoliaSearchScreen from './screens/algoliasearch';
import UserScreen from './screens/user';
import NetworkSearchScreen from './screens/networksearch';
import HomeSearchScreen from './screens/homesearch';
import AddItemScreen from './screens/additem';
import TestScreen from './screens/test';
import UserSheetScreen from './screens/userSheet';
import MyAvatar from './components/MyAvatar';
import {InteractionScreen} from './screens/interactions';


import RnRenderPerfs from 'rn-render-perfs';
import Perf from 'ReactPerf';

import React from 'react';
import {View} from 'react-native';


function wrap(screenName,screenCreator,store,provider) {

    if (__IS_LOCAL__ && __DEBUG_PERFS__) {
        let Screen = screenCreator();
        screenCreator = () => class extends React.Component {
            render () {
                let perf = Perf;
                setTimeout(() => perf.start());
                return (
                    <View style={{flex: 1}}>
                        {<Screen {...this.props} />}
                        <RnRenderPerfs monitor={perf} />
                    </View>
                )
            }
        };
    }


    Navigation.registerComponent(screenName, screenCreator, store, provider);
}

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {
    wrap('goodsh.LoginScreen', () => LoginScreen, store, Provider);
    wrap('goodsh.NetworkScreen', () => NetworkScreen, store, Provider);
    wrap('goodsh.SearchItemsScreen', () => SearchItemScreen, store, Provider);
    wrap('goodsh.DebugScreen', () => DebugScreen, store, Provider);
    wrap('goodsh.FriendsScreen', () => FriendScreen, store, Provider);
    wrap('goodsh.ActivityDetailScreen', () => ActivityDetailScreen, store, Provider);
    wrap('goodsh.LineupListScreen', () => LineupListScreen, store, Provider);
    wrap('goodsh.AddInScreen', () => AddInScreen, store, Provider);
    wrap('goodsh.HomeScreen', () => HomeScreen, store, Provider);
    wrap('goodsh.SearchNavBar', () => SearchNavBar, store, Provider);
    wrap('goodsh.LineupScreen', () => LineupScreen, store, Provider);
    wrap('goodsh.CommentsScreen', () => CommentsScreen, store, Provider);
    wrap('goodsh.SaveScreen', () => SaveScreen, store, Provider);
    wrap('goodsh.ShareScreen', () => ShareScreen, store, Provider);
    wrap('goodsh.CommunityScreen', () => CommunityScreen, store, Provider);
    wrap('goodsh.SendScreen', () => SendScreen, store, Provider);
    wrap('goodsh.ProfileScreen', () => ProfileScreen, store, Provider);
    wrap('goodsh.AskScreen', () => AskScreen, store, Provider);
    wrap('goodsh.AlgoliaSearchScreen', () => AlgoliaSearchScreen, store, Provider);
    wrap('goodsh.UserScreen', () => UserScreen, store, Provider);
    wrap('goodsh.NetworkSearchScreen', () => NetworkSearchScreen, store, Provider);
    wrap('goodsh.HomeSearchScreen', () => HomeSearchScreen, store, Provider);
    wrap('goodsh.AddItemScreen', () => AddItemScreen, store, Provider);
    wrap('goodsh.TestScreen', () => TestScreen, store, Provider);
    wrap('goodsh.InteractionScreen', () => InteractionScreen, store, Provider);
    wrap('goodsh.MyAvatar', () => MyAvatar, store, Provider);
    wrap('goodsh.UserSheetScreen', () => UserSheetScreen, store, Provider);
}