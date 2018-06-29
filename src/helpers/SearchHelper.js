// @flow

import type {i18Key, List, Saving, SearchToken} from "../types"
import {RequestState} from "../types"


export type SearchCategoryType = string;

// A single page of result returned by search engine
export type SearchResult = {
    results: Array<*>,
    page: number,
    nbPages: number,
}
export type SearchQuery = {
    token: SearchToken,
    categoryType: SearchCategoryType,
    options?: any
}
export type SearchEngine = {
    search:
        (
            token: SearchToken,
            category: SearchCategoryType,
            page: number,
            searchOptions?: any
        ) => Promise<SearchResult>,
    getSearchKey: (
        token: SearchToken,
        category: SearchCategoryType,
        searchOptions?: any
    ) => string,
};
export type SearchOptions = {
    renderOptions: (any, any => void, void => void) => Node
}
export type SearchState = {
    requestState: RequestState,
    page: number,
    nbPages: number,
    data: Array<List | Saving>,
    searchKey: string,
};

export type SearchCategory = {
    type: SearchCategoryType,
    query: *,
    parseResponse: (hits: []) => *,
    renderItem: (item: *) => Node,
    renderEmpty: () => Node,
    tabName: string,
    description?: string,
    placeholder: i18Key,
    onItemSelected?: () => void,
    searchOptions: SearchOptions,
    renderResults: ({query: SearchQuery, searchState: SearchState}) => Node,
    renderBlank?: () => Node,
}

export type SearchItemCategoryType = "consumer_goods" | "places" | "musics" | "movies";

export const SEARCH_CATEGORIES_TYPE: SearchItemCategoryType[] = ["consumer_goods", "places", "musics", "movies"]
export const SEARCH_ITEM_CATEGORIES: SearchCategory[] = SEARCH_CATEGORIES_TYPE.map(type => (
    {
        type: type,
        tabName: i18n.t("search_item_screen.tabs." + type),
        description: i18n.t("search_item_screen.placeholder." + type),
    }
))
