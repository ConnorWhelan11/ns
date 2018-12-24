// @flow
import * as React from "react";
import {StyleSheet, View, Image} from "react-native";

import {AnimatedView, simpleInterpolation, directInterpolation} from "../components/Animations";
const image_src = require('./images/logo.png')
type LogoProps = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class Logo extends React.PureComponent<LogoProps> {

    render(): React.Node {
        const animations = {
            opacity: directInterpolation(),
            transform: [{ translateY: simpleInterpolation(-200, 0) }]
        };
        return (
            <View style={styles.container}>
              <AnimatedView duration={400} {...{ animations }}>
                <Image source={image_src} resizeMode={'contain'} style={{height: 200, width:200}}/>
              </AnimatedView>
            </View>
        );
    }
}

const n = 75;
const d = n * Math.sqrt(2);
const translation = ((d - n) * 0.5) + (n * 0.5);
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: d * 2,
        height: d * 2
    },
    square: {
        borderColor: "white",
        borderWidth: 5,
        position: "absolute",
        width: n,
        height: n
    },
    a: {
        backgroundColor: "#004DFF",
        transform: [{ translateY: translation }, { rotate: "45deg" }]
    },
    b: {
        backgroundColor: "#00AAFF",
        transform: [{ translateX: translation }, { rotate: "45deg" }]
    },
    c: {
        backgroundColor: "#A0EEFF",
        transform: [{ translateY: -translation }, { rotate: "45deg" }]
    }
});
