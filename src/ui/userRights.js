// @flow

import type {User} from "../types"
import {isCurrentUser} from "../managers/CurrentUser"

const GUserActions = []

export class GUserAction {

    name: string

    constructor(name: string, priority: number = 0) {
        this.name = name
        GUserActions.push(this)
    }

    toString() {
        return "GUserAction-" + this.name
    }
}

export const U_CONNECT: GUserAction = new GUserAction('connect to user', -1)
export const U_DISCONNECT: GUserAction = new GUserAction('disconnect from user', 3)


export class UserRights {
    user: User
    pending: any

    constructor(user: User, pending?: any) {
        if (!user) throw "invalid params 1"
        this.user = user
        this.pending = pending
    }

    canExec(action: GUserAction): boolean {
        if (!this.user) return false
        let isMe = isCurrentUser(this.user)
        const connected = _.get(this.user, 'meta.followed');

        switch (action) {
            case U_CONNECT:
                return !isMe && connected === false
            case U_DISCONNECT:
                return !isMe && connected === true
            default:
                throw `unknown action` + action
        }
    }
}

export function getUserActions(user: User, pending?: any): GUserAction[] {
    if (!user) return []
    let rights = new UserRights(user, pending)
    return GUserActions.filter(a => rights.canExec(a))
}
export function canExecUserAction(action: GUserAction, user: User): boolean {
    if (!user) return false
    return new UserRights(user).canExec(action)
}
