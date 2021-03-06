// @flow

import type {Node} from 'react'
import React from 'react'
import {StyleSheet, Text, TextInput, View,} from 'react-native'
import type {SearchEngine,} from "../../../helpers/SearchHelper"
import {
    __createAlgoliaSearcher,
    PERMISSION_EMPTY_INPUT,
    renderUser
} from "../../../helpers/SearchHelper"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {LINEUP_PADDING, NAV_BACKGROUND_COLOR} from "../../UIStyles"
import GSearchBar2 from "../../components/GSearchBar2"
import SearchMotor from "../searchMotor"
import type {RNNNavigator} from "../../../types"
import {AlgoliaClient, createResultFromHit2} from "./../../../helpers/AlgoliaUtils"
import Config from 'react-native-config'
import {currentUserId} from "../../../managers/CurrentUser"
import SearchListResults from "../searchListResults"
import BlankSearch, {renderBlankIcon} from "../../components/BlankSearch"

export type SearchUserOptions = {
    token: string
}

type SUS = {
    searchOptions: SearchUserOptions,

}
type SUP = {
    navigator?: RNNNavigator
}

export default class SearchUserPage extends React.Component<SUP, SUS> {


    constructor(props: SUP) {
        super(props)
        this.state = {
            searchOptions: {
                algoliaFilter: `NOT objectID:${currentUserId()}`,
                token: ''
            }
        }
    }

    search: SearchEngine<SearchUserOptions> = __createAlgoliaSearcher({
        index: AlgoliaClient.createAlgoliaIndex(Config.ALGOLIA_USER_INDEX),
        parseResponse: createResultFromHit2,
    })

    render() {
        return (
            <View style={{flex: 1}}>
                <GSearchBar2
                    onChangeText={(token: string)  => {this.setState({searchOptions: {...this.state.searchOptions, token}})}}
                    value={_.get(this.state, this.state.searchOptions.token)}
                    style={styles1.searchBar}
                    placeholder={i18n.t('search_item_screen.searchbar_placeholder.users')}
                    autoFocus
                />
                <SearchMotor
                    searchEngine={this.search}
                    renderResults={(state, onLoadMore) => <SearchListResults searchState={state} renderItem={renderUser(this.props.navigator)} />}
                    searchOptions={this.state.searchOptions}
                    canSearch={this._canSearch}
                    renderMissingPermission={this._renderMissingPermission}
                />
            </View>
        )
    }

    _canSearch = searchOptions => _.isEmpty(searchOptions.token) ? PERMISSION_EMPTY_INPUT : null

    _renderMissingPermission = (searchOptions, missingSearchPermission): Node => {
        if (missingSearchPermission === PERMISSION_EMPTY_INPUT) {
            return <BlankSearch
                icon={renderBlankIcon('users')}
                text={i18n.t("search_item_screen.placeholder.users")}
            />
        }
        return <View/>
    }
}


const styles1 = StyleSheet.create({
    searchBar: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: LINEUP_PADDING,
        // backgroundColor: NAV_BACKGROUND_COLOR
    }
})
