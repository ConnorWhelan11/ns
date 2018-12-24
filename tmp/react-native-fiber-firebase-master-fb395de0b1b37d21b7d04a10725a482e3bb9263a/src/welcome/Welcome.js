// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, Dimensions, Linking, TouchableOpacity} from "react-native";

import {Text, Button, Container, Logo, Theme, AnimatedView, Firebase, serializeException} from "../components";
import type {ScreenProps} from "../components/Types";

export default class Welcome extends React.Component<ScreenProps<>> {

    @autobind
    signUp() {
        this.props.navigation.navigate("SignUp");
    }

    @autobind
    login() {
        this.props.navigation.navigate("Login");
    }

    render(): React.Node {
        return (
            <Container gutter={2} style={styles.root}>
                <AnimatedView style={styles.container}>
                  <Text type="header1" style={styles.header1}>Welcome</Text>
                </AnimatedView>
                <Logo />
                <AnimatedView style={styles.nextstepContainer}>
                  <Text type="header2" style={styles.header2}>NextStep</Text>
                </AnimatedView>
                <AnimatedView style={styles.container} delay={600} duration={300}>
                    <Button label="Login" onPress={this.login} full primary style={styles.button}/>
                    <Button label="Sign Up" onPress={this.signUp} full />
                </AnimatedView>
            </Container>
        );
    }
}

const loginAnonymously = async (): Promise<void> => {
    try {
        await Firebase.auth.signInAnonymously();
    } catch (e) {
        // eslint-disable-next-line no-alert
        alert(serializeException(e));
    }
};
const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    root: {
        alignItems: "center"
    },
    nextstepContainer: {
        alignSelf: "stretch",
    },
    container: {
        alignSelf: "stretch",
        marginTop: 30,
    },
    header1: {
        textAlign: "center",
        marginBottom: Theme.spacing.base * 1.3,
        fontSize: 56,
    },
    header2: {
        textAlign: "center",
        marginBottom: Theme.spacing.base * 2,
        marginTop: Theme.spacing.base,
        color: '#42cef4',
        fontSize: 44,
    },
    framer: {
        position: "absolute",
        bottom: Theme.spacing.tiny,
        width
    },
    framerText: {
        textAlign: "center",
        fontSize: 12
    },
    button:{
      backgroundColor:'#42cef4',
    }
});
