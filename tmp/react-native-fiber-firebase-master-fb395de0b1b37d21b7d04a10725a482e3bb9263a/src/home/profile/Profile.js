// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";
import {inject, observer} from "mobx-react/native";
import {Constants, LinearGradient} from "expo";
import {NavigationEvents} from "react-navigation";

import ProfileStore from "../ProfileStore";
import { Col, Row, Grid } from "react-native-easy-grid";

import {Text, Avatar, Theme, Images, Feed, FeedStore} from "../../components";
import type {FeedEntry} from "../../components/Model";
import type {ScreenProps} from "../../components/Types";


type InjectedProps = {
    profileStore: ProfileStore,
    userFeedStore: FeedStore
};


@inject("profileStore", "userFeedStore") @observer
export default class ProfileComp extends React.Component<ScreenProps<> & InjectedProps> {

    componentDidMount() {
        this.loadFeed();
    }

    loadFeed = () => this.props.userFeedStore.checkForNewEntriesInFeed();

    @autobind
    settings() {
        const {profile} = this.props.profileStore;
        this.props.navigation.navigate("Settings", { profile });
    }

    @autobind
    loadMore() {
        this.props.userFeedStore.loadFeed();
    }

    @autobind
    // eslint-disable-next-line class-methods-use-this
    keyExtractor(item: FeedEntry): string {
        return item.post.id;
    }

    @autobind
    goals(){
      const {navigation} = this.props;
      navigation.navigate('Goals', {...navigation})
    }

    @autobind
    milestones(){
      const {navigation} = this.props;
      navigation.navigate('Milestones', {...navigation})
    }

    @autobind
    alerts(){
      const {navigation} = this.props;
      navigation.navigate('Alerts', {...navigation})
    }

    render(): React.Node {
        const {navigation, userFeedStore, profileStore} = this.props;
        const {profile} = profileStore;
        return (
            <View style={styles.container}>
                <NavigationEvents onWillFocus={this.loadFeed} />
                <LinearGradient
                    colors={["#5cc0f1", "#d6ebf4", "white"]}
                    style={styles.gradient}
                />
                <Feed
                    bounce={false}
                    ListHeaderComponent={(
                        <View style={styles.header}>
                            <Image style={styles.cover} source={Images.cover} />
                            <TouchableOpacity onPress={this.settings} style={styles.settings}>
                                <View>
                                    <Icon name="settings" size={25} color="white" />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.title}>
                                <Text type="large" style={styles.outline}>Welcome,</Text>
                                <Text type="header2" style={styles.name}>{profile.name}</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={this.settings}>
                              <View style={styles.avatarContainer}>
                                <Avatar size={avatarSize} style={styles.avatar} {...profile.picture} />
                              </View>
                            </TouchableWithoutFeedback>
                            <Grid>
                              <Row>
                                <Col style={styles.col}>
                                  <TouchableOpacity style={{shadowOpacity:0.25}} onPress={() => this.goals()}>
                                    <View style={styles.iconContainer}>
                                      <Icon name={'clipboard'} style={styles.icon} />
                                      <Text>Goals</Text>
                                    </View>
                                  </TouchableOpacity>
                                </Col>
                                <Col style={styles.col}>
                                  <TouchableOpacity style={{shadowOpacity:0.25}} onPress={() => this.milestones()}>
                                    <View style={styles.iconContainer}>
                                      <Icon name={'award'} style={styles.icon} />
                                      <Text>Milestones</Text>
                                    </View>
                                  </TouchableOpacity>
                                </Col>
                                <Col style={styles.col}>
                                  <TouchableOpacity style={{shadowOpacity:0.25}} onPress={() => this.alerts()}>
                                    <View style={styles.iconContainer}>
                                      <Icon name={'bell'} style={styles.icon}s />
                                      <Text>Alerts</Text>
                                    </View>
                                  </TouchableOpacity>
                                </Col>
                              </Row>
                            </Grid>
                        </View>
                    )}
                    store={userFeedStore}
                    {...{navigation}}
                />
            </View>
        );
    }
}

const avatarSize = 200;
const {width} = Dimensions.get("window");
const {statusBarHeight} = Constants;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: width
    },
    header: {
        marginBottom: 30
    },
    cover: {
        width,
        height: width
    },
    avatar: {
      borderWidth:5,
      borderColor: 'white'
    },
    avatarContainer:{
      position: 'absolute',
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginTop:15,
      height: width,
      width: width
    },
    iconContainer:{
      marginTop: 20,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: Theme.palette.nextstepIconBlue,
      width: 90,
      height: 90
    },
    col:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 100
    },
    icon:{
      fontSize: 35,
      color: Theme.palette.nextstepIconBlue
    },
    settings: {
        position: "absolute",
        top: statusBarHeight + Theme.spacing.small,
        right: Theme.spacing.base,
        backgroundColor: "transparent",
        zIndex: 10000
    },
    title: {
        position: "absolute",
        left: Theme.spacing.small,
        marginTop: 30,
    },
    outline: {
        color: "rgba(255, 255, 255, 0.8)"
    },
    name: {
        color: "white"
    }
});
