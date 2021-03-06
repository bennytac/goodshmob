// @flow

import React from 'react'
import {Image, Linking, Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Colors} from "../../colors"

type Props = {
    vMargin?: number,
    style?:*
};

type State = {
};
export default class FeedSeparator extends React.Component<Props, State> {
    render() {
        return <View style={[styles.sep, this.props.style]}/>;
    }
}

const styles = StyleSheet.create({
    sep: {
        width: "100%", height: StyleSheet.hairlineWidth, backgroundColor: Colors.greyish
    }
});
