import React, { Component  } from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Container, Content,Header, View, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {LinearGradient, Constants} from "expo";
import autobind from "autobind-decorator";
import {Text, NavHeader, Theme, Firebase} from "../../../components";

export default class Alerts extends Component {

  @autobind
  backFn() {
    this.props.navigation.goBack();
  }

  render(){
    const {navigation} = this.props;
    const {backFn} = this;
    return (
      <Container>
        <NavHeader title="Alerts" back {...{navigation, backFn}} />
        <Content>
          <Grid>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});
