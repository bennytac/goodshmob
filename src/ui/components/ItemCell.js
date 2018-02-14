// @flow
import type {Node} from 'react';
import React from 'react';
import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as UI from "../UIStyles";
import type {Item} from "../../types";
import {Colors} from "../colors";
import {CachedImage} from "react-native-img-cache";


type Props = {
    item: Item,
    displayDetails?: boolean,
    children?: Node
};

type State = {
};

export default class ItemCell extends React.Component<Props, State> {


    render() {
        let item = this.props.item;
        if (!item) throw new Error("expecting item");

        let resource = item;
        let image = resource ? resource.image : undefined;

        return (
            <View style={styles.container}>
                <View style={styles.containerInner}>
                    {
                        image && <CachedImage
                        source={{uri: image}}
                        resizeMode='cover'
                        style={[styles.image, UI.STYLES.lightBorder]}/>
                    }
                    <View style={styles.containerText}>
                        <Text
                            style={styles.title}
                            numberOfLines={this.props.displayDetails ? 7 : 3}
                        >{resource.title}</Text>
                        <Text style={styles.subtitle}>{resource.subtitle}</Text>
                    </View>
                </View>
                {this.props.children}
            </View>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1
    },
    containerInner: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    image: {
        alignSelf: 'center',
        height: 80,
        width: 80,
        borderRadius: 8,
    },
    containerText: {
        flex:1,
        padding: 15
    },
    placeholder: {
        backgroundColor: Colors.greyish
    },
    title: {fontSize: 18, },
    subtitle: {fontSize: 12, color: Colors.greyish}

});
