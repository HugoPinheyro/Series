import React,{Component} from 'react'
import {View, Text, TextInput, StyleSheet,Button,ActivityIndicator,Alert } from 'react-native'

import FormRow from '../components/FormRow';
import firebase from 'firebase/app';
import 'firebase/database'


import {tryLogin} from '../actions'
import {connect} from 'react-redux'

 class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state= {mail: '' , password: '' , isLoading: false, message: ''}
  }

 componentDidMount() {
   if (firebase.apps.length === 0) {
    firebase.initializeApp({
       apiKey: "AIzaSyBWWXo9k12mAEdUb7UY9sAbMQ331AcvjHw",
       authDomain: "series-de4c6.firebaseapp.com",
       databaseURL:"https://series-de4c6-default-rtdb.firebaseio.com/",
       projectId: "series-de4c6",
       storageBucket: "series-de4c6.appspot.com",
       messagingSenderId: "364663870449",
       appId: "1:364663870449:web:cfb32a65c013e94996aa50"

      });
   }
}







onChangeHandler(field, value) {
  this.setState({
    [field]: value
  })
}

tryLogin() {

 this.setState({isLoading: true, message: ''})
  const {mail: email, password} = this.state;

  this.props.tryLogin({email, password})
  .then(user => {
    if(user)
    return   this.props.navigation.replace('Main')
    this.setState({
      isLoading:false,
      message: ''
    })
  })
  .catch(error =>  {
    this.setState({
      isLoading:false,
      message: this.getMessageByErrorCode(error.code)
      })
  })
}




/*'huggpy@gmail.com', '529131800h')*/

getMessageByErrorCode(errorCode) {
  switch (errorCode) {
    case 'auth/wrong-password':
        return 'Senha incorreta';
    case 'auth/user-not-found':
        return 'Ususario nao encontrado';
    default:
        return 'Erro desconhecido';

  }
}



renderMessage() {
 const {message} = this.state
 if(!message)
  return null;

  return(
    <View>
        <Text>{message}</Text>
    </View>

  )
}


renderButton() {
  if (this.state.isLoading)
  return <ActivityIndicator/>
  return (
    <Button onPress={() => this.tryLogin()} title='Entrar'/>

  );
}


render() {
    return (
      <View style={styles.container}>
         <FormRow first>
            <TextInput style={styles.input}
             placeholder="User@email.com"
             value={this.state.mail}
             onChangeText={value => this.onChangeHandler('mail', value)}
              keyboardType="email-address"
              autoCapitalize="none"
             />
        </FormRow>
        <FormRow last>
           <TextInput  style={styles.input}
           placeholder='********'
           secureTextEntry
           value={this.state.password}
           onChangeText={value => this.onChangeHandler('password',value)}/>
       </FormRow>
        <View >
            {this.renderButton()}
            {this.renderMessage()}
        </View>
      </View>
        );
    }

 }

 const styles = StyleSheet.create({
container: {

  paddingLeft:5,
  paddingRight:5
  },
   input: {
     paddingLeft:5,
     paddingRight:5,
     paddingBottom:5,

   },


 })


 export default connect(null, {tryLogin})(LoginPage)
