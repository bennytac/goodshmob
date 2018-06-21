// @flow

import type {User} from "../types"
import {isCurrentUser} from "../managers/CurrentUser"
import {GAction} from "./rights"

const GUserActions = []

class GUserAction extends GAction {

    constructor(name: string) {
        super(name)
        GUserActions.push(this)
    }

    toString() {
        return "GUserAction-" + this.name
    }
}

export const U_CONNECT: GUserAction = new GUserAction('connect to user')
export const U_DISCONNECT: GUserAction = new GUserAction('disconnect from user')

export class UserRights {
    user: User

    constructor(user: User) {
        if (!user) throw "invalid params"
        this.user = user
    }

    canExec(action: GUserAction): boolean {
        const l = this.user
        if (!l) return false
        let isMe = isCurrentUser(l.user)
        const connected = _.get(this.user, 'meta.followed');

        switch (action) {
            case U_CONNECT:
                return !isMe && connected === false
            case U_DISCONNECT:
                return !isMe && connected === true
            default:
                throw `unknown action ${action}`
        }
    }
}

export function getUserActions(user: User): GUserAction[] {
    let rights = new UserRights(user)
    return GUserActions.filter(a => rights.canExec(a))
}
export function canExecUserAction(action: GUserAction, user: User): boolean {
    return new UserRights(user).canExec(action)
}