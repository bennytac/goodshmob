// @flow
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import type {Comment, User} from "../../types"
import {styleMargin} from "../UIStyles"
import {timeSinceActivity} from "../../helpers/DataUtils"
import {Colors} from "../colors"
import {SFP_TEXT_REGULAR} from "../fonts"
import {Col, Grid, Row} from "react-native-easy-grid"
import {GAvatar} from "../GAvatar"

type Props = {
    comment: Comment | Array<Comment>,
    user: User,
    skipTime?: boolean,
    rightDisplay?: boolean,
    textContainerStyle?: *
};

type State = {
};

export default class CommentCell extends Component<Props, State> {

    render() {
        const {comment, user, skipTime, textContainerStyle} = this.props;
        if (!comment||!user) {
            console.warn("invalid comment props: " + user + comment);
            return null;
        }
        const comments: Array<Comment> = _.isArray(comment) ? comment : [comment];

        const dimension = 32;
        const rightDisplay = this.props.rightDisplay;


        let borderStyle = (i, radius) => {

            let isFirst = i === 0;
            let isLast = i === comments.length - 1;
            const smallRadius = radius / 4;
            if (rightDisplay) {
                return {
                    borderTopLeftRadius: radius,
                    borderTopRightRadius: isFirst ? radius : smallRadius,
                    borderBottomRightRadius: isLast ? radius : smallRadius,
                    borderBottomLeftRadius: radius,
                };
            }
            else {
                return {
                    borderTopLeftRadius: isFirst ? radius : smallRadius,
                    borderTopRightRadius: radius,
                    borderBottomRightRadius: radius,
                    borderBottomLeftRadius: isLast ? radius : smallRadius,
                };
            }

        };

        return (
            <Grid>
                {
                    //this is a terrible hack. ActivityDetail should use another dedicated component
                    !rightDisplay && !skipTime &&
                    <Row>
                        <Col style={{width: dimension}}/>
                        <Col>
                            <Text
                                style={[styles.userName, {alignSelf: 'flex-start', marginVertical: 4}]}>{user.firstName}</Text>
                        </Col>
                    </Row>
                }
                <Row style={{ }}>
                    <Col style={{ width: dimension, justifyContent: 'flex-end'}}>
                        {!rightDisplay && <GAvatar person={user} seeable size={24} style={{marginBottom: 3}}/>}
                    </Col>
                    <Col style={{ alignItems: rightDisplay ? 'flex-end': 'flex-start', }}>
                        {comments.map((comment: Comment, i) => <Row style={{marginTop: !!i ? 4 : 0}} key={comment.id}>
                            <View style={{flexDirection: "row"}}>
                                <View style={[{
                                    // ...stylePadding(12, 4),
                                    paddingHorizontal: 12,
                                    paddingVertical: 4,
                                    backgroundColor: rightDisplay ? Colors.green : Colors.white,
                                    ...borderStyle(i, 4),
                                    borderColor: Colors.greyish,
                                }, textContainerStyle]}>

                                    <Text style={{
                                        fontSize: 13,
                                        lineHeight: 23,
                                        fontFamily: SFP_TEXT_REGULAR,
                                        color: rightDisplay ? Colors.white : Colors.brownishGrey,
                                    }}>{comment.content}
                                    </Text>
                                </View>
                            </View>
                        </Row>)}
                    </Col>
                </Row>
                {!skipTime &&
                <Row>
                    <Col style={{width: dimension}}/>
                    <Col>
                        <Text
                            style={[styles.timeSince, {alignSelf: 'flex-start', ...styleMargin(0, 4)}]}>{timeSinceActivity(comment)}</Text>
                    </Col>
                </Row>
                }
            </Grid>
        );
    }

}


const styles = StyleSheet.create({
    timeSince: {
        fontSize: 13,
        lineHeight: 13,
        color: Colors.brownishGrey,
    },
    userName: {
        fontSize: 10,
        lineHeight: 10,
        color: Colors.greyish,
    },
});

