import React from 'react';
import { Platform, View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Text, Theme} from "../../components";
import Modal from 'react-native-modal'
import call from 'react-native-phone-call'
import Hotlines from './Hotlines'
import { systemWeights, material } from 'react-native-typography'
var { width, height } = Dimensions.get('window');
import FilterIcon from './FilterIcon'
import Api from '../../lib/api'
import moment from "moment";
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
} from 'native-base'

import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  EvilIcons,
} from '@expo/vector-icons';

export default class Map extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    initialRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    visibleEmergencyModal: false,
    loading: true,
    points: [],
  };

  async componentWillMount() {
    await this._getLocationAsync();
    //const locs = await Api.get(this.state.region.latitude, this.state.region.longitude, 20);
    //this.setState({loading: false, points: locs.rows})
  }

  _renderModalEmergencyContent = () =>
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        borderRadius: 14,
        justifyContent: 'flex-start',
        backgroundColor: 'white'
      }}>
      <View
        style={{
          top: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text
          style={{
            fontSize: 26,
            borderBottomWidth: 2,
            borderBottomColor: 'black',
            marginBottom: 5,
            marginTop: 10,
            ...material.titleObject,
            ...systemWeights.thin
          }}>
          Emergency Contacts
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Hotlines />
      </View>
      <View style={{ bottom: 0, left: 0, right: 0, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => this.setState({ visibleEmergencyModal: false })}>
          <View style={styles.button}>
            <Text
              style={{
                fontSize: 24,
                ...material.titleObject,
                ...systemWeights.thin
              }}>
              Close
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});

    const newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    this.setState({
      location: location,
      region: newRegion
    });
    this.map.animateToRegion(newRegion, 500)
  };

  _onEmergencyPress() {
    this.setState({
      visibleEmergencyModal: true,
    })
  }

  render() {
    const points = this.state.points;
    console.log(points)
    return (

      <View style={styles.container}>
        <MapView
          ref={ref => {
              this.map = ref
          }}
          style={styles.map}
          initialRegion={this.state.initialRegion}
        >
        { points.length > 0 && points.map((fac, idx) => {
            return (
              <MapView.Marker
                key={idx}
                coordinate={{
                  latitude: Number(fac.latitude),
                  longitude: Number(fac.longitude)
                }}
                title={fac.name}
                description={`${fac.street}, ${fac.city}, ${fac.state} ${fac.zip}` + '\n' + fac.website}>
                <Entypo name="heart" size={30} color={'#ae88f7'} />
              </MapView.Marker>
            )
          })}
        </MapView>
        <SafeAreaView style={[styles.header, { shadowOpacity: 0.25 }]}>
          <View style={styles.innerHeader}>
              <Text
                  type="header2"
                  style={{ fontSize: 24, marginTop: 10 }}
              >
                  Treatment Finder
              </Text>
              <TouchableOpacity
                style={styles.viewChangeButton}>
                <View
                  style={styles.viewChangeButtonInnerView}>
                  <Text
                    style={{
                      fontSize: 16,
                      color:'white'
                    }}>
                    List View
                  </Text>
                </View>
              </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View>
          <GooglePlacesAutocomplete
             placeholder='Search'
             minLength={2} // minimum length of text to search
             autoFocus={false}
             returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
             listViewDisplayed='auto'    // true/false/undefined
             fetchDetails={true}
             renderDescription={row => row.description} // custom description render
             onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
               console.log(data, details);
             }}

             getDefaultValue={() => ''}
             currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
             currentLocationLabel="Current location"
             query={{
               key: 'AIzaSyDVKeZc1XhYcqxBr6DsB6VwAaVoCIp_1bQ',
               language: 'en', // language of the results
               types: '(cities)' // default: 'geocode'
             }}

             styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
              }}
          />
        </View>
        <View style={styles.searchButtonContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={{color:'white', fontSize:14}}>Search this area</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <FilterIcon title={'MAT Physicians'} color={'#5e8af2'} iconName={'creative-commons-attribution'}/>
          <FilterIcon title={'Recovery Centers'} color={'#ae88f7'} iconName={'heart'}/>
          <TouchableOpacity onPress={() => this._onEmergencyPress()} style={[styles.bubble, styles.button]}>
            <View style={styles.urgent} >
              <MaterialCommunityIcons name="phone-outgoing" size={50}/>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.loading &&
            <View style={styles.loading}>
              <ActivityIndicator size='large' />
            </View>
        }
        <Modal isVisible={this.state.visibleEmergencyModal}>
          {this._renderModalEmergencyContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
  header: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
    zIndex: 10000
  },
  innerHeader: {
    marginHorizontal: Theme.spacing.base,
    marginVertical: Theme.spacing.tiny,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewChangeButton:{
    width: 95,
    marginTop: 18
  },
  viewChangeButtonInnerView:{
    backgroundColor: Theme.palette.nextstepIconBlue,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },
  button:{
    width: 70,
    height: 70,
    paddingHorizontal: 10,
    shadowOpacity: 0.25,
  },
  bubble:{
    backgroundColor: '#ffa64d',
    paddingVertical: 12,
    borderRadius: 20,
  },
  urgent:{
    alignItems:'center',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer:{
    marginBottom: 15,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 5
  },
  searchButton:{
    width:150,
    backgroundColor:Theme.palette.nextstepIconBlue,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 7,
    shadowOpacity: 0.25
  },
  searchButtonContainer:{
    alignItems: 'center',
    marginTop: 60,
  }
});
