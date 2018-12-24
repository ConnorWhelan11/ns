import React, { Component  } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';

import {
  Container,
  Content,
  Header,
  View,
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

import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  EvilIcons,
} from '@expo/vector-icons';

import { Col, Row, Grid } from "react-native-easy-grid";
import {LinearGradient, Constants} from "expo";
import autobind from "autobind-decorator";
import {Text, NavHeader, Theme, Firebase} from "../../components";
const image1 = require('../../components/images/12steps.jpg');

const courseInfo = [
  {
    id: '1',
    title: 'Get Started',
    time: '2 minutes'
  },
  {
    id: '2',
    title: 'Behind The Waterfall',
    time: '3 minutes'
  },
  {
    id: '3',
    title: 'Finding the Time',
    time: '1 minutes'
  },
  {
    id: '4',
    title: 'Respond, Not React',
    time: '5 minutes'
  },
  {
    id: '5',
    title: 'Challengs of Meditation',
    time: '2 minutes'
  },
  {
    id: '6',
    title: 'Clearing Your Mind',
    time: '3 minutes'
  },
  {
    id: '7',
    title: 'Keep it Going',
    time: '4 minutes'
  }
]


export default class Course extends Component {

  @autobind
  backFn() {
      this.props.navigation.goBack();
  }

  @autobind
  renderCourseItem(courseInfo){
    const {navigation} = this.props;
    return(
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Module', {title: courseInfo.item.title})}>
        <ListItem style={styles.courseItem}>
          <Left style={{flexDirection: 'column', marginLeft:10}}>
            <Text style={styles.courseTitle}>{courseInfo.item.title}</Text>
            <Text style={styles.courseSubtitle}>{courseInfo.item.time} </Text>
          </Left>
          <Right style={{marginRight: 20}}>
            <Icon name={'ios-arrow-dropright-circle'} size={40} style={{color: Theme.palette.nextstepIconBlue, fontSize: 35}}/>
          </Right>
        </ListItem>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const {backFn, renderCourseItem} = this;
    const {navigation} = this.props;
    return (
      <Container>
        <NavHeader title="Course" back {...{navigation, backFn}} />
        <Content>
          <ImageBackground source={image1} style={styles.imageHeader}>
            <View style={styles.imageHeaderContainer}>
              <Text type="header2" style={styles.imageHeaderTitle}>
                12 Steps
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Module', {title: 'Getting Started'})}>
                <LinearGradient colors={[Theme.palette.nextstepIconBlue, "#00AAFF"]} style={styles.buttonContainer}>
                  <Text style={{color: 'white', fontSize:20}}>Start Course</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <FlatList
            data={courseInfo}
            renderItem={(courseItem) => renderCourseItem(courseItem)}
            keyExtractor={courseItem => courseItem.id}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageHeader:{
    height:250,
    width: '100%',
  },
  imageHeaderContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageHeaderTitle:{
    color: 'white',
    fontSize: 32,
    lineHeight: 36
  },
  button:{

  },
  buttonContainer:{
    borderRadius: 20,
    width: 150,
    height: 50,
    backgroundColor: Theme.palette.nextstepIconBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  courseItem:{
    height:70
  },
  courseTitle:{
    fontSize:18,
  },
  courseSubtitle:{
    color: '#b5b7b7'
  }
});
