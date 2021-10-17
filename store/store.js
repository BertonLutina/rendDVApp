
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import {
  firebaseReducer
} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import { firestore,firebase } from '../auth/firebase'



// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
export const store = createStore(rootReducer, initialState);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

// Setup react-redux so that connect HOC can be used

