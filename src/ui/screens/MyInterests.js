// @flow

import React from 'react';
import {
    Alert,
    BackHandler,
    Button,
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {connect} from "react-redux";
import {currentUserId, logged} from "../../managers/CurrentUser"
import {CheckBox, SearchBar} from 'react-native-elements'
import {Navigation} from 'react-native-navigation';
import Screen from "../components/Screen";
import Feed from "../components/feed";
import * as Api from "../../managers/Api";
import {reducerFactory} from "../../managers/Api";
import ApiAction from "../../helpers/ApiAction";
import type {Id} from "../../types";
import {STYLES} from "../UIStyles";
import {LINEUP_SECTIONS} from "../UIComponents";
import {buildData, doDataMergeInState, sanitizeActivityType, updateSplice0} from "../../helpers/DataUtils";
import {reduceList2} from "../../managers/Api";
import {L_FOLLOW} from "../rights";
import {FOLLOW_LINEUP, UNFOLLOW_LINEUP} from "../lineup/actions";


type Props = {
};

type State = {
};


@logged
@connect(state => ({
    data: state.data,
    followed_lists: state.followed_lists,
}))
export default class MyInterests extends Screen<Props, State> {


    render() {
        let userId = currentUserId()

        let followed_lists = this.props.followed_lists
        let followed = _.slice(followed_lists.list);

        const lists = []
        const followIdsByListIds = {}
        followed.forEach(f => {
            let list = buildData(this.props.data, 'follows', f.id).list
            lists.push(list)
            followIdsByListIds[list.id] = f.id
        })

        return (
            <Feed
                displayName={"my interests"}
                data={followed}
                renderSectionHeader={({section}) => section.renderSectionHeader()}
                sections={LINEUP_SECTIONS(this.props.navigator, this.props.dispatch, userId)(lists)}
                empty={<View><Text style={STYLES.empty_message}>{i18n.t('community_screen.empty_screen')}</Text></View>}
                fetchSrc={this.fetchSrc(userId)}
                lastIdExtractor={list => followIdsByListIds[list.id]}
            />
        )
    }

    fetchSrc(userId: Id): FeedSource {
        return {
            callFactory: () => fetchFollowedLineups(userId),
            action: FETCH_FOLLOWED_LINEUPS,
            options: {userId}
        }
    }

}

const FETCH_FOLLOWED_LINEUPS = ApiAction.create("fetch_followed_lineups", "retrieve the user followed lineups details");

const fetchFollowedLineups =  userId => new Api.Call()
    .withMethod('GET')
    .withRoute(`users/${userId}/followed_lists`)



// export const reducer = reducerFactory(FETCH_FOLLOWED_LINEUPS)
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case FOLLOW_LINEUP.success(): {
            let {lineupId} = action.options;
            let {id, type} = action.payload.data

            state = updateSplice0(state, `list`,
                {
                    index: 0,
                    insert: {
                        id, type, lineupId
                    },
                }
            );
            break;
        }
        case UNFOLLOW_LINEUP.success():
            let {lineupId} = action.options;
            state = updateSplice0(state, `list`,
                {
                    deletePredicate: item => item.lineupId === lineupId,
                }
            );
            break;
    }
    return reduceList2(state, action, FETCH_FOLLOWED_LINEUPS, follow => ({lineupId: _.get(follow, 'relationships.list.data.id')}));
};