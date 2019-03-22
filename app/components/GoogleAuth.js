import React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { GoogleSignin } from 'react-native-google-signin'
import firebase from 'react-native-firebase'

// https://medium.com/@chrisbianca/getting-started-with-firebase-authentication-on-react-native-a1ed3d2d6d91
const onLoginOrRegister = () => {
  GoogleSignin.signIn()
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // Login with the credential
      return firebase.auth().signInWithCredential(credential)
    })
    .then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
      console.log(user)
    })
    .catch((error) => {
      const { code, message } = error
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
      console.log(message)
    })
}

const onLogout = () => {
  console.log('Log out!')
  GoogleSignin.signOut()
    .then(firebase.auth().signOut)
    .then(firebase.auth().signInAnonymously)
}

export default GoogleAuth = (props) => {
  return props.isLoggedIn ? (
    <View>
        <TouchableOpacity
          onPress={onLogout}
          style={{
          }}
        >
          <Text>Log out</Text>
        </TouchableOpacity>
    </View>
  ) : (
    <View>
      <TouchableOpacity
        onPress={onLoginOrRegister}
        style={{
          marginBottom: 40,
          marginLeft: 20,
          marginRight: 20
        }}>
        <View style={{
          flex: 1,
          flexDirection: 'row'
        }}>
          <Image
            source={require('../img/google-logo.png')}
            width={24}
            height={24}
            style={{
              width: 24,
              height: 24,
              marginRight: 12
            }}
          />
          <Text style={{
            fontFamily: 'IBMPlexMono',
            textAlign: 'left',
            fontSize: 16,
            textDecorationLine: 'underline',
            color: '#B61C2D'
          }}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
