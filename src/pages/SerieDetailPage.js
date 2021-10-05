import React from 'react'
import {ScrollView, Text, StyleSheet,Image, Button ,View} from 'react-native'

import Line from '../components/Line'
import LongText from '../components/LongText'

import {connect} from 'react-redux'
import {deleteSerie} from '../actions'


class SerieDetailPage extends React.Component {
  render() {
     const {navigation} = this.props
        const  {serie} = navigation.state.params

      return (
        <ScrollView>
            {
             serie.img64  ? <Image
                    style={styles.image}
                    source={{uri: `data:image/jpeg;base64, ${serie.img64}`}}/> : null
             }
                <Line label ='Title' content={serie.title}/>
                <Line label ='Genero' content={serie.gender}/>
                <Line label ='Nota' content={serie.rate}/>
                <LongText label ='Descriçao' content={serie.description}/>
                <View style={styles.button}>
                    <Button title="Editar"
                    onPress={() => {
                      navigation.replace('SerieForm', { serieToEdit: serie })
                    }}/>
                </View>

                <View style={styles.button}>
                    <Button title="Deleta"
                    color='#FF0004FF'
                    onPress={async  () => {
                      const hasDeleted = await this.props.deleteSerie(serie)
                      if(hasDeleted) {
                        navigation.goBack();
                      }
                    }}/>
                </View>

        </ScrollView>

    )
  }
}






const styles = StyleSheet.create({
image: {
  aspectRatio: 1,
},
button: {
  margin: 10
}

})


export default connect(null, {deleteSerie})(SerieDetailPage)
