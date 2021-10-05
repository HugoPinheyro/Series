import React from 'react'
import {Text, View, Image, StyleSheet, Dimensions,TouchableOpacity} from 'react-native'


const AddSerieCard = ({ serie, isFirstColumn,  onPress}) => (
  <TouchableOpacity
    onPress={onPress}
      style={[styles.container,
        isFirstColumn ? styles.firstColumn : styles.lastColumn
    ]}>
      <View style={styles.card}>

        <Image source={require('../resources/add.png')}
          aspectRatio={1}
           resizeMode="cover"
           style={styles.Image}/>
        </View>
  </TouchableOpacity>

)


const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 5,
    height: Dimensions.get('window').width / 2
  },
   card: {
     flex: 1,
  },
Image: {
  width: '100%',
  height:'100%'
},

   firstColumn: {
     paddingLeft: 10,
   },

  lastColumn:{
    paddingRight: 10,
  },

})

export default AddSerieCard
