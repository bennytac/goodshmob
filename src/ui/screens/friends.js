// @flow

import type {Node} from 'react'
import React from 'react'
import {Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from "react-redux"
import {logged} from "../../managers/CurrentUser"
import Feed from "../components/feed"
import type {Id, Item, RNNNavigator, User} from "../../types"
import {buildData, doDataMergeInState} from "../../helpers/DataUtils"
import Screen from "../components/Screen"
import GTouchable from "../GTouchable"
import * as Nav from "../Nav"
import {openUserSheet, seeUser} from "../Nav"
import {LINEUP_PADDING, STYLES} from "../UIStyles"
import {actions as userActions, actionTypes as userActionTypes} from "../../redux/UserActions"
import AppShareButton from "../components/AppShareButton"
import PersonRowI from "../activity/components/PeopleRow"


type Props = {
    userId: Id,
    navigator: RNNNavigator,
    renderItem?: (item:Item)=>Node,

    onPressItem?: (item: User)=>void,
    data?: any,
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
    data: state.data,
});

@logged
@connect(mapStateToProps)
export default class FriendsScreen extends Screen<Props, State> {

    constructor(props: Props){
        super(props);
        props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event: any) { // this is the onPress handler for the two buttons together
        if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'friendsSearch') {
                this.props.navigator.push({
                    screen: 'goodsh.UserSearchScreen',
                    title: i18n.t("search.in_users"),
                    navigatorButtons: Nav.CANCELABLE_MODAL
                });
            }
        }
    }

    render() {

        const {
            userId,
            renderItem,
            data,
            ...attr
        } = this.props;


        let user: User = buildData(this.props.data, "users", userId);

        let friends, callFactory, action;
        if (user && user.friends) {
            friends = user.friends;
            callFactory = () => userActions.fetchFriendsCall(userId);
            action = userActionTypes.LOAD_FRIENDS;
        }
        else {
            friends = [];
            callFactory = () => userActions.getUserAndTheirFriends(userId);
            action = userActionTypes.GET_USER_W_FRIENDS;
        }

        return (
                <Feed
                    data={friends}
                    renderItem={({item}) => (renderItem||this.renderItem.bind(this))(item)}
                    fetchSrc={{
                        callFactory,
                        action,
                        options: {userId}
                    }}
                    ListEmptyComponent={<Text style={STYLES.empty_message}>{i18n.t('friends.empty_screen')}</Text>}
                    {...attr}
                />
        );
    }

    renderItem(item: Item) : Node {
        let user = buildData(this.props.data, "users", item.id);
        return (
            <GTouchable
                onLongPress={() => {openUserSheet(this.props.navigator, user)}}
                onPress={()=> {seeUser(this.props.navigator, user)}}>
                {/*<FriendCell friend={user} containerStyle={{paddingHorizontal: LINEUP_PADDING, paddingVertical: 10}}/>*/}
                <PersonRowI person={user} style={{margin: LINEUP_PADDING}}/>
            </GTouchable>
        )
    }
}


export const reducer =  (state = {}, action = {}) => {

    switch (action.type) {
        case userActionTypes.LOAD_FRIENDS.success(): {
            let {userId, mergeOptions} = action.options;
            let path = `users.${userId}.relationships.friends.data`;
            state = doDataMergeInState(state, path, action.payload.data, mergeOptions);
            break;
        }
    }
    return state;
};
