// @flow

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import * as Model from "../../models/index"
import i18n from '../../i18n/i18n'
import * as TimeUtils from '../../utils/TimeUtils'
import * as UI from "../../screens/UIStyles";
import * as activityAction from "../actions"
import {connect} from "react-redux";

class ActivityCell extends React.Component {

    render() {
        let activity = this.getActivity();

        //let activity: Model.Activity = this.props.activity;
        let user: Model.User = activity.user;
        let resource = activity.resource;
        let target: Model.List = activity.target;
        let image = resource ? resource.image : undefined;

        let cardMargin = 12;
        let targetName;
        if (target) {
            let count = target.meta ? target.meta["savings-count"] : 0;
            targetName = target.name;
            if (count) targetName += " (" + count + ")"
        }
        let likesCount = activity.meta ? activity.meta["likes-count"] : 0;

        return (
            <View style={{
                backgroundColor: "transparent",
                marginTop: 10,
                marginBottom: 10
            }}>
                <View style={{margin: cardMargin, marginBottom: 8}}>

                    <View style={{flex: 1, flexDirection: 'row', marginBottom: 8}}>
                        <Image
                            source={{uri: user.image}}
                            style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15
                            }}
                        />
                        <View style={{flex: 1, marginLeft: 8}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontSize: 11,
                                        color: UI.Colors.blue
                                    }}>{Model.User.fullname(user)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity><Text style={{
                                    fontSize: 9,
                                    color: UI.Colors.grey1,
                                    marginLeft: 4
                                }}>{TimeUtils.timeSince(Date.parse(activity.createdAt))}</Text></TouchableOpacity>
                            </View>
                            {!!target &&
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{
                                        fontSize: 9,
                                        color: UI.Colors.grey1,
                                        marginRight: 4
                                    }}>{i18n.t("activity_item.header.in")}</Text>
                                    <TouchableOpacity>
                                        <Text
                                            style={{fontSize: 14, color: UI.Colors.blue}}>
                                            {targetName}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {
                                    this.renderFollowButton(target)
                                }


                            </View>
                            }
                        </View>

                    </View>

                    <Text style={{fontSize: 14}}>{activity.description}</Text>
                </View>
                {/*card*/}
                <View style={{
                    backgroundColor: "white",
                    marginLeft: cardMargin,
                    marginRight: cardMargin,
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowOffset: {width: 2, height: 2},
                    shadowRadius: 2,
                }}>


                    {this.renderGoodshButton(image, likesCount, this.props.onPressItem)}


                    <View style={{padding: 15}}>
                        <Text style={{fontSize: 18, fontFamily: 'Chivo-Light', }}>{resource.title}</Text>
                        <Text style={{fontSize: 12, color: UI.Colors.grey2}}>{resource.subtitle}</Text>
                    </View>

                    <View style={{width: "100%", height: StyleSheet.hairlineWidth, backgroundColor: UI.Colors.grey1}}/>


                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>

                        {this.renderButton(require('../../img/comment.png'), i18n.t("activity_item.buttons.comment"))}
                        {this.renderButton(require('../../img/send.png'), i18n.t("activity_item.buttons.share"))}
                        {this.renderButton(require('../../img/save-icon.png'), i18n.t("activity_item.buttons.save"))}
                        {this.renderButton(require('../../img/buy-icon.png'), i18n.t("activity_item.buttons.buy"))}

                    </View>

                </View>

            </View>
        )
    }

    getActivity() {
        return this.props.activity.all[this.props.activityId];
    }

    renderFollowButton(target) {
        return target.primary ?
            <TouchableOpacity>
                <Text style={{
                    fontSize: 9,
                    fontFamily: 'Chivo',
                    color: UI.Colors.grey1,
                    padding: 5,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    borderColor: UI.Colors.grey1
                }}>{i18n.t("activity_item.buttons.unfollow_list")}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
                style={{backgroundColor: "white", padding: 5, borderRadius: 5}}>
                <Text style={{
                    fontSize: 9,
                    fontFamily: 'Chivo',
                    color: UI.Colors.blue
                }}>{i18n.t("activity_item.buttons.follow_list")}</Text>
            </TouchableOpacity>;
    }

    renderGoodshButton(image, likesCount, onActivityPressed) {
        let activity = this.getActivity();
        let liked = activity.meta && activity.meta["liked"];

        let goodshButtonColor = (this.isLiking() || this.isUnliking()) ? UI.Colors.grey1 : liked ? UI.Colors.green : UI.Colors.white;
        return <View style={{alignItems: 'center',}}>
            <TouchableHighlight
                onPress={onActivityPressed}
                style={{
                alignSelf: 'center',
                height: 165,
                width: "100%",
            }}>
                <Image
                    source={{uri: image}}
                    style={{
                        alignSelf: 'center',
                        height: 150,
                        width: "100%",
                    }}
                />
            </TouchableHighlight>
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
                    style={
                    {
                        width: "100%",
                        height: "100%",
                        borderRadius: 5,
                        backgroundColor : goodshButtonColor,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderWidth: 0.5,
                        borderColor: '#d6d7da',
                        alignItems: 'center',
                        padding: 2.5,
                    }
                }>
                    <Image source={require('../../img/mini-g-number.png')} resizeMode="contain"
                           style={{
                               width: 20,
                               height: 20,
                           }}
                    />
                    {!!likesCount && <Text style={{fontSize: 12, marginLeft: 3}}>{likesCount}</Text>}

                </View>
            </TouchableHighlight>

        </View>
    }


    renderButton(img, text) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 6}}>
            <TouchableOpacity>
                <Image source={img} style={{width: 16, height: 16, margin: 8, resizeMode: 'contain'}}/>
                <Text style={{fontFamily: 'Chivo', textAlign: 'center', fontSize: 10}}>{text}</Text>
            </TouchableOpacity>
        </View>;
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
        return this.isRequesting(this.props.activity.like);
    }

    isUnliking() {
        return this.isRequesting(this.props.activity.unlike);
    }

    isRequesting(method) {
        let lastLikeRequest = method && method[this.props.activityId];
        return lastLikeRequest && lastLikeRequest.requesting;
    }
}
const mapStateToProps = (state, ownProps) => ({
    activity: state.activity
});
export default connect(mapStateToProps)(ActivityCell);