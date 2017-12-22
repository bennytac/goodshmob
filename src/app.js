// @flow

import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {Navigation} from 'react-native-navigation';
//import {registerScreens} from './screens/allScreens';
import * as reducers from "./reducers/allReducers";
import {createWithReducers} from "./auth/reducer";
import thunk from "redux-thunk";
import logger from 'redux-logger'

import * as Api from './managers/Api';
import {autoRehydrate, createTransform, persistStore} from 'redux-persist'
import {AsyncStorage, TouchableOpacity, StyleSheet} from 'react-native'
import immutableTransform from './immutableTransform'
import {REHYDRATE} from 'redux-persist/constants'
import i18n from './i18n/i18n'
import * as CurrentUser from './managers/CurrentUser'
import {Client} from 'bugsnag-react-native';
import * as globalProps from 'react-native-global-props';
import * as notification from './managers/notification';
import * as DeviceManager from "./managers/DeviceManager";
import * as UI from "./ui/UIStyles";
import {init as initGlobal} from "./global";
import {AlgoliaClient} from "./helpers/AlgoliaUtils";
import {Statistics} from "./managers/Statistics";
import {UPGRADE_CACHE} from "./auth/actionTypes";
import Config from 'react-native-config'
import {Provider} from "react-redux";
import Messenger from "./managers/Messenger"
import {Colors} from "./ui/colors";
import {SFP_TEXT_REGULAR} from "./ui/fonts";

console.log(`staring app with env=${JSON.stringify(Config)}`);

initGlobal();

const CACHE_VERSION = 1;

let hydrated = false;

//this is shit
// const initialState = () => Immutable({
//     rehydrated: hydrated,
// });

const appReducer = (state = {}, action) => {
    switch (action.type) {
        case REHYDRATE:
            return {...state, rehydrated: true};
        //return state.merge({rehydrated: true})
    }
    return state;
};

//see the network requests in the debugger
//TODO: doesnt work yet
//GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
//if (!__IS_LOCAL__) {
console.disableYellowBox = true;
//}
const APP_STYLES = StyleSheet.create({
    TEXT_DEFAULT: {
        fontFamily: SFP_TEXT_REGULAR,
        color: Colors.black,
    }
});

export default class App {

    logged = null;
    initialized: boolean; //is app prepared

    store;
    bugsnag;


    constructor() {

        this.prepare();


        // since react-redux only works on components, we need to subscribe this class manually
        this.store.subscribe(this.onStoreUpdate.bind(this));

        this.start();
    }


    prepare() {
        this.prepareRedux();
    }

    prepareUI() {

        globalProps.setCustomText({
            style: APP_STYLES.TEXT_DEFAULT
        });

        globalProps.setCustomView({
            style: {
                backgroundColor: 'transparent'
            }
        });

        // setCustomTouchableOpacity({
        //     underlayColor: "red"
        // });
        // const DEFAULT_PROPS = {
        //     activeOpacity: 0.85,
        //     underlayColor: 'red',
        // };
        //
        // TouchableOpacity.prototype.getDefaultProps = function getDefaultProps() {
        //     return DEFAULT_PROPS;
        // };
        // Getting rid of that ugly line on Android and adding some custom style to all TextInput components.
        const customTextInputProps = {
            underlineColorAndroid: 'rgba(0,0,0,0)',
            style: {
                paddingVertical: 5,
                paddingHorizontal: 8,
                backgroundColor: 'white'
            }
        };

        globalProps.setCustomTextInput(customTextInputProps);


        // Component.setState.prototype = function setState(imconpleteState, callback) {
        //     console.log("coucouc");
        //     this.setState(imconpleteState, callback);
        // };
    }

    prepareRedux() {
        let allReducers = combineReducers({...reducers, app: appReducer});
        const reducer = createWithReducers(allReducers);
        this.store = createStore(
            reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
            compose(
                applyMiddleware(thunk, logger),
                autoRehydrate()
            )
        );

        // begin periodically persisting the store
        let persistConfig = {
            storage: AsyncStorage,
            transforms: [createTransform(immutableTransform.in, immutableTransform.out, immutableTransform.config)],
            // whitelist: ['auth','device']
        };

        // if (!__IS_LOCAL__ || !USE_CACHE_LOCAL) {
        // persistConfig = {...persistConfig, whitelist: ['auth', 'device', 'stat', 'config']};
        // }

        persistStore(this.store,
            persistConfig,
            () => {
                console.log("persist store complete");
                hydrated = true;
                //configureApp();
            }
        );
    }



    onStoreUpdate() {
        if (!this.initialized) {
            this.start();
        }

        this.resolveLogged();
    }

    start() {
        //waiting rehydration before starting app
        let rehydrated = this.store.getState().app.rehydrated;
        if (!rehydrated) {
            console.debug("waiting for rehydration");
            return;
        }

        //finish app prepatation
        //singletons
        Api.init(this.store);
        CurrentUser.init(this.store);
        DeviceManager.init(this.store);
        AlgoliaClient.init(this.store);
        Statistics.init(this.store);
        Messenger.init();


        if (!__IS_LOCAL__) {
            this.bugsnag = new Client();
        }

        //delayed import
        let registerScreens = require('./ui/allScreens').default;
        registerScreens(this.store, Provider);


        this.prepareUI();

        //invalidate cache if needed
        let cacheVersion = this.store.getState().config.cacheVersion;
        if (cacheVersion != Config.CACHE_VERSION) {

            console.info(`cache is outdated. Upgrading ${cacheVersion}->${Config.CACHE_VERSION}`);
            //invalidate and set cache
            this.store.dispatch({type: UPGRADE_CACHE, newCacheVersion: Config.CACHE_VERSION});
        }

        this.initialized = true;
        console.info("App initialized.");
    }

