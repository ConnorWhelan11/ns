import React, { Component  } from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from 'react-native';
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
  Right,
  Body,
  List,
  ListItem,
  Icon,
  Button
} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {LinearGradient, Constants, Haptic} from "expo";
import autobind from "autobind-decorator";
import {Text, NavHeader, Theme, Firebase} from "../../../components";


export default class GoalCategories extends Component {

  @autobind
  backFn() {
    this.props.navigation.goBack();
  }

  @autobind
  addGoal(){
    this.props.navigation.navigate('AddGoal')
  }

  render(){
    const {navigation} = this.props;
    const {backFn} = this;
    return (
      <Container>
        <NavHeader title="Goal Categories" back {...{navigation, backFn}} />
        <Content>
          <List>
            <ListItem style={styles.listItem} onPress={this.addGoal}>
              <Left style={{marginLeft:15}}>
                <Button style={{ backgroundColor: 'white' }}>
                  <Icon name={'ios-heart'} style={styles.heart} />
                </Button>
              </Left>
              <Body style={{flex:3}}>
                <Text style={styles.title}>Health</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" style={styles.arrow} />
              </Right>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Left style={{marginLeft:15}}>
                <Button style={{ backgroundColor: 'white' }}>
                  <Icon name={'ios-people'} style={styles.social} />
                </Button>
              </Left>
              <Body style={{flex:3}}>
                <Text style={styles.title}>Social</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" style={styles.arrow} />
              </Right>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Left style={{marginLeft:15}}>
                <Button style={{ backgroundColor: 'white' }}>
                  <Icon name={'ios-planet'} style={styles.planet} />
                </Button>
              </Left>
              <Body style={{flex:3}}>
                <Text style={styles.title}>Spiritual</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" style={styles.arrow} />
              </Right>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Left style={{marginLeft:15}}>
                <Button style={{ backgroundColor: 'white' }}>
                  <Icon name={'md-hammer'} style={styles.hammer} />
                </Button>
              </Left>
              <Body style={{flex:3}}>
                <Text style={styles.title}>Productivity</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" style={styles.arrow} />
              </Right>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Left style={{marginLeft:15}}>
                <Button style={{ backgroundColor: 'white' }}>
                  <Icon name={'md-happy'} style={styles.happy} />
                </Button>
              </Left>
              <Body style={{flex:3}}>
                <Text style={styles.title}>Personal</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" style={styles.arrow} />
              </Right>
            </ListItem>
            <ListItem style={styles.listItem}>
              <Left style={{marginLeft:15}}>
                <Button style={{ backgroundColor: 'white' }}>
                  <Icon name={'ios-trending-up'} style={styles.misc} />
                </Button>
              </Left>
              <Body style={{flex:3}}>
                <Text style={styles.title}>Miscellaneous</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" style={styles.arrow} />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItem:{
    height: 80
  },
  arrow:{
    fontSize:35,
    color: Theme.palette.nextstepIconBlue,
    marginRight: 15
  },
  title:{
    fontSize: 24,
    lineHeight: 28
  },
  heart:{
    fontSize:35,
    color: '#f796d5'
  },
  social:{
    fontSize:35,
    color: '#7fb0ff'
  },
  planet:{
    fontSize:35,
    color: '#b47fff'
  },
  hammer:{
    fontSize:35,
    color: '#63d888'
  },
  happy:{
    fontSize:35,
    color: '#f2d26a'
  },
  misc:{
    fontSize:35,
    color:'#d48cff'
  }
});
