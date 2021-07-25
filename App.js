import React, { Component } from "react";
import BottomTabNavigator from "./components/BottomTabNavigator";
import * as Fonts from 'expo-font';
import { Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani';

export default class App extends Component {
  render() {
    const {fontLoaded} = this.state;
    if(fontLoaded){
      return <BottomTabNavigator />;
    }
    return null;
  }

  loadFonts = async ()=> {
     await Fonts.loadAsync({
       Rajdhani: Rajdhani_600SemiBold
     });
     this.setState({ fontLoaded: true })
  }

  componentDidMount(){
    this.loadFonts();
  }

  constructor(){
    super();
    this.state = {
      fontLoaded: false
    }
  }
}