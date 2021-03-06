// @flow


import type {Activity, ActivityType, Id, Lineup, RNNNavigator, SearchToken, User} from "../types"
import StoreManager from "../managers/StoreManager"
import i18n from '../i18n/i18n'
import BottomSheet from 'react-native-bottomsheet'
import {unsaveOnce} from "./activity/components/ActivityActionBar"
import {sanitizeActivityType} from "../helpers/DataUtils"
import {Alert, View} from "react-native"
import type {Description, Visibility} from "./screens/save"
import * as Api from "../managers/Api"
import ApiAction from "../helpers/ApiAction"
import Config from "react-native-config"
import ItemCell from "./components/ItemCell"
import React from "react"
import LineupHorizontal from "./components/LineupHorizontal"
import {deleteLineup, followLineupPending, unfollowLineupPending} from "./lineup/actions"
import {GLineupAction, L_DELETE, L_FOLLOW, L_RENAME, L_SHARE, L_UNFOLLOW, LineupRights} from "./lineupRights"
import {currentUserId} from "../managers/CurrentUser"
import {buildLineupUrlExternal, buildLineupUrlInternal} from "../managers/Links"

export const CLOSE_MODAL = 'close_modal';

//if on the right, crash on android (something related to: "frozen", "enabled")

export const CANCELABLE_MODAL2 = {
    leftButtons: [
        {
            id: CLOSE_MODAL,
            icon: require('../img2/leftBackArrowGrey.png')
        }
    ],
    rightButtons: []
}
export const CANCELABLE_MODAL = CANCELABLE_MODAL2

export const CANCELABLE_SEARCH_MODAL = () => ({
    rightButtons: __IS_ANDROID__ ? [] : [
        {
            id: CLOSE_MODAL,
            title: i18n.t("actions.cancel")

        }
    ],
    leftButtons: []
});

export function startAddItem(navigator: *, defaultLineup: Id | Lineup, options: any = {}) {
    console.info(`starting to add item in`, defaultLineup)

    let defaultLineupId

    if (_.isString(defaultLineup)) {
        defaultLineupId = defaultLineup
        defaultLineup = null
    }
    else {
        defaultLineupId = defaultLineup.id
    }

    let cancel = () => navigator.dismissAllModals()


    navigator.showModal({
        screen: 'goodsh.SearchItems', // unique ID registered with Navigation.registerScreen
        navigatorButtons: CANCELABLE_MODAL,
        title: i18n.t('search_item_screen.title'),
        passProps: {
            defaultLineup,
            onCancel: cancel,
            defaultLineupId,
            defaultLineup,
            ...options,
        },
    })
}

export function seeList(navigator: RNNNavigator, lineup: Lineup) {

    navigator.showModal({
        screen: 'goodsh.LineupScreen', // unique ID registered with Navigation.registerScreen
        passProps: {
            lineup
        },
        navigatorButtons: CANCELABLE_MODAL
    });
}

export function seeUser(navigator: RNNNavigator, user: User) {
    navigator.showModal({
        screen: 'goodsh.UserScreen', // unique ID registered with Navigation.registerScreen
        // title: fullName(user),
        passProps: {
            userId: user.id,
            user
        },
        navigatorButtons: CANCELABLE_MODAL
    });
}

export function seeComments(navigator: RNNNavigator, activity: Activity) {
    navigator.showModal({
        screen: 'goodsh.CommentsScreen', // unique ID registered with Navigation.registerScreen
        // title: fullName(user),
        passProps: {
            activityId: activity.id,
            activityType: activity.type,
            autoFocus: true
        },
        navigatorButtons: CANCELABLE_MODAL
    });
}

export function seeActivityDetails(navigator: RNNNavigator, activity: Activity) {
    navigator.showModal({
        screen: 'goodsh.ActivityDetailScreen',
        passProps: {activityId: activity.id, activityType: activity.type},
    });
}


