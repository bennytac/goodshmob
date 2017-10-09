// @flow

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {connect} from "react-redux";
import {MainBackground} from "./UIComponents";
import Immutable from 'seamless-immutable';
import * as Api from "../utils/Api";
import ActionButton from 'react-native-action-button';
import { screen as LineupList } from './lineups'
import Item from "../models/Item";
import List from "../models/List";
import * as types from "../types"
import Snackbar from "react-native-snackbar"

class HomeScreen extends Component {

    static navigationOptions = { title: 'Welcome', header: null };

    constructor(props){
        super(props);
        this.state = {
            pendingItem: null,
            pendingList: null
        };

        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'cancel_add') { // this is the same id field from the static navigatorButtons definition
                this.setState({pendingItem: null, pendingList: null});
            }
        }
    }

    render() {
        let rightButtons = (this.state.pendingItem || this.state.pendingList) ? [{
            title: 'Cancel',
            id: 'cancel_add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }] : [];

        this.props.navigator.setButtons({
            leftButtons: [], // see "Adding buttons to the navigator" below for format (optional)
            rightButtons: rightButtons,
            animated: false// does the change have transition animation or does it happen immediately (optional)
        });


        return (
            <MainBackground>
                <LineupList
                    onLineupPressed={(lineup) => this.onLineupPressed(lineup)}
                    onAddInLineupPressed={(this.state.pendingItem) ? null : (lineup) => this.addInLineup(lineup)}
                />
                {this.displayFloatingButton() && <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { this.onFloatingButtonPressed() }}
                />}

            </MainBackground>
        );
    }

    displayFloatingButton() {
        return this.state.pendingItem === null;
    }

    addInLineup(lineup: List) {
        this.setState({pendingList: lineup});
        console.log(`add in lineup: ${lineup.id}`);
        this.onFloatingButtonPressed();
    }

    onLineupPressed(lineup:types.List) {
        if (this.state.pendingItem) {
            this.setState({pendingList: lineup}, () => this.resolveAdd());
        }
        else {
            this.seeLineupDetails(lineup);
        }
    }

    seeLineupDetails(lineup: types.List) {
        console.info("on linup pressed: " + JSON.stringify(lineup));
        this.props.navigator.push({
            screen: 'goodsh.SavingsScreen', // unique ID registered with Navigation.registerScreen
            title: "Lineup Details", // navigation bar title of the pushed screen (optional)
            titleImage: require('../img/screen_title_home.png'), // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            passProps: {lineupId: lineup.id}, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'slide-down', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        });
    }

    onFloatingButtonPressed() {
        this.props.navigator.showModal({
            screen: 'goodsh.SearchScreen', // unique ID registered with Navigation.registerScreen
            title: "Ajouter un goodsh", // navigation bar title of the pushed screen (optional)
            passProps: {
                onItemSelected: (item: types.Item) => {
                    this.props.navigator.dismissAllModals();
                    console.info("item selected: "+ JSON.stringify(item.title));

                    //TODO: add it to redux
                    this.setState({pendingItem: item}, () => this.resolveAdd());
                }
            }, // Object that will be passed as props to the pushed screen (optional)
        });
    }

    resolveAdd() {
        //action blabla
        if (this.state.pendingItem && this.state.pendingList) {
            console.info(`${this.state.pendingItem.title} waiting to be added in ${this.state.pendingList.name}`);
            this.props
                .dispatch(actions.saveItem(this.state.pendingItem.id, this.state.pendingList.id, ))
                .then(() => {
                    Snackbar.show({
                        title: 'Item ajouté',
                        //duration: Snackbar.LENGTH_INDEFINITE,
                    });
                    return this.setState({pendingItem: null, pendingList: null});
                });
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const mapStateToProps = (state, ownProps) => ({
});

const actiontypes = (() => {

    const SAVE_ITEM = new Api.ApiAction("save_item");
    return {SAVE_ITEM};
})();


const actions = (() => {
    return {
        saveItem: (itemId, lineupId, privacy = 0, description = '') => {

            let body = {
                saving: { list_id: lineupId, privacy}
            };
            if (description) {
                Object.assign(body, description)
            }
            console.log("saving item, with body:");
            console.log(body);

            let call = new Api.Call()
                .withMethod('POST')
                .withRoute(`items/${itemId}/savings`)
                .withBody(body)
                .withQuery({'include': '*.*'});

            return call.disptachForAction2(actiontypes.SAVE_ITEM);
        },
    };
})();

const reducer = (() => {
    const initialState = Immutable(Api.initialListState());

    return (state = initialState, action = {}) => {
        return state;
    }
})();

let screen = connect(mapStateToProps)(HomeScreen);

export {reducer, screen};