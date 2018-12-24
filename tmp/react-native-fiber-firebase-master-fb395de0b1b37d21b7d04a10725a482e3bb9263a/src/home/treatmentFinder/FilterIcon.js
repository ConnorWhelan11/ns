import React, { Component } from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  createAnimatableComponent,
  View,
  Text
} from 'react-native-animatable';

import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  EvilIcons,
} from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);
var { width, height } = Dimensions.get('window');


class FilterIcon extends Component{
  constructor(props){
    super(props);
    this.state ={
       show: false
     }
  }

  _onPress(){
    this.setState({ show: !this.state.show})
    switch(this.state.show){
      case true:
        this.refs.message.slideInRight();
        this.refs.text.slideInRight();
        break;
      case false:
        this.refs.message.slideOutRight();
        this.refs.text.slideOutRight();
        break;
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <AnimatableTouchableOpacity style={[styles.popout, {backgroundColor: this.props.color}]} ref="message" disabled={true}>
          <Animatable.Text ref="text" style={{marginLeft: 10, color:'white'}}>{this.props.title}</Animatable.Text>
        </AnimatableTouchableOpacity>
        <TouchableOpacity
          style={[styles.bubble, styles.button, {backgroundColor: this.props.color}]}
          onPress={() => this._onPress()}>
          <View style={styles.earth} >
            <Entypo name={this.props.iconName} size={30} color={'white'}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flexDirection:'row',
  },
  popout:{
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    width: 160,
    shadowOpacity: 0.25,
    marginTop: 10,
    position:'absolute'
  },
  earth:{
    alignItems:'center',
    justifyContent: 'center',
  },
  button:{
    width: 60,
    height: 60,
    paddingHorizontal: 10,
    shadowOpacity: 0.25,
    alignItems:'center',
    justifyContent: 'center',
  },
  bubble:{
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom:10,
    marginLeft: 130,
  }
});

export default FilterIcon;
