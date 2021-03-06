// @flow

import React from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    Keyboard,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import * as actions from './actions'
import {connect} from "react-redux"
import {currentUser, currentUserId, logged} from "../../managers/CurrentUser"
import ItemBody from "./components/ItemBody"
import {buildData, getAskBackgroundColor, sanitizeActivityType, timeSinceActivity} from "../../helpers/DataUtils"
import {FullScreenLoader, MainBackground, scheduleOpacityAnimation} from "../UIComponents"
import type {Activity, ActivityType, Id, RequestState} from "../../types"
import Screen from "../components/Screen"
import {Colors} from "../colors"
import GTouchable from "../GTouchable"
import ActivityStatus from "./components/ActivityStatus"
import {component as CommentInput, CREATE_COMMENT} from '../components/CommentInput'
import {userFirstName} from "../../helpers/StringUtils"
import CommentCell from "../components/CommentCell"
import {styleMargin, stylePadding} from "../UIStyles"
import {SFP_TEXT_BOLD, SFP_TEXT_MEDIUM} from "../fonts"
import ActivityActionBar from "./components/ActivityActionBar"
import FeedSeparator from "./components/FeedSeparator"
import {mergeItemsAndPendings} from "../../helpers/ModelUtils"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {CLOSE_MODAL, displaySavingActions} from "../Nav"
import * as Api from "../../managers/Api"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MapView, {Marker} from 'react-native-maps'
import {regionFrom2} from "../components/GMap"
import i18n from "../../i18n/i18n"
import {createOpenModalLink} from "../../managers/Links"
import {GAvatar} from "../GAvatar"

type Props = {
    activityId: Id,
    activityType: ActivityType,
    navigator: any,
};

type State = {
    reqFetch?: RequestState
};

const EDIT_SAVING = "EDIT_SAVING";

@logged
@connect((state, ownProps) => ({
    data: state.data,
    pending: state.pending
}))
class ActivityDetailScreen extends Screen<Props, State> {

    state = {};

    static navigatorStyle = {
        drawUnderNavBar: true,
        navBarTransparent: true,
        navBarTranslucent: true,
        navBarBackgroundColor: Colors.dirtyWhite,
        topBarElevationShadowEnabled: false
    };

    static navigatorButtons = {
        leftButtons: [
            {
                id: CLOSE_MODAL,
                icon: require('../../img2/circleBackArrow.png'),
                disableIconTint: true,
            }
        ],
        rightButtons: []
    };

    constructor(props: Props) {
        super(props);
        props.navigator.addOnNavigatorEvent((event) => {

            if (event.type === 'NavBarButtonPress') {
                if (event.id === EDIT_SAVING) {
                    displaySavingActions(props.navigator, this.props.dispatch, this.props.activityId, this.props.activityType);
                }
            }
        });
    }


    componentDidMount() {

        this.prepareNavButton();

        this.load();
    }

    prepareNavButton() {
        let activity = this.makeActivity();
        if (activity) {
            let isMine = activity.user && activity.user.id === currentUserId();
            if (isMine) {
                this.props.navigator.setButtons({
                    ...ActivityDetailScreen.navigatorButtons,
                    rightButtons: [{
                        id: EDIT_SAVING,
                        icon: require('../../img2/moreDotsGrey.png'),
                        disableIconTint: true,
                    }]
                })
            }
        }
    }

    load() {
        Api.safeExecBlock.call(
            this,
            () => this.props.dispatch(
                actions.fetchActivity(this.props.activityId, this.props.activityType, {include: 'user,resource,target,comments,commentators,related_activities,related_activities.commentators,related_activities.target,related_activities.user'})
            ),
            'reqFetch'
        )
    }

