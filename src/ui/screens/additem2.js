// @flow
import React from 'react'
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {CheckBox} from "react-native-elements"
import {renderSimpleButton} from "../UIStyles"
import type {Id, IItem} from "../../types"
import {logged} from "../../managers/CurrentUser"
import ItemCell from "../components/ItemCell"
import {Colors} from "../colors"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import Sheet from "../components/sheet"
import {SFP_TEXT_ITALIC, SFP_TEXT_REGULAR} from "../fonts"
import GTouchable from "../GTouchable"
import {openLinkSafely} from "../../managers/Links"
import LineupPicker from "./LineupPicker"

type Props = {
    defaultLineupId: Id,
    defaultDescription: Description,
    item?: IItem,
    onAdded: () => void,
    navigator: *,
    doAdd: (Id, Visibility, string) => void
};

export type Description = string

export type Visibility = 0 | 1


type State = {
    description: Description,
    visibility: Visibility,
    reqAdd?: number,
    reqFetch?: number,
    selectedLineupId: Id,
}

@logged
export default class AddItemScreen2 extends React.Component<Props, State> {

    static navigatorStyle = {
        navBarHidden: true,
        screenBackgroundColor: 'transparent',
        modalPresentationStyle: 'overFullScreen',
        tapBackgroundToDismiss: true
    };

    _sheet;
    textInput: any


    constructor(props: Props) {
        super(props);

        this.state = {
            visibility: 0,
            selectedLineupId: props.defaultLineupId,
            showLineupList: !props.defaultLineupId,
            description: props.defaultDescription
        };
    }

    getItem() {
        return this.props.item
    }

    render() {

        // let lineup = buildNonNullData(this.props.data, "lists", this.state.lineupId);
        let item = this.getItem();
        if (!item) return null;

        const {description, visibility, selectedLineupId} = this.state;

        let req = this.state.reqAdd;
        let editable = req !== 1;
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{flex: __IS_IOS__ ? 0 : 1}}
                // scrollEnabled={true}
                // extraScrollHeight={20}
                keyboardShouldPersistTaps='always'
                // style={{position: 'absolute', bottom:0, top: 0}}
            >
                <Sheet
                    navigator={this.props.navigator}
                    ref={ref => this._sheet = ref}
                >

                    <View style={{height: 370, paddingTop: 7, paddingLeft: 7, paddingRight: 7, paddingBottom: 45, backgroundColor: Colors.white}}>
                        <View style={{flexDirection: 'row', padding: 8}}>
                            <GTouchable onPress={()=>this._sheet && this._sheet.close()}>
                                <Image source={require('../../img2/closeXGrey.png')}/>
                            </GTouchable>
                            <CheckBox
                                right
                                title={i18n.t("create_list_controller.unvisible")}
                                checkedTitle={i18n.t("create_list_controller.visible")}
                                iconRight
                                size={16}
                                onPress={(newValue)=> this.setState({visibility: visibility === 1 ? 0 : 1})}
                                checked={!visibility}
                                style={{backgroundColor: 'transparent', alignSelf: 'flex-end'}}
                                textStyle={{color: Colors.brownishGrey, fontSize: 14, fontFamily: SFP_TEXT_REGULAR, fontWeight: 'normal'}}
                                containerStyle={{ backgroundColor: "transparent", borderWidth: 0, marginRight:0, padding: 0, flex: 1}}
                                checkedIcon='unlock'
                                uncheckedIcon='unlock-alt'
                                checkedColor={Colors.brownishGrey}
                                uncheckedColor={Colors.brownishGrey}
                            />
                        </View>
                        <ItemCell item={item}/>

                        <TextInput
                            editable={editable}
                            ref={(r) => this.textInput = r}
                            style={[styles.input, {padding: 8}, (editable ? {color: Colors.greyish} : {color: Colors.brownishGrey})]}
                            value={description}
                            onChangeText={description => this.setState({description})}
                            placeholder={i18n.t("create_list_controller.add_description")}
                            returnKeyType={selectedLineupId ? 'go' : 'next'}
                            onSubmitEditing={() => {selectedLineupId && this.props.doAdd(selectedLineupId, this.state.visibility, this.state.description)}}
                            multiline={true}
                            autoFocus={true}
                            maxLength={500}
                        />


                        <LineupPicker
                            navigator={this.props.navigator}
                            lineupId={this.state.selectedLineupId}
                            onListSelected={list => this.setState({selectedLineupId: list.id})}
                        />

                        {renderSimpleButton(
                            i18n.t('shared.add'),
                            () => this.props.doAdd(selectedLineupId, this.state.visibility, this.state.description),
                            {disabled: !selectedLineupId, style: styles.lineupSelector, textStyle:styles.lineupSelectorText}
                        )}
                    </View>
                </Sheet>
            </KeyboardAwareScrollView>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 7
    },
    searchContainer: {
        backgroundColor: 'transparent',
    },
    lineupSelector: {
        backgroundColor: Colors.green,
        padding: 10,
        marginTop: 10,
        marginRight: 8,
        marginLeft: 8,
    },
    lineupSelectorText: { fontWeight:'normal', color: Colors.white },
    input: {
        backgroundColor: 'transparent',
        marginVertical: 15,
        fontSize: 15,
        fontFamily: SFP_TEXT_ITALIC,
        // height: 40,
        borderWidth: 0,
    }
});
