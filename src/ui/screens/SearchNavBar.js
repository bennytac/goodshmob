import React, {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {TabBar, TabViewAnimated, TabViewPagerPan} from 'react-native-tab-view';

import {SearchBar} from 'react-native-elements'

import type {SearchToken} from "../../types";
import {NavStyles} from "../UIStyles";
import {Navigation} from 'react-native-navigation';
import {Colors} from "../colors";
import GSearchBar from "../GSearchBar";

type NavProps = {
    onChangeText: (token: string) => void,
    initialInput?: ?SearchToken,
    placeholder?: string,
    navigator: any
};

type NavState = {
    input:? string,
};

export const DEEPLINK_SEARCH_TEXT_CHANGED = 'DEEPLINK_SEARCH_TEXT_CHANGED';
export const DEEPLINK_SEARCH_SUBMITED = 'DEEPLINK_SEARCH_SUBMITED';
export const DEEPLINK_SEARCH_CLOSE = 'DEEPLINK_SEARCH_CLOSE';

//connect -> redux
export default class SearchNavBar extends Component<NavProps, NavState> {

    state = {
        input: null,
        placeholder: 'what ?'
    };

    constructor(props) {
        super(props);
        this.state = {input: props.initialInput, placeholder: props.placeholder}
    }


    render() {

        return (
            <GSearchBar
                autoFocus
                // lightTheme
                onChangeText={this.onChangeText.bind(this)}
                onSubmitEditing={this.submit.bind(this)}
                onClearText={this.onClearText.bind(this)}
                placeholder={this.state.placeholder}
                clearIcon={!!this.state.input && {color: '#86939e'}}
                // containerStyle={SEARCH_STYLES.searchContainer}
                // inputStyle={SEARCH_STYLES.searchInput}
                // autoCapitalize='none'
                // autoCorrect={false}
                // returnKeyType={'search'}
                value={this.state.input}
            />
        );

    }

    submit() {
        Navigation.handleDeepLink({
            link: DEEPLINK_SEARCH_SUBMITED,
        });
    }

    onChangeText(input: string) {
        this.setState({input});
        //because function props are not currently allowed by RNN

        //this.props.onChangeText(input);
        //become->
        Navigation.handleDeepLink({
            link: DEEPLINK_SEARCH_TEXT_CHANGED,
            payload: input
        });
    }

    onClearText() {
        Navigation.handleDeepLink({
            link: DEEPLINK_SEARCH_CLOSE
        });
    }

    isSearching() {
        return this.state.isSearching;
    }
}


