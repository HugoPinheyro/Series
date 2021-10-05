import { StatusBar } from 'expo-status-bar';
import {createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginPage from './pages/LoginPage'
import SeriesPage from './pages/SeriesPage'
import SerieDetailPage from './pages/SerieDetailPage'
import SerieFormPage from './pages/SerieFormPage'
import AddSerieCard from './components/AddSerieCard'
const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      title: 'Bem vindo!'
    }
  },
  'Main' : {
    screen: SeriesPage
  },


  'SerieForm': {
    screen: SerieFormPage,
      navigationOptions: ({ navigation }) => {
        if(navigation.state.params && navigation.state.params.serieToEdit) {
          return {
            title: navigation.state.params.serieToEdit.title
          }
        }
        return {
            title: 'Nova serie'
        };
  }
},


  'SerieDetailPage': {
    screen: SerieDetailPage, navigationOptions: ({ navigation }) => {
      const {serie} = navigation.state.params
      return {
        title: serie.title
      }
    }
  }

}, {
  defaultNavigationOptions:{
    title: 'Series!',
    headerTintColor:'white',
    headerStyle:{
      backgroundColor: '#08c',
      borderBottomWidth: 1,
      borderBottomColor:'#ccc'
    },
    headerTitleStyle:{
      color: 'white',
      fontSize: 30,
    }
  }

})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