    render() {
        let activity = this.makeActivity();

        const isAsk = activity && sanitizeActivityType(activity.type) === 'asks';


        if (!activity) {
            if (this.state.reqFetch === 'sending') return <FullScreenLoader/>
            return null
        }

        const item = activity.resource
        return (
            <MainBackground>
                <KeyboardAwareScrollView
                    contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
                    keyboardShouldPersistTaps='always'
                >
                    <View style={styles.container}>

                        { activity &&
                        <View>
                            <View>
                                {!isAsk &&
                                <GTouchable
                                    onPress={() => this.goBuy(activity)}
                                >
                                    <ItemBody
                                        item={item}
                                        navigator={this.props.navigator}
                                        onPressItem={() => this.goBuy(activity)}
                                        onPress={() => this.goBuy(activity)}
                                        showAllImages
                                    />
                                </GTouchable>}
                                {isAsk &&
                                <View style={[styles.askContent, {backgroundColor: getAskBackgroundColor(activity)}]}>
                                    <Text style={[styles.askText]}>{activity.content}</Text>
                                </View>
                                }

                            </View>

                            <View style={{width: "100%"}}>
                                <ActivityActionBar
                                    activityId={activity.id}
                                    activityType={activity.type}
                                    navigator={this.props.navigator}
                                    blackList={['comment']}
                                />

                            </View>

                            {sanitizeActivityType(_.get(item, 'type')) === 'places' && (
                                <View style={{width: "100%", height: this.state.mapOpen ? __DEVICE_WIDTH__ : 100, opacity: this.state.mapReady ? this.state.mapOpen? 1 : 0.5: 0}}>
                                    <FeedSeparator />
                                    <MapView
                                        style={{flex:1}}
                                        provider={'google'}
                                        initialRegion={regionFrom2(item.description, 2000)}
                                        showsUserLocation={true}
                                        onMapReady={event => this.setState({mapReady: true}, ()=> scheduleOpacityAnimation())}
                                        scrollEnabled={!!this.state.mapOpen}
                                        pitchEnabled={!!this.state.mapOpen}
                                        rotateEnabled={!!this.state.mapOpen}
                                        zoomEnabled={!!this.state.mapOpen}
                                        onPress={()=>this.setState({mapOpen: !this.state.mapOpen}, ()=> scheduleOpacityAnimation())}
                                    >
                                        <Marker coordinate={item.description}/>
                                    </MapView>
                                    <FeedSeparator />
                                </View>
                            )
                            }

                            <View style={{}}>
                                <FeedSeparator />
                                {
                                    this.renderActivityBlock(activity, {cardStyle: {paddingTop: 16}})
                                }
                            </View>


                            {!_.isEmpty(activity.relatedActivities) && <FlatList
                                data={activity.relatedActivities}
                                renderItem={({item}) => this.renderActivityBlock(
                                    item,
                                    {style: {...styleMargin(0, 0)}, cardStyle: {paddingTop: 8}}
                                )}
                                keyExtractor={(item, index) => item.id}
                                onScrollBeginDrag={Keyboard.dismiss}
                                ItemSeparatorComponent={()=> <View style={{margin: 6}} />}
                                ListHeaderComponent={<Text style={{
                                    fontSize: 17,
                                    margin: 15,
                                    fontFamily: SFP_TEXT_MEDIUM
                                }}>{i18n.t('detail_screen.related_activities_title')}</Text>}

                            />
                            }
                        </View>
                        }
                    </View>
                </KeyboardAwareScrollView>
            </MainBackground>
        );
    }

    renderActivityBlock(activity, {style, cardStyle}) {
        const padding = 16;
        return <ActivityStatus
            activity={activity}
            navigator={this.props.navigator}
            style={[style]}
            cardStyle={[{
                paddingHorizontal: 16,
            }, cardStyle]}
        >
            <View style={{
                ...stylePadding(padding, 0, padding, 12),
                backgroundColor: Colors.white,
            }}>
                {this.renderActivityComments(activity)}
            </View>
        </ActivityStatus>;
    }

