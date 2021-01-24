// screens/CurrencyScreen.js

import React, { Component } from "react";
import { Alert, Button, StyleSheet, TextInput, Text,ScrollView, ActivityIndicator, View, Switch, SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from '../database/firebaseDb';

class CurrencyScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('currencies');
    this.state = {
      isLoading: true,
      currencyArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const currencyArr = [];
    querySnapshot.forEach((res) => {
      const { Data, Currency, Description, ID, ImgURL, Status } = res.data();
      currencyArr.push({
        key: res.id,
        res,
        Data,
        Currency,
        Description,
        ID,
        ImgURL,
        //Status,
      });
    });
    this.setState({
      currencyArr,
      isLoading: false,
   });
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
          {
            this.state.currencyArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.Currency}
                  subtitle={item.Description}
                  onPress={() => {
                    this.props.navigation.navigate('CurrencyDetailScreen', {
                      userkey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
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

export default CurrencyScreen;