//FIXME: check for rights (if activity not in cache, display something, request + loader)
export function displaySavingActions(navigator: RNNNavigator, dispatch: *, activityId: Id, activityType: ActivityType) {
    BottomSheet.showBottomSheetWithOptions({
        options: [
            i18n.t("actions.change_description"),
            i18n.t("actions.move"),
            i18n.t("actions.delete"),
            i18n.t("actions.cancel")
        ],
        title: i18n.t("actions.edit_saving_menu"),
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
    }, (value) => {
        switch (value) {
            case 0:

                navigator.showModal({
                    screen: 'goodsh.ChangeDescriptionScreen',
                    animationType: 'none',
                    passProps: {
                        activityId,
                        activityType,
                    }
                });
                break;
            case 1:
                navigator.showModal({
                    screen: 'goodsh.MoveInScreen',
                    title: i18n.t('create_list_controller.choose_another_list'),
                    passProps: {
                        savingId: activityId,
                    },
                    navigatorButtons: CANCELABLE_MODAL,
                });
                break;
            case 2:
                let activity = StoreManager.buildData(activityType, activityId);
                unsaveOnce(activity, dispatch);
                break;
        }
    });
}




export function displaySavingActions2(
    navigator: RNNNavigator, dispatch: *, activityId: Id, activityType: ActivityType) {

    let menuAction : LineupMenuAction[] =
        _.filter(LineupRights.getActions(lineup), filter)
            .map(a => MENU_ACTIONS.get(a))
            .filter(a => !!a)

    BottomSheet.showBottomSheetWithOptions({
            options: [
                ...menuAction.map(a => a.label),
                i18n.t("actions.cancel")
            ],
            title: lineup.name,
            // dark: true,
            // destructiveButtonIndex: 2,
            cancelButtonIndex: menuAction.length,
        }, (value) => {
            const lineupMenuAction = menuAction[value];
            if (lineupMenuAction) {
                lineupMenuAction.handler({navigator, dispatch, lineup})
            }
        }
    );
}


let createShareIntent2 = function (what, url, subject, message) {
    let prepareIntentContent = (title, url) => {
        let intent = {title}
        let msg
        if (__IS_ANDROID__) msg = url + '\n\n' + message
        if (__IS_IOS__) {
            msg = message
            intent.url = url
        }
        intent.message = msg
        return intent
    }

    const content: any = prepareIntentContent(what, url)


    const options = {
        // Android only:
        dialogTitle: subject,
        //IOS only
        subject: subject,
    }
    return {content, options}
}
let createShareIntent = (what, url) => {

    return createShareIntent2(
        what,
        url,
        i18n.t('send_object', {what}),
        i18n.t('send_message'))
}
let createInviteIntent = (what, url) => {

    return createShareIntent2(
        what,
        url,
        i18n.t('invite_object', {what}),
        i18n.t('invite_message', {what}))
}

let showShareScreen = (navigator, params) => {
    navigator.showModal({
        screen: 'goodsh.ShareScreen', // unique ID registered with Navigation.registerScreen
        animationType: 'none',
        passProps: {
            onClickClose: () => navigator.dismissModal({animationType: 'none',}),
            ...params,
        },
        navigatorStyle: {navBarHidden: true},
    });
};

export function displayShareItem(navigator: RNNNavigator, activity: Activity) {

    const {resource} = activity;

    const url = `${Config.SERVER_URL + sanitizeActivityType(activity.type)}/${activity.id}`;

    showShareScreen(navigator,
        {
            renderSharedObject: ()=>(<View style={{height: 100, }}><ItemCell item={resource}/></View>),
            sendAction: (friend: User, description?: string) => {
                return sendItem(resource.id, friend, description).createActionDispatchee(SEND_ITEM)
            },
            createShareIntent: () => createShareIntent(resource.title, url),
            urlForClipboard: ()=> url,
        }
    );
}

export function displayShareLineup({navigator, lineup}: {navigator: RNNNavigator, lineup: Lineup}) {
    let userId = _.get(lineup, 'user.id');
    let lineupId = _.get(lineup, 'id');
    if (!userId || !lineupId) return; //TODO: error

    const url = `${Config.SERVER_URL}lists/${lineupId}`;

    showShareScreen(navigator,
        {
            renderSharedObject: () => (
                <LineupHorizontal
                    lineup={lineup}
                    style={{height: 100}}
                />),
            sendAction: null,
            createShareIntent: () => createShareIntent(lineup.name, url),
            urlForClipboard: ()=> url,
            title: i18n.t("actions.share_list")
        }
    );
}

