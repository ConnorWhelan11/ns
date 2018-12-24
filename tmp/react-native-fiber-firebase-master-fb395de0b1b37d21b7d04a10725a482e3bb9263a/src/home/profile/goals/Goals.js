import React, { Component  } from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content,Header, View, DeckSwiper, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {LinearGradient, Constants, Haptic} from "expo";
import autobind from "autobind-decorator";
import {Text, NavHeader, Theme, Firebase} from "../../../components";
import {Feather as Icon} from "@expo/vector-icons";
import Modal from 'react-native-modal';
import Confetti from 'react-native-confetti';
import LottieView from 'lottie-react-native';
var { width, height } = Dimensions.get('window');
const trophy = require('../../../components/animations/trophy.json')

export default class Goals extends Component {

  constructor(props){
    super(props);
    this.state = {
      oneDoubleTap: false,
      twoDoubleTap: false,
      threeDoubleTap: false,
      modal: false
    }
  }

  @autobind
  backFn() {
    this.props.navigation.goBack();
  }

  @autobind
  goalCategories(){
    this.props.navigation.navigate('GoalCategories')
  }

  async onDoublePress(btn){
   	const time = new Date().getTime();
  	const delta = time - this.lastPress;
    var {oneDoubleTap, twoDoubleTap, threeDoubleTap} = this.state;
  	const DOUBLE_PRESS_DELAY = 400;
  	if (delta < DOUBLE_PRESS_DELAY) {
      Haptic.notification('Success')
  		switch (btn) {
        case 1:
          await this.setState({oneDoubleTap: !oneDoubleTap});
          break;
        case 2:
          await this.setState({twoDoubleTap: !twoDoubleTap});
          break;
        case 3:
          const modal = threeDoubleTap ? false : true;
          await this.setState({threeDoubleTap: !threeDoubleTap, modal: modal});
          break;
        default:
          console.log('not double')

      }
      oneDoubleTap = this.state.oneDoubleTap
      twoDoubleTap = this.state.twoDoubleTap
      threeDoubleTap = this.state.threeDoubleTap
      if(oneDoubleTap && twoDoubleTap && threeDoubleTap && this._confettiView){
        this._confettiView.startConfetti();
      }
  	}
  	this.lastPress = time;
  };

  render(){
    const {navigation} = this.props;
    const {backFn} = this;
    const {oneDoubleTap, twoDoubleTap, threeDoubleTap} = this.state;
    const color1 = oneDoubleTap ? '#84d68c' : '#c6f2ff';
    const color2 = twoDoubleTap ? '#84d68c' : '#c6f2ff';
    const color3 = threeDoubleTap ? '#84d68c' : '#c6f2ff';
    return (
      <Container>
        <Confetti ref={(node) => this._confettiView = node}/>
        <NavHeader title="My Goals" back {...{navigation, backFn}} />
        <Content style={styles.content}>
          <Grid style={styles.grid}>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <TouchableOpacity onPress={this.goalCategories}>
                  <View style={styles.addGoalContainer}>
                    <Icon name={'plus-circle'} style={{fontSize:50, color: Theme.palette.nextstepIconBlue}} />
                    <Text style={{fontSize: 16, marginTop: 10}}>Add/Edit Goals</Text>
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={styles.col}>
                <TouchableOpacity onPress={() => this.onDoublePress(1)}>
                  <View style={[styles.goalContainer, {backgroundColor: color1}]}>
                    <Icon name={'heart'} style={{fontSize:50, color: '#f796d5'}} />
                    <Text style={{fontSize: 16, marginTop: 10}}>Exercise</Text>
                  </View>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <TouchableOpacity onPress={() => this.onDoublePress(2)}>
                  <View style={[styles.goalContainer, {backgroundColor: color2}]}>
                    <Icon name={'tv'} style={{fontSize:50, color: '#c390f9'}} />
                    <Text style={{fontSize: 16, marginTop: 10}}>No distractions</Text>
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={styles.col}>
                <TouchableOpacity onPress={() => this.onDoublePress(3)}>
                  <View style={[styles.goalContainer, {backgroundColor: color3}]}>
                    <Icon name={'check-circle'} style={{fontSize:50, color: '#efad51'}} />
                    <Text style={{fontSize: 16, marginTop: 10}}>Stay Sober</Text>
                  </View>
                </TouchableOpacity>
              </Col>
            </Row>
          </Grid>
        </Content>
        <View style={{position: 'absolute', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Modal
            isVisible={this.state.modal}
            onModalShow={() => this.animation.play()}
            presentationStyle={'pageSheet'}
            transparent={false}
            style={{height: height - 100}}
            >
            <View style={{
              flex: 1,
              backgroundColor:'white',
              borderRadius: 30,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'column',
              height: height - 100
            }}>
              <LottieView
                  ref={animation => {
                    this.animation = animation;
                  }}
                  source={trophy}
                  loop={false}
                />
              <Text style={{fontSize: 24, lineHeight: 28}}>Congratulations!</Text>
              <Text style={{fontSize: 24, marginBottom: 20, lineHeight:28}}>30 Days Sober</Text>
              <TouchableOpacity onPress={() => this.setState({modal: false})} style={{marginBottom: 50}}>
                <LinearGradient colors={[Theme.palette.nextstepIconBlue, "#00AAFF"]} style={styles.buttonContainer}>
                  <Text style={{color: 'white', fontSize:20}}>Close</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  col:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 180
  },
  addGoalContainer:{
    height: 170,
    width: 170,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius:20,
    justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'column'
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
  grid:{
    flex:1,
  },
  row:{
    flex:1,
    marginTop: 5
  },
  content:{
    flex:1,
  }
});
