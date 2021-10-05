import firebase from 'firebase'
import {Alert} from  'react-native'


export const SET_WHOLE_SERIE = 'SET_WHOLE_SERIE'
export const setWholeSerie = serie => ({
  type : SET_WHOLE_SERIE,
  serie
})



export const SET_SERIES = 'SET_SERIES'
const setSeries = series => ({
  type: SET_SERIES,
  series,
})



export const watchSeries = () => {
  const {currentUser} = firebase.auth()
  return  dispatch => {
    firebase
     .database()
     .ref(`/users/${currentUser.uid}/series`)
     .on('value', snapshot => {
        const series  = snapshot.val()
         const action = setSeries(series)
         dispatch(action)

     })
  }
}

export const  deleteSerie = serie => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Deleta',
        `Deseja deleta a serie ${serie.title}`,
        [{
          text: 'Nao',
          onPress:() => {
            resolve(false)
          },
          style: 'cancel'
        },{
          text:'Sim',
          onPress: async () => {
            const {currentUser} = firebase.auth()
            try {
              await firebase
              .database()
              .ref(`/users/${currentUser.uid}/series/${serie.id}`)
              .remove()
              resolve(true)
            } catch(e) {
                reject(e)
            }
          },
        }],
        {cancelable: false}
        )
    });
  };
}
