// @flow

import type {Store} from 'redux'
import {buildData} from "../helpers/DataUtils"
import type {Id, ms, User} from "../types"
import Scope from "./Scope"
import watch from 'redux-watch'
import EventBus from 'eventbusjs'
import {CURRENT_USER_ID_CHANGE} from "./ManagerUtils"


class CurrentUser {

    store: Store<*,*>;

    init(store: Store<*,*>) {
        this.store = store;

        let w = watch(store.getState, 'auth.currentUserId');
        store.subscribe(w((newVal, oldVal, objectPath) => {
            console.info(`auth: currentUserId changed old=${oldVal}, new=${newVal}`);

            const user = this.buildUser(newVal);
            console.info(`auth: new user=${JSON.stringify(user)}`);

            EventBus.dispatch(CURRENT_USER_ID_CHANGE, {user});
        }))
    }

    id() {
        return this.store ? this.store.getState().auth.currentUserId : null;
    }

    user() {
        return this.buildUser(this.id());
    }

    //this should always return something !== null if user is logged
    buildUser(id: Id) {
        return id ? buildData(this.store.getState().data, "users", id) || {id, dummy: true} : null;
    }

    currentGoodshboxId() {
        let state = this.store.getState();
        let userId: Id = this.id();
        return _.get(state, `data.users.${userId}.relationships.goodshbox.data.id`, null);
    }

    loggedSince(): ms {
        if (!isLogged()) return NaN;
        let loggedAt = _.get(this.store.getState(), `auth.loggedAt`, null);
        if (!loggedAt) return NaN;
        return Date.now() - Date.parse(loggedAt);
    }
}

let instance = new CurrentUser();


export function init(store:Store<*,*>) {
    instance.init(store);
}

export function currentUserId() : Id {
    return instance.id();
}

// by default, will always return something !== null if user is logged
export function currentUser() : User {
    return instance.user();
}

export function currentGoodshboxId() {
    return instance.currentGoodshboxId();
}

//FIXME! learn to create a proper HOC
export function logged(target) {
    // return target;
    return Scope(target);
}

export function isLogged() {
    return !!instance.id();
}

export function isCurrentUser(user: User) {
    return instance.id() === (user && user.id);
}
export function isCurrentUserId(userId: Id) {
    return instance.id() === userId;
}

export default instance;
