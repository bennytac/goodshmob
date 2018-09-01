// @flow

import React from 'react'
import {
    ActivityIndicator,
    FlatList,
    Platform,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import {currentUserId} from "../../managers/CurrentUser"
import type {NavigableProps} from "../../types"
import Screen from "../components/Screen"
import {SEARCH_CATEGORIES_TYPE} from "../../helpers/SearchConstants"
import * as Api from "../../managers/Api"
import {actions as userActions, actionTypes as userActionTypes} from "../../redux/UserActions"
import {PagerPan, TabView} from "react-native-tab-view"
import BrowseGeneric from "./search/BrowseGeneric"
import BrowsePlaces from "./search/BrowsePlaces"
import {connect} from "react-redux"
import {renderTabBarFactory} from "../UIComponents"

type Props = NavigableProps & {
    initialIndex: number,
    searchOptions?: any
}

type State = {
    index: number,
    routes: any,
};

const ROUTES = SEARCH_CATEGORIES_TYPE.map(t=> ({key: t, title: i18n.t("search_item_screen.tabs." + t)}))

@connect()
export default class CategorySearchScreen extends Screen<Props, State> {

    static navigatorStyle = {
        navBarNoBorder: true,
        topBarElevationShadowEnabled: false
    }

    static defaultProps = {
        initialIndex: 0,
        searchOptions: {},
    }

    constructor(props: Props) {
        super(props)
        this.state = {
            routes: ROUTES,
            index: props.initialIndex
        }
    }

    componentDidMount() {
        //so I guess we are looking among the 1st 10 friends only ?
        Api.safeDispatchAction.call(
            this,
            this.props.dispatch,
            userActions.getUserAndTheirFriends(currentUserId()).createActionDispatchee(userActionTypes.GET_USER),
            'reqFetchUser'
        )
    }


    render() {
        return <TabView
            style={{flex: 1}}
            navigationState={{...this.state}}
            renderScene={this.renderScene.bind(this)}
            renderTabBar={renderTabBarFactory(this.isFocused.bind(this))}
            renderPager={props => <PagerPan {...props} />}
            swipeEnabled={false}
            onIndexChange={index => {
                this.setState({index})
            }}
        />
    }

    isFocused(route) {
        return this.state.index === ROUTES.indexOf(route)
    }

    renderScene({ route}: *) {
        let ix = ROUTES.indexOf(route)
        let focused = this.state.index === ix
        const visible: boolean = super.isVisible()
        switch (route.key) {
            case 'places': return (
                <BrowsePlaces
                    navigator={this.props.navigator}
                    focused={visible && focused}
                    {
                        ...this.props.searchOptions[route.key]
                    }
                />
            )
            default: return (
                <BrowseGeneric
                    navigator={this.props.navigator}
                    category={route.key}
                    focused={visible && focused}
                    {
                        ...this.props.searchOptions[route.key]
                    }
                />
            )
        }
    }
}
