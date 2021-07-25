import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../config'

const bgImage = require('../assets/background2.png');
const appIcon = require('../assets/appIcon.png');
const appName = require('../assets/appName.png');

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      domState: 'normal',
      hasCameraPermissions: null,
      sacnned: false,
      bookId: '',
      studentId: '',
    };
  }

  getCameraPermissions = async (domState) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === 'granted',
      domState: domState,
      scanned: false,
    });
  };

  initiateBookIssue = () => {
    console.log("Book Issued to the Student")
  }

  initiateBookReturn = () => {
    console.log("Book returned to the library")
  }

  handleBarCodeScanned = async ({ type, data }) => {
    const { domState } = this.state;
    if (domState === 'bookId') {
      this.setState({
        bookId: data,
        domState: 'normal',
        scanned: true,
      });
    } else if (domState === 'studentId') {
      this.setState({
        studentId: data,
        domState: 'normal',
        scanned: true,
      });
    }
  };

  handleTransaction = ()=>{
    var {bookId} = this.state;
    db.collection('books').doc(bookId).get().then((doc)=>{
      var book = doc.data();
      if(book.is_book_available){
        this.initiateBookIssue();
      }
      else {
        this.initiateBookReturn();
      }
    })
  }

  render() {
    const {
      domState,
      hasCameraPermissions,
      bookId,
      studentId,
      scanned,
    } = this.state;

    if (domState != 'normal') {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <View style={styles.upperContainer}>
            <Image source={appIcon} style={styles.appIcon} />
            <Image source={appName} style={styles.appName} />
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                styles={styles.textInput}
                placeholder={'Bood ID'}
                placeholderTextColor={'red'}
                value={bookId}></TextInput>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => {
                  this.getCameraPermissions('bookId');
                }}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                styles={styles.textInput}
                placeholder={'Student ID'}
                placeholderTextColor={'red'}
                value={studentId}></TextInput>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => {
                  this.getCameraPermissions('studentId');
                }}>
                <Text style={styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, {marginTop:20}]}
            onPress={this.handleTransaction}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ab945b',
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: 'center',
  },

  textInputContainer: {
    width: '120%',
    backgroundColor: '#ccddcc',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#99aa99',
    marginTop: 20,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },

  textInput: {
    width: '60%',
    height: 35,
    backgroundColor: 'red',
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    fontFamily: 'Rajdhani',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },

  scanButton: {
    backgroundColor: 'yellow',
    height: 35,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  buttonText: {
    fontFamily: 'Rajdhani',
    fontSize: 20,
  },

  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
  },

  upperContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },

  appIcon: {
    width: 100,
    height: 100,
    marginTop: 10,
    resizeMode: 'contain',
  },

  appName: {
    height: 50,
    width: 100,
    marginTop: 20,
    resizeMode: 'contain',
  },
  button:{
    width: "60%",
    height: 50,
    justifyContent:"center",
    alignItems:"center",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "red"
  }
});
