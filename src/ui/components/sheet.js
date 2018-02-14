import type {Node} from 'react';
// @flow
import React from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Modal from 'react-native-modalbox';


type Props = {
    children: Node,
    // If closeCallback is undefined, the sheet will close
    closeCallback: () => void,

};

type State = {
    height: number
};

export default class Sheet extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        let h = _.get(props, 'children.props.style.height');
        if (!_.isNumber(h)) throw "Sheet need its direct children to have a fixed height";
        this.state = {height: h};
    }

    render() {
// <<<<<<< HEAD
//         const translateY = this.animatedValue.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0, this.state.height]
//         });
//         const backgroundColor = this.animatedValue.interpolate({
//             inputRange: [0, 1],
//             outputRange: ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0)']
//         });

//         return (<View style={{flex:1,}}>
//             <TouchableWithoutFeedback
//                 onPress={()=> this.props.closeCallback ? this.props.closeCallback() : this.close()}
//             >
//                 <Animated.View style={[styles.container, {backgroundColor}]}>
//                 </Animated.View>
//             </TouchableWithoutFeedback>

//             <Animated.View style={
//                 [
//                     styles.content,
//                     {transform: [{translateY}]}
//                 ]
//             }>
//                 {this.props.children}
//             </Animated.View>
//         </View>);
//     }

//     close() {
//         this.animate(0, 1, ()=>this.props.navigator.dismissModal({animationType: 'none'}));
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         width: "100%",
//         height: "100%",
//         justifyContent: 'flex-end',
//     },
//     content: {
//         width: "100%",
//         // backgroundColor: "white",
// =======
        let height = _.get(this.props, 'children.props.style.height');
        return (
            <Modal position={'bottom'}
                onClosed={() => this.props.navigator.dismissModal({animationType: 'none'})}
                   isOpen={true}
                   style={{height}}>{this.props.children}</Modal>
        );
// >>>>>>> commit2
    }
}