    resolveLogged() {

        console.debug("resolving logged");

        const {currentUserId} = this.store.getState().auth;

        let id = CurrentUser.currentUserId();

        if (id !== currentUserId) {
            console.warn(`inconsistent current_user_id: ${id}!=${currentUserId}`);
            return;
        }

        let logged = !!currentUserId;


        if (logged) {
            notification.load();
        }
        else {
            //TODO: stop listening
        }

        //TODO: use navigation to resolve the current screen
        if (this.logged !== logged) {
            this.logged = logged;
            this.startApp(logged);
        }
    }

    startApp(logged: boolean) {
        const testScreen = require("./testScreen").default;
        console.debug(`starting app logged=${logged}, test=${(!!testScreen)}`);

        let navigatorStyle = {...UI.NavStyles};

        if (!logged) {
            Navigation.startSingleScreenApp({
                screen: {
                    label: 'Login',
                    screen: 'goodsh.LoginScreen',
                    navigatorStyle: {
                        ...navigatorStyle,
                        navBarHidden: true,
                    }
                }
            });
        }
        else if (__IS_LOCAL__ && testScreen) {
            Object.assign(testScreen.screen, {navigatorStyle});
            Navigation.startSingleScreenApp(testScreen);
        }
        else {
            //return;
            let userId = CurrentUser.currentUserId();
            if (!userId) throw "wtf";

            let tabsStyle = { // optional, add this if you want to style the tab bar beyond the defaults
                tabBarButtonColor: '#000', // optional, change the color of the tab icons and text (also unselected)
                tabBarSelectedButtonColor: Colors.green, // optional, change the color of the selected tab icon and text (only selected)
                tabBarBackgroundColor: 'white',
                forceTitlesDisplay: false,
                tabBarShowLabels: 'hidden',
                initialTabIndex: 0,
            };



            Navigation.startTabBasedApp({
                tabs: [
                    {
                        label: i18n.t('tabs.home.label'),
                        screen: 'goodsh.HomeScreen',
                        icon: require('./img2/mystuff_Glyph.png'),
                        selectedIcon: require('./img2/mystuff_Glyph_Active.png'),
                        titleImage: require('./img2/headerLogoBlack.png'),
                        title: i18n.t('tabs.home.title'),
                        navigatorStyle

                    },
                    {
                        label: '#Network', // tab label as appears under the icon in iOS (optional)
                        screen: 'goodsh.NetworkScreen', // unique ID registered with Navigation.registerScreen
                        icon: require('./img2/feed_Glyph.png'),
                        selectedIcon: require('./img2/feed_Glyph_Pressed.png'),
                        titleImage: require('./img2/headerLogoBlack.png'),
                        title: '#Mon réseau', // title of the screen as appears in the nav bar (optional)
                        navigatorStyle
                    },
                ],
                tabsStyle,
                appStyle: {
                    orientation: 'portrait', // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
                    // bottomTabBadgeTextColor: 'red', // Optional, change badge text color. Android only
                    // bottomTabBadgeBackgroundColor: 'green', // Optional, change badge background color. Android only
                    backButtonImage: require('./img2/leftBackArrowGrey.png'),
                    hideBackButtonTitle: true,
                    ...tabsStyle,
                },
                // passProps: {
                //     drawerRight: {
                //         onScreen: true,
                //         style: {marginTop: 38},
                //     }
                // },
                drawer: { // optional, add this if you want a side menu drawer in your app
                    left: { // optional, define if you want a drawer from the left
                        // screen: 'goodsh.FriendsScreen',
                        screen: 'goodsh.ProfileScreen', // unique ID registered with Navigation.registerScreen
                        enabled: false,
                        passProps: {
                            userId
                        } // simple serializable object that will pass as props to all top screens (optional)
                    },
                    // right: { // optional, define if you want a drawer from the right
                    //     screen: 'goodsh.CommunityScreen', // unique ID registered with Navigation.registerScreen
                    //     // enabled: false,
                    //     passProps: {
                    //         style: {marginTop: 38},
                    //         onScreen: true //with current RNN version there are no way to detect if drawer is opened yet
                    //     } // simple serializable object that will pass as props to all top screens (optional)
                    // },
                    style: { // ( iOS only )
                        drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                        contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
                        leftDrawerWidth: 80, // optional, add this if you want a define left drawer width (50=percent)
                        rightDrawerWidth: 80 // optional, add this if you want a define right drawer width (50=percent)
                    },
                    type: 'TheSideBar', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
                    animationType: 'slide-and-scale', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                    // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
                    // disableOpenGesture: true// optional, can the drawer be opened with a swipe instead of button
                },
                passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                //animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
            });

        }
    }
}