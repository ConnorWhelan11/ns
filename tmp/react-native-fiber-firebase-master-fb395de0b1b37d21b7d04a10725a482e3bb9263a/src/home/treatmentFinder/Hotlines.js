import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Content,
  Card,
  CardItem,
  Text
} from 'native-base';
import { systemWeights, material } from 'react-native-typography';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import call from 'react-native-phone-call';

import {
  Feather,
} from '@expo/vector-icons';

var { width, height } = Dimensions.get('window');

const data = [
  {key: "1", desc: 'National Suicide Prevention Lifeline', number: '1-800-273-TALK (8255)', call:'18002738255', tty: '+1(800)799-4889', call2: '18007994889'},
  {key: "2", desc: 'National Helpline', number: '1-800-662-HELP (4357)', call:'18006624357', tty: '+1(800)487-4889', call2: '18004874889'},
  {key: "3", desc: 'Disaster Distress Helpline', number: '1-800-985-5990', call:'18009855990', tty: '+1(800)846-8517', call2: '18008468517'},
]

export default class Hotlines extends Component{

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Content padder>
        {
          data.map((item, index) => {
            return (
              <Card key={index}>
                <CardItem bordered>
                  <Body>
                    <Text style={{fontSize:24, ...material.titleObject, ...systemWeights.thin}}>
                      {item.desc}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem bordered button onPress={() => call({number: item.call, prompt:true}).catch(console.error)}>
                  <Left>
                    <Icon name='ios-call' />
                    <Text style={{fontSize:16, ...systemWeights.thin}}>
                      {item.number}
                    </Text>
                  </Left>
                </CardItem>
                <CardItem bordered button onPress={() => call({number: item.call2, prompt:true}).catch(console.error)}>
                  <Left>
                    <Icon name='ios-call' />
                    <Text style={{fontSize:16, ...systemWeights.thin}}>
                      TTY: {item.tty}
                    </Text>
                  </Left>
                </CardItem>
              </Card>
            )
          })
        }
        </Content>
      </Container>
    )
  }
}

var styles = StyleSheet.create({
  container: {
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: 'white',

    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  itemText: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    left: 20,
    top: 10,
  },
});

module.exports = Hotlines;