    goBuy(activity: Activity) {

        let url = _.get(activity, 'resource.location') || _.get(activity, 'resource.url');
        if (url) {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log("Don't know how to open URI: " + url);
                }
            });
        }
    }

    renderActivityComments(activity: Activity) {

        let comments = mergeItemsAndPendings(
            activity ? activity.comments : [],
            _.filter(this.props.pending[CREATE_COMMENT], p => _.get(p, 'payload.activityId') === _.get(activity, 'id')),
            [],
            (pending) => ({
                id: pending.id,
                name: pending.payload.listName,
                content: pending.payload.content,
                createdAt: Date(pending.insertedAt),
                user: currentUser(),
                type: 'comments',
                pending: true
            })
        );

        comments= _.take(comments, 4);

        let lastComment = _.head(comments);

        if (lastComment && !lastComment.built && !lastComment.pending) lastComment = null;

        let renderEmpty = () => {
            return (
                <View style={{flex: 1,
                    flexDirection: 'row',
                    paddingTop: 8,
                    alignItems: 'center',
                }
                }>
                    <CommentInput
                        activity={activity}
                        placeholder={i18n.t("activity_screen.comments.no_comments")}
                        {...this.commentInputProps()}
                    />
                </View>
            );
        };

        const jhop = (function *() {
            yield <FeedSeparator style={{marginTop: 8, marginBottom: 8}} />;
            return null;
        })();

        let separator = () => jhop.next().value;


        const noCommentators = _.isEmpty(activity.commentators);
        const othersCommentators = _.slice(
            activity.commentators,
            lastComment ? 1 : 0,
            4);
        return (
            <GTouchable
                onPress={()=> this.displayActivityComments(activity)}>
                <View >

                    {/*empty*/}
                    {noCommentators && renderEmpty()}


                    {
                        lastComment && <View style={{paddingTop: 6}}>

                            {separator()}

                            <Text style={{fontSize: 12, fontFamily:SFP_TEXT_MEDIUM, color: Colors.black}}>
                                {i18n.t(
                                    'activity_screen.comments.has_commented',
                                    {
                                        first: userFirstName(lastComment.user),
                                        count: 0
                                    })
                                }
                                <Text style={[{color: Colors.greyish, fontSize: 11, alignSelf: 'flex-start'}]}>
                                    {"\u00a0\u00a0•\u00a0\u00a0" + _.lowerFirst(timeSinceActivity(lastComment))}
                                </Text>
                            </Text>

                            {/*comments bloc*/}
                            <View style={{marginTop: 8}}>
                                <CommentCell
                                    comment={lastComment} user={lastComment.user}
                                    textContainerStyle={{backgroundColor: 'transparent', borderWidth: 0, paddingHorizontal: 0,}}
                                    skipTime={true}
                                />
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 8,
                                }}>



                                    <CommentInput
                                        activity={activity}
                                        containerStyle={{marginLeft: 30}}
                                        placeholder={i18n.t("activity_comments_screen.add_comment_placeholder")}
                                        {...this.commentInputProps()}
                                    />

                                </View>
                            </View>
                        </View>}

                    {
                        !_.isEmpty(othersCommentators) && <View>
                            {separator()}
                            {
                                this.renderOtherCommentators(othersCommentators, !!lastComment)
                            }
                        </View>
                    }
                </View>
            </GTouchable>);
    }

    commentInputProps() {
        return {
            height:30,
            inputStyle:{fontSize: 15},
            button: <MaterialIcons name="send" size={26} color={Colors.greyishBrown} />,
            disableOffline: true
            // inputContainerStyle: {
            // borderBottomWidth: 0,
            // borderTopWidth: 0,
            // borderLeftWidth: 0,
            // borderRightWidth: 0,
            // paddingHorizontal: 0,
            // borderColor: Colors.greying,
            // borderWidth: 1,
            // },
            // buttonStyle: {paddingRight: 0}
        };
    }

    renderOtherCommentators(othersCommentators, asWell: boolean = true) {
        return (
            <View style={{marginTop: 8}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

                    <Text style={{flex:1, fontSize: 12, alignItems: 'center', lineHeight: 22, color: Colors.greyishBrown, marginLeft: 0}}>
                        {/*{__IS_IOS__ && this.renderMedals(othersCommentators)}*/}
                        {i18n.t(
                            `activity_screen.comments.${asWell ? 'has_commented_this_as_well' : 'has_commented_this'}`,
                            {
                                first: userFirstName(_.nth(othersCommentators, 0)),
                                second: userFirstName(_.nth(othersCommentators, 1)),
                                count: othersCommentators.length - 1
                            }) + ". "
                        }
                        <Text style={{paddingLeft: 6, marginTop: 8, fontSize: 12, fontFamily: SFP_TEXT_BOLD, color: Colors.black}}>
                            {i18n.t('activity_screen.comments.see_theirs_comments', {count: othersCommentators.length})}
                        </Text>
                    </Text>

                </View>

            </View>
        );
    }

    renderMedals(othersCommentators) {
        const size = 20;
        const shift = 0.5;
        const n = othersCommentators.length;
        const width  = size + (size * shift) * Math.max(n-1, 0) + 5;
        return <View style={{flexDirection: 'row', marginRight: 10, height: 18}}>
            {
                othersCommentators.map((user, i) => user && <GAvatar person={user} key={`med-${i}`} size={size} style={{
                        // position: 'absolute',
                        // left: size * shift * i,
                        // zIndex: (10 - i),
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: Colors.white
                    }} />
                )
            }
        </View>;
    }

    displayActivityComments(activity: Activity) {
        this.props.navigator.push({
            screen: 'goodsh.CommentsScreen', // unique ID registered with Navigation.registerScreen
            title: i18n.t('comments_screen.title'), // navigation bar title of the pushed screen (optional)
            passProps: {
                activityId: activity.id,
                activityType: activity.type
            },
        });
    }

    makeActivity() {
        return buildData(this.props.data, this.props.activityType, this.props.activityId);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        top: "50%",
        bottom: "50%",
    },
    backButtonWrapper: {
        position: 'absolute',
        left: 10,
        top: 20
    },
    askContent: {
        width: "100%",
        minHeight: 64,
        alignItems: 'center',
        justifyContent: 'center'
    },
    askText: {
        fontSize: 30,
        lineHeight: 35,
        color: Colors.white,
        textAlign: 'center',
        fontFamily: SFP_TEXT_BOLD,
        padding: 50
    },
});

let screen = ActivityDetailScreen;

export {screen};

export function createDetailsLink(activityId: Id, activityType: ActivityType) {
    return createOpenModalLink("goodsh.ActivityDetailScreen", null, {activityId, activityType})
}
