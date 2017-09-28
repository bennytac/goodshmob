// @flow

import URL from "url-parse"
import qs from "querystringify"
import * as Util from "./ModelUtils";
import { CALL_API } from 'redux-api-middleware'
import { API_SYMBOL } from '../middleware/apiMiddleware'

let client, uid, accessToken;

export const API_END_POINT = "https://goodshitapp-staging.herokuapp.com/";

export function headers() {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    //TODO: find nicer syntax
    if (client) headers['Client'] = client;
    if (uid) headers['Uid'] = uid;
    if (accessToken) headers['Access-Token'] = accessToken;
    return headers;
}

export function submit(url, method, body) {
    let options = Object.assign({
        method: method,
        headers: headers()
    }, body ? {body: JSON.stringify(body)} : null);

    console.debug(`sending request url=${url}, options: ${JSON.stringify(options)}`);
    return fetch(url, options);
}

export class Call {

    url: URL = new URL(API_END_POINT);
    body: any;
    method: string;

    withRoute(pathname:string) {
        this.url = this.url.set('pathname', pathname);
        return this;
    }

    withQuery(query: any) {
        let q = qs.parse(this.url.query);
        let newVar = Object.assign({}, q || {}, query);
        this.url.set('query', newVar);
        return this;
    }

    withMethod(method:string): Call {
        this.method = method;
        return this;
    }

    static parse(url): Call {
        let result = new Call();
        result.url = new URL(url);
        return result;
    }

    exec() {
        if (!this.method) throw new Error("call need a method");
        return xhr(this.url.toString(), this.method, this.body);
    }

    disptachForAction(apiAction: ApiAction) {
        return {
            [API_SYMBOL]: {
                call: this,
                apiAction
            }
        };
    }

    xhr(route, verb, body) {

        return submit(route, verb, body)
            .then( resp => {

                let json = resp.json();
                if (resp.ok) return json;
                return json.then(err => {throw err});
            });
    };
}



//TODO: this is shit
export function credentials(a, c, u) {
    console.info(`credentials found: access-token=${a}, client=${c}, uid=${u}`);
    accessToken = a;
    client = c;
    uid = u;

}


export function composeName(actionName: string, apiType: string): string {
    return `${actionName}_${apiType}`;
}

export class ApiAction {

    actionName: string;

    constructor(actionName: string) {
        this.actionName = actionName;

    }

    success() {
        return this.forType("success");
    }

    request() {
        return this.forType("request");
    }

    failure() {
        return this.forType("failure");
    }

    forType(apiType: string) {
        return composeName(this.actionName, apiType);
    }

    name() {
        return this.actionName;
    }
}

export function initialListState() {
    return {
        list: [],
        links: {},
        hasMore: false
    };
}

export const reduceList = function (state, action, desc) {
    switch (action.type) {
        case desc.fetchFirst.success():
        case desc.fetchMore.success():

            let currentList = state.list.asMutable();
            let links = {};

            let payload = action.payload;

            if (currentList.length === 0 || action.type === desc.fetchMore.success()) {
                links.next = payload.links ? payload.links.next : null;
            }

            let newList = payload.data.map((f) => {
                let {id, type} = f;
                return {id, type};
            });

            new Util.Merge(currentList, newList)
                .withHasLess(true)
                .merge();


            state = state.merge({
                list: currentList,
                links,
                hasMore: newList.length > 0 && links && links.next
            }, {deep: true});

    }
    return state;
};