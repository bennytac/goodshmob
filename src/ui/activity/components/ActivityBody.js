// @flow
import React from 'react';
import {Image, Linking, Share, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import * as UI from "../../UIStyles";
import {connect} from "react-redux";
import type {Activity, i18Key, User} from "../../../types"
import {Colors} from "../../colors";
import ActionRights from "../../rights";
import Button from 'apsl-react-native-button';
import {fullName} from "../../../helpers/StringUtils";
import {SFP_TEXT_ITALIC, SFP_TEXT_MEDIUM} from "../../fonts";
import {Avatar} from "../../UIComponents";

type Props = {
    activity: Activity,
    onPressItem: (any) => void,
    noGoodshButton?: boolean
};

type State = {
};

@connect()
export default class ActivityBody extends React.Component<Props, State> {

    render() {
        const {activity, noGoodshButton} = this.props;
        let resource = activity.resource;

        return (
            <View>
                {/*Image And Button*/}
                {this.renderImage()}



                {resource && (
                    <View style={{padding: 15, }}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <Text style={[styles.title]}>{resource.title}</Text>
                                <Text style={[styles.subtitle]}>{resource.subtitle}</Text>


                                {__IS_LOCAL__ &&
                                <Text style={UI.TEXT_LESS_IMPORTANT}>{activity.type + " " + activity.id}</Text>}
                            </View>
                            {this.renderBuyButton(activity)}
                        </View>
                        {!!activity.description && <Text style={[styles.description]}>{activity.description}</Text>}

                        {this.renderTags()}
                    </View>
                )

                }

            </View>
        )
    }


    renderTags() {
        let activity, target, targetName: string, key: i18Key, press: () => void;
        if (!(activity = this.props.activity)) return null;
        if (activity.type === 'asks') throw 'no ask';

        // const {skipLineup, withFollowButton} = this.props;
        // if (skipLineup) return null;


        if (!(target = activity.target)) return null;

        if (target.type === 'lists') {
            let count = target.meta ? target.meta["savings-count"] : 0;
            targetName = target.name;
            if (count) targetName += " (" + count + ")";

            key = "activity_item.header.in";
            press = () => this.seeList(target);
        }
        else if (target.type === 'users') {
            targetName = target.firstName + " " + target.lastName;
            key = "activity_item.header.to";
            press = () => this.seeUser(target);

            //new spec. todo clean
            return null;
        }

        const color = Colors.greyish;

        const pa = 16;
        return <View style={{flexDirection:'row', marginTop: 10}}>
            <TouchableOpacity onPress={press}>
                <Text
                    style={[{paddingLeft: pa, paddingRight: pa,
                        color,
                        alignSelf: 'stretch',
                        borderRadius: 13,
                        height: 26,
                        lineHeight: 26,
                        // padding: 2,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: color,
                        fontFamily: SFP_TEXT_ITALIC,
                        fontSize: 13

                    }]}>
                    {i18n.t(key) + ' ' + targetName}
                </Text>
            </TouchableOpacity>
        </View>

    }



    seeList(lineup: List) {
        this.props.navigator.push({
            screen: 'goodsh.LineupScreen', // unique ID registered with Navigation.registerScreen
            passProps: {
                lineupId: lineup.id,
            },
        });
    }

    seeUser(user: User) {
        this.props.navigator.push({
            screen: 'goodsh.UserScreen', // unique ID registered with Navigation.registerScreen
            title: fullName(user),
            passProps: {
                userId: user.id,
            },
        });
    }

    renderBuyButton(activity:Activity) {
        return new ActionRights(activity).canBuy() && <Button
            onPress={() => {
                this.execBuy(activity)
            }}
            style={[{height: 33, borderRadius: 4, backgroundColor: Colors.blue, borderWidth: 0}]}
        >
            <Text style={[UI.SIDE_MARGINS(10), {color: Colors.white, fontFamily: SFP_TEXT_MEDIUM, fontSize: 14}]}>
                #Buy
            </Text>
        </Button>;
    }


    execBuy(activity: Activity) {
        let url = _.get(activity, 'resource.url');
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    }

    renderImage() {

        const {activity} = this.props;
        let resource = activity.resource;
        let image = resource ? resource.image : undefined;
        let imageHeight = 288;
        if (activity.type === 'asks'){

            let content = activity.content;
            if (__IS_LOCAL__) content += ` (id=${activity.id.substr(0, 5)})`;
            return <Text style={[{margin: 12, fontSize: 30}]}>{content}</Text>;
        }


        let target = activity.target;
        let postedToUser = target && target.type === 'users' && target;
        // const {skipLineup, withFollowButton} = this.props;
        // if (skipLineup) return null;




        // image = null;
        const dim = 16;
        return <View style={{
            flex:1,
            alignSelf: 'center',
            height: imageHeight,
            width: "100%",
        }}>

            <Image
                source={image ? {uri: image} : require('../../../img/goodsh_placeholder.png')}
                resizeMode={image ? 'contain' : 'cover'}
                style={{
                    alignSelf: 'center',
                    height: imageHeight,
                    width: "100%",
                }}
                defaultSource={{}}
            />

            <View style={{position: 'absolute', top: -17, left: 10, flexDirection: 'row', }}>
                <TouchableOpacity onPress={()=>this.seeUser(activity.user)}>
                    <Avatar user={activity.user} style={{dim: 34}}/>
                </TouchableOpacity>
                {postedToUser && <Image style={[UI.SIDE_MARGINS(8), {width: dim, height: dim, transform: [{translateY: -10}, { rotate: '20deg'}]}]} source={require('../../../img2/sendIcon.png')}/>}
            </View>
            {postedToUser && <View style={{position: 'absolute', top: -17, right: 10, flexDirection: 'row'}}>

                <Image style={[UI.SIDE_MARGINS(8), {width: dim, height: dim, transform: [{translateY: -10}, { rotate: '70deg'}]}]} source={require('../../../img2/sendIcon.png')}/>
                <TouchableOpacity onPress={()=>this.seeUser(postedToUser)}>
                    <Avatar user={postedToUser} style={{dim: 34}}/>
                </TouchableOpacity>
            </View>}


        </View>
    }
}


const styles = StyleSheet.create({
    title: {fontSize: 20, color: Colors.black},
    subtitle: {fontSize: 14, color: Colors.greyish},
    description: {fontSize: 14, fontFamily: SFP_TEXT_ITALIC, color: Colors.brownishGrey},

});


