// @flow
import React, {Component} from 'react'
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {currentUser, currentUserId, logged} from "../../managers/CurrentUser"
import {Navigation} from 'react-native-navigation'
import GTouchable from "../GTouchable"
import {connect} from "react-redux"
import type {Id} from "../../types"
import {GAvatar} from "../GAvatar"


type Props = {
    userId: Id,
};

type State = {
};

export const PROFILE_CLICKED = 'PROFILE_NAV_CLICKED';

@logged
@connect((state, props)=>({
    currentUser: _.get(state, `data.users.${{userId: currentUserId()}.userId}`)
}))
export default class MyAvatar extends Component<Props, State> {

    render() {

        let imageDim = 32;

        let user = {..._.get(this.props, 'currentUser.attributes', null)}
        user.id = _.get(this.props, 'currentUser.id', null)

        return (
            <GTouchable onPress={()=>{

                Navigation.handleDeepLink({
                    link: PROFILE_CLICKED,
                });

            }}>
                {user && <GAvatar person={user} size={imageDim}/>}
            </GTouchable>
        )

    }
}
