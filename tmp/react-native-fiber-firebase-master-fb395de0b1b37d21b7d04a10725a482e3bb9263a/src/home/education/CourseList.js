import React, { Component  } from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Container, Content,Header, View, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {LinearGradient, Constants} from "expo";
import autobind from "autobind-decorator";
import {Text, NavHeader, Theme, Firebase} from "../../components";


const cards = [
  {
    id:1,
    text: '12 Steps',
    name: 'One',
    image: require('../../components/images/12steps.jpg'),
  },
  {  id:2,
    text: 'Learning Stability',
    name: 'Two',
    image: require('../../components/images/12steps.jpg'),
  },
  {
     id:3,
    text: 'Quiet your inner critic',
    name: 'Three',
    image: require('../../components/images/12steps.jpg'),
  },
  {
     id:4,
    text: 'Patience',
    name: 'Four',
    image: require('../../components/images/12steps.jpg'),
  },
{    id:5,
    text: 'Mindfulness',
    name: 'One',
    image: require('../../components/images/12steps.jpg'),
  },
  {
     id:6,
    text: 'Stress and Anxiety',
    name: 'Two',
    image: require('../../components/images/12steps.jpg'),
  },
  {
     id:7,
    text: 'Overcoming Fear',
    name: 'Three',
    image: require('../../components/images/12steps.jpg'),
  },
  {
     id:8,
    text: 'Depression',
    name: 'Four',
    image: require('../../components/images/12steps.jpg'),
  },
{
     id:9,
    text: 'Self Love',
    name: 'One',
    image: require('../../components/images/12steps.jpg'),
  },
  {
     id:10,
    text: 'Healthy Habits',
    name: 'Two',
    image: require('../../components/images/12steps.jpg'),
  },
  {
     id:11,
    text: 'Sober Living',
    name: 'Three',
    image: require('../../components/images/12steps.jpg'),
  },
  {
     id:12,
    text: 'Long term care',
    name: 'Four',
    image: require('../../components/images/12steps.jpg'),
  },

];

export default class CourseList extends Component {

  @autobind
  backFn() {
    this.props.navigation.goBack();
  }

  @autobind
  course(){
    const {navigation} = this.props;
    this.props.navigation.navigate('Course', {...navigation});
  }

  render() {
    const {backFn, course} = this;
    const {navigation} = this.props;
    const gridItems = [] ;
    var rowItem  = [];

    for(let i = 0; i < cards.length; i++){
      if(i%2 == 0){
        gridItems.push(<Row style={{flex: 1}} key={i}>  { rowItem } </Row>);
        rowItem = [];
      }

      rowItem.push(
        <TouchableWithoutFeedback key={i} style={styles.touch} onPress={course}>
          <View style={styles.card}>
            <LinearGradient colors={[Theme.palette.nextstepIconBlue, "#00AAFF"]} style={styles.gradient}>
                <View style={styles.textContainer}>
                  <View style={styles.timeBubble}>
                    <Text type="header2" style={styles.time}>12 min</Text>
                  </View>
                  <Text type="header2" style={styles.title}>{cards[i].text}</Text>
                </View>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <Container>
        <NavHeader title="Recovery Courses" back {...{navigation, backFn}} />
        <Content>
          <Grid>
            {gridItems}
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    gradient: {
      height: 170,
      width: 180,
      borderRadius: 15,
    },
    card:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 10
    },
    title:{
      color: 'white',
      fontSize: 24,
      lineHeight: 26,
      marginBottom: 7,
    },
    time:{
      color: 'white',
      fontSize: 14,
      lineHeight: 20,
    },
    touch: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    textContainer:{
      flex:1,
      justifyContent: 'space-between',
      marginLeft: 10
    },
    timeBubble:{
      backgroundColor: '#b3c7cc',
      borderRadius: 15,
      width: 80,
      height: 35,
      justifyContent:'center',
      alignItems: 'center',
      marginTop: 5
    }
});
