// @flow

import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import {MainBackground} from "./UIComponents";
import build from 'redux-object'
import Immutable from 'seamless-immutable';
import * as Api from "../utils/Api";
import ItemCell from "./components/ItemCell";
import Feed from "./components/feed";
import Swipeout from 'react-native-swipeout';
import type * as types from "../types";
import {buildNonNullData} from "../utils/DataUtils";
import CurrentUser from  "../CurrentUser"
import ApiAction from "../utils/ApiAction";
import type {Saving} from "../types";
import ActivityCell from "../activity/components/ActivityCell";

class SavingsScreen extends Component {

    props : {
        lineupId: string,
        lineup:? types.List
    };

    componentWillMount() {
        this.lineup = this.getLineup();
    }

    render() {

        return (
            <MainBackground>
                <View style={styles.container}>
                    <Feed
                        data={this.lineup.savings}
                        renderItem={this.renderItem.bind(this)}
                        fetchSrc={{
                            callFactory:()=>actions.loadSavings(this.props.lineupId),
                            action:actionTypes.LOAD_SAVINGS
                        }}
                        hasMore={!this.props.savings.hasNoMore}
                    />

                </View>
            </MainBackground>
        );
    }

    getLineup() {
        return this.props.lineup || buildNonNullData(this.props.data, "lists", this.props.lineupId);
    }

    renderItem(item) {
        let saving: Saving = item.item;
        //let saving = this.lineup.savings.filter((sav)=>sav.resource.id === it.id)[0];

        let disabled = this.lineup.user.id !== CurrentUser.id;

        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteSaving(saving) }
        }];

        return (
            <Swipeout right={swipeBtns}
                      autoClose={true}
                      backgroundColor= 'transparent'
                      disabled={disabled}
            >
                <ActivityCell
                    activityId={saving.id}
                    activityType={saving.type}
                />
            </Swipeout>)
    }

    deleteSaving(saving) {
        this.props.dispatch(actions.deleteSaving(saving));
    }

    navToSavingDetail(saving) {
        let activity = saving;


        this.props.navigator.push({
            screen: 'goodsh.ActivityDetailScreen', // unique ID registered with Navigation.registerScreen
            title: "Details", // navigation bar title of the pushed screen (optional)
            titleImage: require('../img/screen_title_home.png'), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            passProps: {activityId: activity.id, activityType: activity.type}, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'slide-up', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const mapStateToProps = (state, ownProps) => ({
    savings: state.savings,
    data: state.data,
    app: state.app,
    request: state.request
});


const actionTypes = (() => {

    const LOAD_SAVINGS = new ApiAction("load_savings");
    const DELETE_SAVING = new ApiAction("delete_saving");

    return {LOAD_SAVINGS, DELETE_SAVING};
})();


const actions = (() => {
    return {

        loadSavings: (lineupId: string) => {
            return new Api.Call().withMethod('GET')
                .withRoute(`lists/${lineupId}/savings`)
                .addQuery({
                    page: 1,
                    per_page: 10,
                    include: "*.*"
                });

        },
        deleteSaving: (saving:types.Saving) => {
            let call = new Api.Call()
                .withMethod('DELETE')
                .withRoute(`savings/${saving.id}`);

            return call.disptachForAction2(actionTypes.DELETE_SAVING);
        }
    };
})();

const reducer = (() => {
    const initialState = Immutable(Api.initialListState());

    return (state = initialState, action = {}) => {
        let desc = {fetchFirst: actionTypes.LOAD_SAVINGS, fetchMore: actionTypes.LOAD_MORE_SAVINGS};
        return Api.reduceList(state, action, desc);
    }
})();

let screen = connect(mapStateToProps)(SavingsScreen);

export {reducer, screen, actions};
