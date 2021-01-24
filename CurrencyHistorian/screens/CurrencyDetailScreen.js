// screens/CurrencyDetailScreen.js

import React, { Component } from "react";

import { Alert, Button, StyleSheet, TextInput, Text, ScrollView, ActivityIndicator, View, Switch, SafeAreaView } from 'react-native';
import firebase from '../database/firebaseDb';

class CurrencyDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      Currency: '',
      Data:'',
      Description: '',
      ID: '',
      ImgURL: '',
      Status: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('currencies').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const currency = res.data();
        this.setState({
          key: res.id,
          Data: currency.Data,
          Currency: currency.Currency,
          ID: currency.ID,
          Description: currency.Description,
          ImgURL: currency.ImgURL,
          Status: currency.Status,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateCurrency() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('currencies').doc(this.state.key);
    updateDBRef.set({
      Data: new Date(),
      Currency: this.state.Currency,
      ID: Math.floor(Math.random() * 100) + 1,
      Description: this.state.Description,
      ImgURL: this.ImgURL,
      Status: this.Status

    }).then((docRef) => {
      this.setState({
        key: '',
        Data: '',
        Currency: '',
        ID:'',
        Description: '',
        ImgURL: '',
        Status: '',
        isLoading: false,
      });
      this.props.navigation.navigate('CurrencyScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteCurrency() {
    const dbRef = firebase.firestore().collection('currencies').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Currency removed from database')
          this.props.navigation.navigate('CurrencyScreen');
      })
  }

  cancelUpdateCurrency() {
        //props.navigation.navigate('CurrencyScreen');
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Currency',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteCurrency()},
        {text: 'No', onPress: () => console.log('No Currency was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
              placeholder={'Currency'}
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
            title='Update'
            onPress={() => this.updateCurrency()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View>
        <View>
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
  },
  button: {
    marginBottom: 7, 
  }
})

export default CurrencyDetailScreen;