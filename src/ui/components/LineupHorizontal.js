// @flow

import React, {Component} from 'react';
import {
    Alert,
    BackHandler,
    Button,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import {connect} from "react-redux";
import type {Id, Lineup, RNNNavigator, Saving} from "../../types";
import {List} from "../../types"
import Snackbar from "react-native-snackbar"
import {stylePadding} from "../UIStyles";
import {currentGoodshboxId, logged} from "../../managers/CurrentUser"
import {CheckBox, SearchBar} from 'react-native-elements'
import {Navigation} from 'react-native-navigation';
import {LINEUP_DELETION} from "../lineup/actions";
import {displayActivityActions, seeActivityDetails, seeList, startAddItem} from "../Nav";
import {Colors} from "../colors";
import LineupTitle from "../components/LineupTitle";
import Feed from "../components/feed";
import LineupCellSaving from "../components/LineupCellSaving";

import GTouchable from "../GTouchable";
import BottomSheet from 'react-native-bottomsheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UpdateTracker} from "../UpdateTracker";
import StoreManager from "../../managers/StoreManager";
// $FlowFixMe
type Props = {
    navigator: RNNNavigator,
    // lineup: List,
    lineupId: Id,
    renderMenuButton?: () => Node,
    withLineupTitle?: boolean, //TODO: invert the default condition
    withAddInEmptyLineup?: boolean,
    onSavingPressed?: ?(navigator: RNNNavigator, saving: Saving) => void,
    renderSaving: (saving:Saving) => Node,
    style?: *,
};

type State = {
};

@connect((state, ownProps) => ({
    data: state.data,
    pending: state.pending,
}))
@logged
export default class LineupHorizontal extends Component<Props, State> {

    updateTracker: UpdateTracker;

    constructor(props: Props) {
        super(props);
        this.updateTracker = new UpdateTracker(
            nextProps => this.makeRefObject(nextProps),
            // {
            //     debugName: `LineupHorizontal`,
            //     debugId: `${_.get(props, 'lineup.id')}`,
            // }
        );
    }

    render() {
        this.updateTracker.onRender(this.props);

        const {renderMenuButton, withLineupTitle, lineupId} = this.props;

        let {lineup, savings} = StoreManager.getLineupAndSavings(lineupId);
        if (!lineup) return null;

        return (
            <View style={this.props.style}>
                {
                    withLineupTitle &&

                    <View style={{flexDirection:'row', paddingLeft: 15, paddingRight: 15}}>
                        <LineupTitle lineup={lineup}/>
                        {renderMenuButton && renderMenuButton()}
                    </View>
                }
                {this.renderList(lineup, savings)}
            </View>
        )
    }

    renderList(list: Lineup, savings: Array<Saving>) {
        if (_.isEmpty(savings)) {
            return this.renderEmptyList(list)
        }

        return <Feed
            data={savings}
            renderItem={({item}) => this.props.renderSaving(item)}
            hasMore={false}
            horizontal={true}
            ItemSeparatorComponent={()=> <View style={{width: 10, height: 10}} />}
            contentContainerStyle={{paddingLeft: 15}}
            showsHorizontalScrollIndicator={false}
            // cannotFetch={!super.isVisible()}
        />
    }

    //TODO: move out of LineupHorizontal
    // renderMenuButton(item, padding) {
    //     if (!item) return null;
    //
    //     //TODO: this shouldnt be here
    //     if (item.id === currentGoodshboxId()) return null;
    //
    //     // console.log("paddings:" + stylePadding(padding, 12));
    //     let handler = () => {
    //         BottomSheet.showBottomSheetWithOptions({
    //             options: [i18n.t("actions.change_title"), i18n.t("actions.delete"), i18n.t("actions.cancel")],
    //             title: item.name,
    //             dark: true,
    //             destructiveButtonIndex: 1,
    //             cancelButtonIndex: 2,
    //         }, (value) => {
    //             switch (value) {
    //                 case 1:
    //                     this.deleteLineup(item);
    //                     break;
    //                 case 0:
    //                     this.changeTitle(item);
    //                     break;
    //             }
    //         });
    //     };
    //     return (<View style={{position: "absolute", right: 0, margin: 0}}>
    //         <GTouchable onPress={handler}>
    //             <View style={{...stylePadding(padding, 14)}}>
    //                 <Image
    //                     source={require('../../img2/moreDotsGrey.png')} resizeMode="contain"/>
    //             </View>
    //         </GTouchable>
    //     </View>);
    // }

    //TODO: move out of LineupHorizontal
    // deleteLineup(lineup: List) {
    //     let delayMs = 3000;
    //     //deleteLineup(lineup.id, delayMs)
    //     const lineupId = lineup.id;
    //     return Alert.alert(
    //         i18n.t("alert.delete.title"),
    //         i18n.t("alert.delete.label"),
    //         [
    //             {text: i18n.t("actions.cancel"), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //             {text: i18n.t("actions.ok"), onPress: () => {
    //                 this.props.dispatch(LINEUP_DELETION.pending({lineupId}, {delayMs, lineupId}))
    //                     .then(pendingId => {
    //                         Snackbar.show({
    //                                 title: i18n.t("activity_item.buttons.deleted_list"),
    //                                 duration: Snackbar.LENGTH_LONG,
    //                                 action: {
    //                                     title: i18n.t("actions.undo"),
    //                                     color: 'green',
    //                                     onPress: () => {
    //                                         this.props.dispatch(LINEUP_DELETION.undo(pendingId))
    //                                     },
    //                                 },
    //                             }
    //                         );
    //                     });
    //             }
    //             },
    //         ],
    //         { cancelable: true }
    //     );
    // }

    //TODO: move out of LineupHorizontal
    // changeTitle(lineup: List) {
    //     let {id, name} = lineup;
    //
    //
    //     this.props.navigator.showModal({
    //         screen: 'goodsh.ChangeLineupName',
    //         animationType: 'none',
    //         passProps: {
    //             lineupId: id,
    //             initialLineupName: name
    //         }
    //     });
    // }

    //TODO: move out of LineupHorizontal, as a prop
    renderEmptyList(list: List) {
        let result = [];
        //
        for (let i = 0; i < 5; i++) {
            result.push(<View key={`key-${i}`} style={[
                LineupCellSaving.styles.cell,
                {
                    backgroundColor: Colors.grey3,
                    marginRight: 10,
                    opacity: 1 - (0.2 * i),
                    alignItems: 'center',
                    justifyContent:'center'
                }
            ]}>
                { i === 0 && this.props.withAddInEmptyLineup && <Icon name="plus" size={45} color={Colors.dirtyWhite}/>}
            </View>);
        }
        return (<GTouchable
            disabled={!this.props.withAddInEmptyLineup || list.pending}
            onPress={() => {
                startAddItem(this.props.navigator, list.id);
            }
            }>
            <View style={{flexDirection: 'row', paddingLeft: 15}}>{result}</View>
        </GTouchable>);
    }

    makeRefObject(nextProps:Props) {
        // return null;
        const lineupId = _.get(nextProps, 'lineupId');
        if (!lineupId) return null;

        let getRefKeys = () => {
            let base = `data.lists.${lineupId}`;
            return [base, `${base}.meta`];
        };

        let result = getRefKeys().map(k=>_.get(nextProps, k));

        //TODO: deal with pendings
        let allPendings = _.values(_.get(nextProps, 'pending', {}));
        // //[[create_ask1, create_ask2, ...], [create_comment1, create_comment2, ...], ...]
        //
        let scopedPendings = [];
        _.reduce(allPendings, (res, pendingList) => {

            let filteredPendingList = _.filter(pendingList, pending => {
                const scope = _.get(pending, "options.scope");
                if (!scope) return false;
                return scope.lineupId === lineupId;
            });

            res.push(...filteredPendingList);
            return res;
        }, scopedPendings);
        result.push(...scopedPendings);

        return result;
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.updateTracker.shouldComponentUpdate(nextProps);
    }

}

export type Props1 = {
    lineup: Lineup,
    navigator: RNNNavigator
}
export const LineupH1 = connect()((props: Props1) => {
    const {lineup, navigator, ...attr} = props;
    return <GTouchable onPress={()=>seeList(navigator, lineup)}>
        <LineupHorizontal
            lineupId={lineup.id}
            navigator={navigator}
            renderSaving={saving => (
                <GTouchable
                    onPress={() => seeActivityDetails(navigator, saving)}
                    onLongPress={saving.pending ? null : ()=> {
                        displayActivityActions(navigator, props.dispatch, saving.id, saving.type)
                    }}
                >
                    <LineupCellSaving item={saving.resource} />
                </GTouchable>
            )}
            {...attr}
        />
    </GTouchable>
});
