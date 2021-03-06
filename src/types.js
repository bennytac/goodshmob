import type {MergeOptions} from "./helpers/ModelUtils"
import type {
    ImageStyle as ____ImageStyleProp_Internal,
    TextStyle as ____TextStyleProp_Internal,
    ViewStyle as ____ViewStyleProp_Internal,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

export type Url = string;

export type Id = string;

export type ActivityType = 'saving' | 'post' | 'sending' | 'ask';

export type ItemType = 'movie' | 'place';

export type NavigableProps = {
    navigator: RNNNavigator
};

export type Item = Base & IItem & {
    type: string,
    activitiesCount: number,
}

export type IItem = {
    title: string,
    subtitle: String,
    url: String,
    uid: number,
    image: String,
    provider: any,
    description: string,
}

export type Movie = Item & {
    overview: string
}


export type List =  Base & {

    createdAt?: any,
    name?: string,
    primary?: any,
    privacy?: any,
    savings?: List<Saving>,
    user?: User,
}

export type LineupMeta = {

}

export type Lineup = List;

export type Base = {

    id: Id,
    type: String,
    links?: any,
    meta?: any,
}

export type ActivityGroup = {
    id: Id,
    activityCount: number,
    actorCount: number,
    created_at: Date,
    group: string,
    updatedAt: any,
    verb: string,
    firstActivity: Activity,
}

export type Activity = Base & {
    createdAt: any,
    updatedAt: any,
    type: any,
    privacy: any,
    description: any,
    user: User,
    target: any,
    resource: Item,
    relatedActivities: any,
    comments: any,
    commentators: any,

}

export type User = Base & {

    firstName: string,
    provider: any,
    uid: any,
    lastName: any,
    image: string,
    email: any,
    timezone: any,
    goodshbox: List,
    lists: any,
}

export type Person = {
    firstName: string,
    lastName: string,
    image: string,
    id: string
}

export type Comment = Base & {
    createdAt: Date;
    content: string;
    user: User;
    resource: Activity;
}


export type Saving = Activity & {
}

export type Sending = Activity & {
}

/**
 privacy=0 (public)
 description: facebook-like
 user: creator
 target: null
 resource: item-id
 related-activities: other activities on this item from people in my network
 */
export type Post = Activity & {
}


export type Place = Item & {
    location: any
}

export type Device = {
    fcmToken: string,
    uniqueId:string,
    manufacturer:string,
    brand:string,
    model:string,
    deviceId:string,
    systemName:string,
    systemVersion:string,
    bundleId:string,
    buildNumber:string,
    version:string,
    readableVersion:string,
    deviceName:string,
    userAgent:string,
    deviceLocale:string,
    deviceCountry:string,
    timezone:string,
    isEmulator: boolean,
    isTablet: boolean
}

export type Ask = Activity &  {
    content: string,
    answers: Array<Answer>,
    answersCount: number,
    answerers: Array<User>,
}

export type Answer = Activity &  {
    content: string,
    answers: Array<Answer>,
    answerers: Array<User>,
}

export type MergeOpts = MergeOptions<string>

export type SearchToken = string;

export type SearchKey = string;

export type i18Key = string;

export type RequestState = 'idle' | 'sending' | 'ok' | 'ko';

export type Deeplink = string;

export type ms = number;

export type RNNNavigator = any;

export type Position = {
    coords: {
        latitude: number,
        longitude: number
    }

}

export interface Dispatchee {
}

export type Color = string

export type ViewStyle = ____ViewStyleProp_Internal
export type TextStyle = ____TextStyleProp_Internal
export type ImageStyle = ____ImageStyleProp_Internal


export type GListState = {
    list: Array<any>,
    hasMore?: boolean
}

export type OutMessage = {
    title: string, body: string
}

export type NavParams = {
    dispatch: any,
    navigator: RNNNavigator,
}
