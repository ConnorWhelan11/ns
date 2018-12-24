import React, { Component  } from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  FlatList
} from 'react-native';
import {
  Container,
  Content,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Animated,
  Easing,
  Icon
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {LinearGradient, Constants, Haptic} from "expo";
import autobind from "autobind-decorator";
import {Text, NavHeader, Theme, Firebase} from "../../../components";
import LottieView from 'lottie-react-native';
const timer = require('react-native-timer');
const checkmark = require('../../../components/animations/checkmark.json')


export default class AddGoal extends Component {

  constructor(props){
    super(props)
    this.state = {
      goals: [
        {
          id: '1',
          title: 'Exercise',
          icon: 'ios-heart',
          color: '#e8b9e4'
        },
        {
          id: '2',
          title: 'Stay Sober',
          icon: 'ios-heart',
          color: '#e8b9e4'
        },
        {
          id: '3',
          title: 'No Smoking',
          icon: 'ios-heart',
          color: '#e8b9e4'
        },
        {
          id: '4',
          title: 'Eat Healthy',
          icon: 'ios-heart',
          color: '#e8b9e4'
        },
        {
          id: '5',
          title: 'Go For Run',
          icon: 'ios-heart',
          color: '#e8b9e4'
        }
      ],
      savedGoals: [
        {
          id: '6',
          title: 'Blood Pressure',
          icon: 'ios-heart',
          color: '#e8b9e4'
        }
      ]
    }
  }

  @autobind
  backFn() {
    this.props.navigation.goBack();
  }

  @autobind
  startAnimation(anim, index){
    anim.play();
    Haptic.notification('Success');
    timer.setTimeout('checkGoals', () => this.checkGoals(index), 1000)
  }

  @autobind
  checkGoals(index){
    var goals = this.state.goals;
    var savedGoals = this.state.savedGoals;
    savedGoals.push(goals[index]);
    goals.splice(index, 1);
    this.setState({goals: goals, savedGoals: savedGoals});
  }



  @autobind
  renderListItem(data){
    console.log(data)
    return (
      <ListItem style={{height: 80}}>
        <Left style={{flex:1, padding:17}}>
          <Button style={{ backgroundColor: 'white' }}>
            <Icon name={'ios-heart'} style={styles.xIcon} />
          </Button>
        </Left>
        <Body style={{flex:1}}>
          <Text style={styles.savedGoalTitle}>{data.item.title}</Text>
        </Body>
        <Right style={{flex:1, width: 80}}>
          <Button style={{ backgroundColor: 'white' }}>
            <Icon name={'ios-close-circle'} style={styles.xIcon} />
          </Button>
        </Right>
      </ListItem>
    )
  }

  @autobind
  renderListHeader(){
    return (
      <Text style={styles.savedGoalHeaderTitle}>Saved Goals</Text>
    )
  }

  @autobind
  renderGoals(){
    const gridItems = [] ;
    var rowItem  = [];
    var goals = this.state.goals
    this.animations = [];
    for(let i = 0; i < goals.length; i++){
      if(i%2 == 0){
        gridItems.push(<Row style={{flex: 1}} key={i}>  { rowItem } </Row>);
        rowItem = [];
      }
      rowItem.push(
        <Col style={styles.col} key={i}>
          <TouchableOpacity onPress={() => this.startAnimation(this.animations[i], i)}>
            <View style={styles.goalContainer}>
              <LottieView
                  ref={animation => {
                    this.animations.push(animation);
                  }}
                  source={checkmark}
                  loop={false}
                  onAnimationFinish={() => console.log('here')}
                />
              <Icon name={goals[i].icon} style={{fontSize:50, color: '#f796d5'}} />
              <Text style={{fontSize: 16, marginTop: 10}}>{goals[i].title}</Text>
            </View>
          </TouchableOpacity>
        </Col>
      );
    }

    gridItems.push(<Row style={{flex: 1}} key={goals.length}>  { rowItem } </Row>);

    return gridItems

  }

  render(){
    const {navigation} = this.props;
    const {backFn} = this;
    const goals = this.renderGoals()
    console.log(this.state.savedGoals)
    return (
      <Container>
        <NavHeader title="Health Goals" back {...{navigation, backFn}} />
        <Content style={styles.content}>
          <Grid style={styles.grid}>
            {goals}
          </Grid>
          <View style={{flex: 1}}>
            <FlatList
              data={this.state.savedGoals}
              extraData={this.state}
              renderItem={this.renderListItem}
              keyExtractor={(item, index) => item.id}
              ListHeaderComponent={this.renderListHeader}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  col:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 180
  },
  goalContainer:{
    height: 170,
    width: 170,
    borderWidth: 0.5,
    borderRadius:20,
    justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'column',
    shadowOpacity: 0.25,
    backgroundColor: '#c6f2ff'
  },
  grid:{
    flex: 1
  },
  firstRow:{
    marginTop: 5,
    flex: 1
  },
  content:{
    flex: 1
  },
  xIcon:{
    fontSize:35,
    color: 'red',
  },
  savedGoalTitle:{
    fontSize: 18
  },
  savedGoalHeaderTitle:{
    fontSize: 24,
    lineHeight: 28,
    marginTop: 20
  },
});
