// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import moment from "moment";
import {
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  ScrollView,
  ImageBackground
} from "react-native";
import {inject, observer} from "mobx-react/native";

import ProfileStore from "../ProfileStore";

import {Text, Theme, Avatar, Feed, FeedStore} from "../../components";
import type {ScreenProps} from "../../components/Types";

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
var { width, height } = Dimensions.get('window')

type ExploreState = {
    scrollAnimation: Animated.Value
};

type InjectedProps = {
    feedStore: FeedStore,
    profileStore: ProfileStore
};

const image1 = require('../../components/images/12steps.jpg')
const image2 = require('../../components/images/meditation.jpg')
const image3 = require('../../components/images/communityRec.jpg')
const image4 = require('../../components/images/community.jpg')
const image5 = require('../../components/images/stress.jpg')
const image6 = require('../../components/images/socialWellbeing.jpg')
const image7 = require('../../components/images/nonFaith.jpg')
const image8 = require('../../components/images/yoga.jpg')

@inject("feedStore", "profileStore") @observer
export default class CourseCategories extends React.Component<ScreenProps<> & InjectedProps, ExploreState> {

    state = {
        scrollAnimation: new Animated.Value(0)
    };


    render(): React.Node {
        const {feedStore, profileStore, navigation} = this.props;
        const {scrollAnimation} = this.state;
        const {profile} = profileStore;
        const opacity = scrollAnimation.interpolate({
            inputRange: [0, 60],
            outputRange: [1, 0],
            extrapolate: "clamp"
        });
        const translateY = scrollAnimation.interpolate({
            inputRange: [0, 60],
            outputRange: [0, -60],
            extrapolate: "clamp"
        });
        const fontSize = scrollAnimation.interpolate({
            inputRange: [0, 60],
            outputRange: [32, 20],
            extrapolate: "clamp"
        });
        const height = scrollAnimation.interpolate({
            inputRange: [0, 60],
            outputRange: Platform.OS === "android" ? [70, 70] : [100, 60],
            extrapolate: "clamp"
        });
        const marginTop = scrollAnimation.interpolate({
            inputRange: [0, 60],
            outputRange: [6, 0],
            extrapolate: "clamp"
        });
        const shadowOpacity = scrollAnimation.interpolate({
            inputRange: [0, 60],
            outputRange: [0, 0.25],
            extrapolate: "clamp"
        });
        return (
            <View style={styles.container}>
                <AnimatedSafeAreaView style={[styles.header, { shadowOpacity }]}>
                    <Animated.View style={[styles.innerHeader, { height }]}>
                        <View>
                            <AnimatedText
                                type="large"
                                style={[styles.newPosts, { opacity, transform: [{ translateY }] }]}
                            >
                            NextStep
                            </AnimatedText>
                            <AnimatedText
                                type="header2"
                                style={{ fontSize, marginTop }}
                            >
                                Education Modules
                            </AnimatedText>
                        </View>
                    </Animated.View>
                </AnimatedSafeAreaView>
                <ScrollView
                  scrollEventThrottle={16}
                  contentContainerStyle={styles.scrollView}
                  onScroll={Animated.event([{
                    nativeEvent: {
                        contentOffset: {
                            y: scrollAnimation
                        }
                    }
                  }])}>
                  <TouchableWithoutFeedback style={styles.courseCard} onPress={() => this.props.navigation.navigate('CourseList', {...navigation})}>
                    <ImageBackground
                      imageStyle={{ borderRadius: 12 }}
                      style={styles.courseCardInnerView}
                      source={image1}>
                        <Text style={styles.title}>Recovery</Text>
                    </ImageBackground>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback style={styles.courseCard} onPress={() => this.props.navigation.navigate('CourseList', {...navigation})}>
                    <ImageBackground
                      imageStyle={{ borderRadius: 12 }}
                      style={styles.courseCardInnerView}
                      source={image2}>
                        <Text style={styles.title}>Mind-Body Connection</Text>
                    </ImageBackground>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback style={styles.courseCard} onPress={() => this.props.navigation.navigate('CourseList', {...navigation})}>
                    <ImageBackground
                      imageStyle={{ borderRadius: 12 }}
                      style={styles.courseCardInnerView}
                      source={image3}>
                        <Text style={styles.title}>Community Connection</Text>
                    </ImageBackground>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback style={styles.courseCard} onPress={() => this.props.navigation.navigate('CourseList', {...navigation})}>
                    <ImageBackground
                      imageStyle={{ borderRadius: 12 }}
                      style={styles.courseCardInnerView}
                      source={image4}>
                        <Text style={styles.title}>Holistic Health</Text>
                    </ImageBackground>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback style={styles.courseCard} onPress={() => this.props.navigation.navigate('CourseList', {...navigation})}>
                    <ImageBackground
                      imageStyle={{ borderRadius: 12 }}
                      style={styles.courseCardInnerView}
                      source={image5}>
                        <Text style={styles.title}>Healthy Habits</Text>
                    </ImageBackground>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback style={styles.courseCard} onPress={() => this.props.navigation.navigate('CourseList', {...navigation})}>
                    <ImageBackground
                      imageStyle={{ borderRadius: 12 }}
                      style={styles.courseCardInnerView}
                      source={image6}>
                        <Text style={styles.title}>Emotional and Social Wellbeing</Text>
                    </ImageBackground>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback style={styles.courseCard} onPress={() => this.props.navigation.navigate('CourseList', {...navigation})}>
                    <ImageBackground
                      imageStyle={{ borderRadius: 12 }}
                      style={styles.courseCardInnerView}
                      source={image7}>
                        <Text style={styles.title}>Seratonin and Dopamine</Text>
                    </ImageBackground>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback style={styles.courseCard} onPress={() => this.props.navigation.navigate('CourseList', {...navigation})}>
                    <ImageBackground
                      imageStyle={{ borderRadius: 12 }}
                      style={styles.courseCardInnerView}
                      source={image8}>
                        <Text style={styles.title}>Fitness</Text>
                    </ImageBackground>
                  </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 8,
        zIndex: 10000
    },
    innerHeader: {
        marginHorizontal: Theme.spacing.base,
        marginVertical: Theme.spacing.tiny,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    scrollView:{
        alignItems: 'center'
    },
    courseCard: {
        marginBottom: 15
    },
    courseCardInnerView:{
      padding: 5,
      flexDirection: 'row',
      alignItems: 'flex-end',
      borderRadius: 12,
      width: width - 40,
      height: 150,
      marginBottom: 10,
      opacity: 0.7,
      shadowOpacity: 0.25,
      backgroundColor: 'black',
      flex: 1,
    },
    title: {
      fontSize: 30,
      lineHeight: 30,
      paddingTop: 30 - (35 * 0.75),
      color: 'white',
      marginLeft: 16,
      marginBottom: 10
    }
});
