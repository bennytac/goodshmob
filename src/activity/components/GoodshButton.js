// @flow

import React from 'react';
import {Image, Linking, Share, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import * as UI from "../../screens/UIStyles";
import * as activityAction from "../actions"
import type {Activity} from "../../types"
import {connect} from "react-redux";



type Props = {
    activity: Activity
};

type State = {
};


class GoodshButton extends React.Component<Props, State>  {

    render() {
        let activity = this.getActivity();
        let likesCount = activity.meta ? activity.meta["likes-count"] : 0;
        let liked = activity.meta && activity.meta["liked"];
        let goodshButtonColor = (this.isLiking() || this.isUnliking()) ? UI.Colors.grey1 : liked ? UI.Colors.green : UI.Colors.white;

        return (
            <TouchableHighlight
                onPress={this.onGoodshPressed.bind(this)}
                style={
                    {
                        backgroundColor : "white",
                        width: 60,
                        height: 30,
                        position: 'absolute',
                        bottom: 0,
                        borderRadius: 5,
                        padding: 2.5,
                    }
                }>

                <View
                    style={[styles.goodshButton, {backgroundColor : goodshButtonColor}]}
                >
                    <Image source={require('../../img/mini-g-number.png')} resizeMode="contain"
                           style={{
                               width: 20,
                               height: 20,
                           }}
                    />
                    {!!likesCount && <Text style={{fontSize: 12, marginLeft: 3}}>{likesCount}</Text>}

                </View>
            </TouchableHighlight>
        )
    }


    getActivity() {
        return this.props.activity;
        //return buildNonNullData(this.props.data, this.props.activityType, this.props.activityId);
    }

    onGoodshPressed() {
        if (this.isLiking() || this.isUnliking()) return;

        let activity = this.getActivity();
        let {id, type} = activity;
        let alreadyLiked = activity.meta["liked"];
        let action = alreadyLiked ? activityAction.unlike : activityAction.like;
        this.props.dispatch(action(id, type));
    }

    isLiking() {
        //FIXME: use local state
        return false;//!!this.props.request.isLoading[types.LIKE.forId(this.props.activityId)];
    }

    isUnliking() {
        //FIXME: use local state
        return false;//!!this.props.request.isLoading[types.UNLIKE.forId(this.props.activityId)];
    }

}
// const mapStateToProps = (state, ownProps) => ({
//     data: state.data,
// });


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    goodshButton: {
        width: "100%",
        height: "100%",
        borderRadius: 5,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        alignItems: 'center',
        padding: 2.5,
    }
});


export default connect()(GoodshButton);