export function displayInvitetoContributeToLineup({navigator, lineup}: {navigator: RNNNavigator, lineup: Lineup}) {
    let userId = _.get(lineup, 'user.id');
    let lineupId = _.get(lineup, 'id');
    if (!userId || !lineupId) return; //TODO: error

    //const url = `${Config.SERVER_URL}lists/${lineupId}?invitedBy=${currentUserId()}`;
    const url = buildLineupUrlExternal(lineup, {"invitedBy": currentUserId()})


    showShareScreen(navigator,
        {
            renderSharedObject: () => (
                <LineupHorizontal
                    lineup={lineup}
                    style={{height: 100}}
                />
            ),
            sendAction: null,
            createShareIntent: () => createInviteIntent(lineup.name, url),
            urlForClipboard: ()=> url,
            title: i18n.t("invite_lineup_title")
        }
    );
}

//TODO: move this somewhere
const SEND_ITEM = ApiAction.create("send_item", "add a note to an item");
function sendItem(itemId: Id, user: User, description?: Description = "", privacy?: Visibility = 0){

    let body = {
        sending: {
            receiver_id: user.id,
            description,
            privacy
        }
    };

    return new Api.Call().withMethod('POST')
        .withRoute(`items/${itemId}/sendings`)
        .withBody(body)
        .addQuery({
            include: "*.*"
        });
}


export function displayHomeSearch(navigator: RNNNavigator, token: SearchToken) {

    navigator.showModal({
        screen: 'goodsh.HomeSearchScreen',
        // animationType: 'none',
        title: i18n.t('search.deep'),
        backButtonHidden: true,
        passProps: {
            onClickClose: () => navigator.dismissModal(),
            token
        },
        navigatorButtons: CANCELABLE_MODAL,
    });
}

export function displayChangeTitle({navigator, lineup}: {navigator: RNNNavigator, lineup: Lineup}) {
    let {id, name} = lineup;

    navigator.showModal({
        screen: 'goodsh.ChangeLineupName',
        animationType: 'none',
        passProps: {
            lineupId: id,
            initialLineupName: name
        }
    });
}

//TODO: restore destuctive button index
type LineupMenuAction = {
    label: string,
    handler: LineupActionParams => void,
}

export type LineupActionParams = {
    dispatch: any,
    navigator: RNNNavigator,
    lineup: Lineup
}
const MENU_ACTIONS = new Map([
    [L_RENAME, {
        label: i18n.t("actions.change_title"),
        handler: displayChangeTitle
    }],

    [L_SHARE, {
        label: i18n.t("actions.share_list"),
        handler: displayShareLineup
    }],
    [L_DELETE, {
        label: i18n.t("actions.delete"),
        handler: deleteLineup
    }],
    [L_UNFOLLOW, {
        label: i18n.t("actions.unfollow"),
        handler: ({dispatch, lineup}) => unfollowLineupPending(dispatch, lineup)
    }],
    [L_FOLLOW, {
        label: i18n.t("actions.follow"),
        handler: ({dispatch, lineup}) => followLineupPending(dispatch, lineup)
    }]
])

export function displayLineupActionMenu(
    navigator: RNNNavigator,
    dispatch: any,
    lineup: Lineup,
    actions: GLineupAction[],
) {

    let menuAction : LineupMenuAction[] = _.compact(actions.map(a => MENU_ACTIONS.get(a)))

    BottomSheet.showBottomSheetWithOptions({
            options: [
                ...menuAction.map(a => a.label),
                i18n.t("actions.cancel")
            ],
            title: lineup.name,
            // dark: true,
            // destructiveButtonIndex: 2,
            cancelButtonIndex: menuAction.length,
        }, (value) => {
            const lineupMenuAction = menuAction[value];
            if (lineupMenuAction) {
                lineupMenuAction.handler({navigator, dispatch, lineup})
            }
        }
    );
}



export function openUserSheet(navigator: RNNNavigator, user: User) {
    navigator.showModal({
        screen: 'goodsh.UserSheet',
        animationType: 'none',
        passProps: {
            user: user,
            userId: user.id
        }
    })
}


