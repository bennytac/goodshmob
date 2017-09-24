// @flow

import * as Api from "../utils/Api"
import * as types from './actionTypes';
import * as Util from "../utils/ModelUtils"
import { CALL_API } from 'redux-api-middleware'

export function loadFriend(userId: string) {
    let call = new Api.Call()
        .withRoute(`users/${userId}/friends`)
        .withQuery({
            page: 1,
            per_page: 10,
            include: "creator"
        });

    return Api.createSimpleApiCall2(call.getUrl(), types.LOAD_FRIENDS);
}

export function loadMoreFriend(nextUrl:string) {
    let call = new Api.Call.parse(nextUrl)
        .withQuery({include: "user,resource,target"});

    return Api.createSimpleApiCall2(call.getUrl(), types.LOAD_MORE_FRIENDS);
}
