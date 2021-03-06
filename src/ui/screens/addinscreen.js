// @flow
import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {CheckBox} from "react-native-elements"
import type {Props as LineupProps} from "./lineuplist"
import {LineupListScreen} from './lineuplist'
import AddLineupComponent from "../components/addlineup"
import {Colors} from "../colors"
import GTouchable from "../GTouchable"
import {currentUserId} from "../../managers/CurrentUser"
import Screen from "../components/Screen"
import LineupHorizontal from "../components/LineupHorizontal"
import LineupCellSaving from "../components/LineupCellSaving"
import type {Lineup} from "../../types"
import LineupTitle from "../components/LineupTitle"
import {TRANSPARENT_SPACER} from "../UIComponents"
import {LINEUP_SEP} from "../UIStyles"

type Props = LineupProps & {
    onListSelected: ()=>void
};

type State = {
    filter:? string,  //filter lists over this search token
};

export default class AddInScreen extends Screen<Props, State> {

    state = {filter: null};
    _spacer = TRANSPARENT_SPACER(LINEUP_SEP)

    render() {

        const {navigator, onListSelected, ...otherProps} = this.props;

        return (
            <View style={[styles.container]}>

                <LineupListScreen
                    ListHeaderComponent={(
                        <AddLineupComponent
                            disableOffline={true}
                            navigator={this.props.navigator}
                            style={{backgroundColor: Colors.green, padding: 10, marginTop: 15, marginRight: 15, marginLeft: 8, borderRadius:8}}
                            onListCreated={lineup=> onListSelected(lineup)}
                            styleText={{color: Colors.white, fontWeight: 'normal'}}/>)}
                    {...otherProps}
                    userId={currentUserId()}
                    renderItem={lineup => (
                        <GTouchable onPress={()=>onListSelected(lineup)}>
                            <LineupHorizontal lineup={lineup}/>
                        </GTouchable>
                    )
                    }
                    navigator={navigator}
                    ItemSeparatorComponent={this._spacer}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        backgroundColor: 'transparent',
    },
    searchInput: {
        backgroundColor: Colors.white,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.greyishBrown
    },
});
