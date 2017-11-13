// @flow
import React, {Component} from 'react';
import {Clipboard, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, User, View} from 'react-native';
import type {Id} from "../types";
import {CheckBox} from "react-native-elements";
import {connect} from "react-redux";
import Feed from "./components/feed";
import {FETCH_ACTIVITIES, fetchUserNetwork} from "./networkActions";
import ActivityCell from "../activity/components/ActivityCell";

type Props = {
    userId: Id,
    navigator: any,
    network: *
};

type State = {
};

const mapStateToProps = (state, ownProps) => ({
    network: state.network,
});

@connect(mapStateToProps)
export default class UserScreen extends Component<Props, State> {

    render() {

        let userId = this.props.userId;
        let network = this.props.network[userId] || {};
        let activities = network.list;


        return (
            <View>
                <Feed
                    data={activities}
                    renderItem={this.renderItem.bind(this)}
                    fetchSrc={{
                        callFactory: ()=>fetchUserNetwork(userId),
                        useLinks: true,
                        action: FETCH_ACTIVITIES,
                        options: {userId}
                    }}
                    hasMore={!network.hasNoMore}
                />

            </View>
        );
    }


    renderItem({item}) {

        return (
            <ActivityCell
                onPressItem={() => this.navToActivity(item)}
                activityId={item.id}
                activityType={item.type}
                navigator={this.props.navigator}
            />
        )
    }
}
