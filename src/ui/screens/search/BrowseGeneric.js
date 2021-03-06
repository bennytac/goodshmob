// @flow

import type {Element} from 'react'
import React from 'react'
import {StyleSheet, Text, TextInput, View,} from 'react-native'
import type {FRIEND_FILTER_TYPE, SearchEngine,} from "../../../helpers/SearchHelper"
import {
    __createAlgoliaSearcher,
    makeBrowseAlgoliaFilter2,
    PERMISSION_NO_FRIEND,
    renderEmptyResults
} from "../../../helpers/SearchHelper"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import type {ISearchMotor} from "../searchMotor"
import SearchMotor from "../searchMotor"
import {currentUserId, logged} from "../../../managers/CurrentUser"
import {buildData} from "../../../helpers/DataUtils"
import {connect} from "react-redux"
import {AlgoliaClient, createResultFromHit} from "../../../helpers/AlgoliaUtils"
import Config from 'react-native-config'
import {SocialScopeSelector} from "./socialscopeselector"
import SearchListResults from "../searchListResults"
import type {SearchItemCategoryType} from "../../../helpers/SearchConstants"
import {GoodshContext, RENDER_NO_FRIEND_ERROR} from "../../UIComponents"
import {BrowseItemsPlacesOptions} from "./BrowsePlaces"
import {savingForGridRenderer2} from "../../../helpers/GridHelper"
import SavingsGrid from "../SavingsGrid"

export type BrowseItemsGenOptions = {
    algoliaFilter?: string
}

type SMS = {
    searchOptions: BrowseItemsGenOptions,
    scope: FRIEND_FILTER_TYPE

}
type SMP = {
    category: SearchItemCategoryType,
    focused?: boolean,
    scope?: string,
}

@connect(state => ({
    data: state.data,
}))
@logged
export default class BrowseGeneric extends React.Component<SMP, SMS> {

    searchMotor: ISearchMotor<BrowseItemsGenOptions>
    logger: GLogger;


    static defaultProps = {scope: 'me'}

    constructor(props: SMP) {
        super(props)

        this.state = {
            searchOptions: {
                algoliaFilter: makeBrowseAlgoliaFilter2(this.props.scope, props.category, this.getUser()),
            },
            scope: props.scope
        }
        this.logger = rootlogger.createLogger(`browse ${this.props.category}`)
    }

    _index = new Promise(resolve => {
        AlgoliaClient.createAlgoliaIndex(Config.ALGOLIA_SAVING_INDEX).then(index => {
            index.setSettings({
                    searchableAttributes: [
                        'item_title',
                        'list_name'
                    ],
                    attributeForDistinct: 'item_id',
                    distinct: true,
                    attributesForFaceting: ['user_id', 'type'],
                }
            );
            resolve(index);
        });
    })

    search: SearchEngine<BrowseItemsGenOptions> = __createAlgoliaSearcher({
        index: this._index,
        parseResponse: (hits) => createResultFromHit(hits, {}, true),
    })

    render() {
        return (
            <View style={{flex: 1}}>

                <SocialScopeSelector
                    initialValue={this.props.scope}
                    onScopeChange={scope => {
                        this.setState({
                            searchOptions: {
                                ...this.state.searchOptions,
                                algoliaFilter: makeBrowseAlgoliaFilter2(scope, this.props.category, this.getUser())
                            },
                            scope,
                        })}
                    }
                    value={this.state.scope}
                />

                <GoodshContext.Provider value={{userOwnResources: this.state.scope === 'me'}}>
                    <SearchMotor
                        innerRef={ref => this.searchMotor = ref}
                        searchEngine={this.search}
                        renderResults={(state, onLoadMore) => (
                            <SavingsGrid
                                searchState={state}
                                onLoadMore={onLoadMore}
                                EmptyComponent={renderEmptyResults(this.state.scope, this.props.category, this.props.navigator)}
                            />
                        )
                        }
                        searchOptions={this.state.searchOptions}
                        canSearch={this._canSearch}
                        renderMissingPermission={this._renderMissingPermission}
                    />
                </GoodshContext.Provider>
            </View>
        )
    }

    _renderMissingPermission = (searchOptions: BrowseItemsPlacesOptions, missingPermission: string) => {
        if (missingPermission === PERMISSION_NO_FRIEND) {
            return RENDER_NO_FRIEND_ERROR()
        }
        return null
    }

    _canSearch= (searchoptions) => {
        if (this.state.scope === 'friends' && _.isEmpty(this.getUser().friends)) return PERMISSION_NO_FRIEND

        return !this.props.focused ? 'not_focused' : null
    }

    componentDidUpdate(prevProps: SMP) {
        // for "don't search on 1st render" feature
        this.logger.debug("componentDidUpdate", this.props)
        if (prevProps.focused !== this.props.focused) {
            //disapointing
            setTimeout(() => {
                if (this.searchMotor) this.searchMotor.search(this.state.searchOptions, false)
            })
        }
        let partialSO = null

        let set = (k,v) => {
            partialSO = _.set(partialSO || {}, k, v)
            this.logger.debug('debug:: set', k, v, partialSO)
        }
        if (prevProps.scope !== this.props.scope) {
            this.setState({scope: this.props.scope})
            set('algoliaFilter', makeBrowseAlgoliaFilter2(this.props.scope, 'places', this.getUser()))
        }
        if (partialSO) {
            this.logger.debug('update from props', partialSO)
            this.setState({searchOptions: {...this.state.searchOptions, ...partialSO}})
        }


    }

    getUser() {
        return buildData(this.props.data, "users", currentUserId())
    }
}
