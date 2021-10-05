import React from 'react'
import { ScrollView, StyleSheet, Text, View,
 TextInput, Picker, Button, KeyboardAvoidingView,
 Image, ActivityIndicator, Alert} from 'react-native'

import FormRow from '../components/FormRow'
import {connect} from 'react-redux'
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';

import {setField, saveSerie, setWholeSerie, resetForm} from '../actions'

class SerieFormPage extends React.Component {
constructor(props) {
  super(props)
   this.state = { isLoading: false}
}

componentDidMount() {
  const {navigation, setWholeSerie, resetForm} = this.props
  const {params} = navigation.state;
  if (params && params.serieToEdit) {
    return setWholeSerie(params.serieToEdit);
  }
    return resetForm;
}

async pickImage(){
  const {status, permissions} = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
    Permissions.CAMERA
  )
     if(status !== 'granted') {
  Alert.alert('voce precisa permiitir o acesso')
  return ;
 }
const result = await ImagePicker.launchCameraAsync({
  quality:0.2,
  base64:true,
  allowsEditing: true,
  aspect: [1, 1]
})



if(!result.cancelled) {
  this.props.setField('img64',result.base64)

  }

}






  render() {
      const {serieForm, navigation, setField, saveSerie} = this.props
        return (
          <KeyboardAvoidingView behavior='padding' enabled
            KeyboardVerticalOfset={5}>
                <ScrollView>
                  <FormRow first>
                      <TextInput
                      style={styles.input}
                      placeholder='Titulo'
                      value={serieForm.title}
                      onChangeText={value => setField('title', value)}/>
                  </FormRow>
                  <FormRow>
                  { serieForm.img64
                     ? <Image
                     source={{
                       uri: `data:image/jpeg;base64, ${serieForm.img64}`
                     }}
                     style={styles.img} />
                    : null
                  }
                      <Button title="Selecione uma imagem"
                      onPress={() => this.pickImage()}/>

                  </FormRow>
                  <FormRow>
                    <Picker
                        selectedValue={serieForm.gender}
                        onValueChange={itemValue => setField('gender', itemValue)}  >
                        <Picker.Item label="Policial" value="Policial" />
                        <Picker.Item label="Comedia" value="Comédia" />
                        <Picker.Item label="Terror" value="Terror" />
                      </Picker>
                  </FormRow>

                  <FormRow>
                      <View style={styles.sameRow}>
                          <Text>Nota: </Text>
                          <Text>{serieForm.rate}</Text>
                      </View>

                    </FormRow>

                    <FormRow >
                        <TextInput
                        style={styles.input}
                        placeholder='Descriçao'
                        value={serieForm.description}
                        onChangeText={value => setField('description', value)}
                        numberOfLines={4}
                        multiline={true}/>
                    </FormRow>
                    {
                        this.state.isLoading
                        ? <ActivityIndicator/>
                        : <Button title='Salvar'
                            onPress={ async () => {
                              this.setState({ isLoading:true})
                              try{
                                await saveSerie(serieForm);
                                  navigation.goBack()
                                 } catch(error) {
                                   Alert.alert('Erro!', error.message)
                                 } finally{
                                  this.setState({isLoading:false})
                              }
                           }} />
                    }

              </ScrollView>
          </KeyboardAvoidingView>


      );
    }
}


const styles = StyleSheet.create({
 input: {
   paddingLeft:5,
   paddingRight: 5,
   paddingBottom: 5
 },

sameRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 10
},
img: {
  aspectRatio: 1,
  width: '100%'
}


})
function mapStateToProps(state) {
  return {
    serieForm: state.serieForm
  }
}

const mapDispatchToProps = {
 setField,
 saveSerie,
 setWholeSerie,
 resetForm,
}



export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage)
