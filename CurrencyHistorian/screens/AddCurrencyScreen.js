// screens/AddCurrencyScreen.js

import React, { Component } from "react";
import { Button, StyleSheet, TextInput, ScrollView, Text,ActivityIndicator, View, Switch,SafeAreaView } from 'react-native';
import firebase from '../database/firebaseDb';
import props from 'prop-types';
class AddCurrencyScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('currencies');
    this.state = {

      Date: '',
      Currency: '',
      ID:'',
      Description: '',
      ImgURL: '',
      Status: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeCurrency() {
    if(this.state.Currency === ''){
     alert('Fill at least your Currency Name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        Date: new Date(),
        Currency: this.state.Currency,
        ID: Math.floor(Math.random() * 100) + 1,
        Description: this.state.Description,
        ImgURL: this.state.ImgURL,
        Status: this.state.Status
      }).then((res) => {
        this.setState({
            Date: '',
            Currency: '',
            ID:'',
            Description: '',
            ImgURL: '',
            Status: '',
            isLoading: false
        });
        this.props.navigation.navigate('CurrencyScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }
  cancelUpdateCurrency() {
    //props.navigator.navigate('CurrencyScreen');
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Currency Name'}
              value={this.state.Currency}
              onChangeText={(val) => this.inputValueUpdate(val, 'Currency')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Description'}
              value={this.state.Description}
              onChangeText={(val) => this.inputValueUpdate(val, 'Description')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'ImgURL'}
              value={this.state.ImgURL}
              onChangeText={(val) => this.inputValueUpdate(val, 'ImgURL')}
          />
        </View>
        <View style={styles.container}>  
                <Text style={styles.textStyle}>Is the Currency still in circulation?</Text>  
                <Text style={styles.textStyle}>{this.state.Status ? true : false}</Text>  
                <Switch  
                    value={this.state.Status}  
                    onValueChange ={(Status)=>this.setState({Status})}/>  
        </View> 
        <View style={styles.button}>
          <Button
            title='Add Currency'
            onPress={() => this.storeCurrency()} 
            color="#19AC52"
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Cancel'
            onPress={() => this.props.navigation.navigate('CurrencyScreen')}
            color="#f2d213"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddCurrencyScreen;
