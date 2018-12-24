import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import {
  Container,
  Content,
  Header,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Icon,
  ListItem
} from 'native-base';

import {Text, NavHeader, Theme, Firebase} from "../../components";
import autobind from "autobind-decorator";

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.palette.nextstepIconBlue,
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.palette.nextstepIconBlue,
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.palette.nextstepIconBlue,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    marginTop: 30,
    lineHeight: 35,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    color: '#fff',
    fontSize: 34,
    marginTop: 100,
    lineHeight: 38,
    fontWeight: '700'
  }
})

export default class Module extends Component {

  @autobind
  backFn() {
      this.props.navigation.goBack();
  }

  render(){
    const {navigation} = this.props;
    const title = navigation.getParam('title', 'Module');
    const {backFn} = this;
    return (
      <Container>
        <NavHeader title={title} back {...{navigation, backFn}} />
        <Content>
          <Swiper style={styles.wrapper} showsButtons={true}>
            <View style={styles.slide1}>
              <Text style={styles.title}>Step 1</Text>
              <Text style={styles.text} ellipsizeMode={'tail'}>We admitted we were powerless over our addiction - that our lives had become unmanageable.</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.title}>Step 2</Text>
              <Text style={styles.text}>Came to believe that a Power greater than ourselves could restore us to sanity.</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.title}>Step 3</Text>
              <Text style={styles.text}>Made a decision to turn our will and our lives over to the care of God as we understood God.</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.title}>Step 4</Text>
              <Text style={styles.text}>Made a searching and fearless moral inventory of ourselves.</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.title}>Step 5</Text>
              <Text style={styles.text}>Admitted to God, to ourselves and to another human being the exact nature of our wrongs.</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.title}>Step 6</Text>
              <Text style={styles.text}>Were entirely ready to have God remove all these defects of character.</Text>
            </View>
          </Swiper>
        </Content>
      </Container>
    );
  }
}
