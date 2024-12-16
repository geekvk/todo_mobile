import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { RED, WHITE } from '../utils/Colors';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../../firebase';

const RegisterSheet = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app)

  const handleRegister = () => {
    if(email == '' || password === ''){
      return alert('Password and Email are requred')
    }
    createUserWithEmailAndPassword(auth, email, password).then(() => {
        alert(`User ${email} is created`)
    }).catch((e) => {
      alert(e.message)
    })
  }
  return (
    <View style={styles.container}>
      <TextInput
          placeholder="Username"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity 
          style={styles.loginOption}
          onPress={handleRegister}
          >

              <Text style={{
              fontSize : 18,
              fontWeight : 'bold',
              textAlign : 'center',
              color : WHITE
          }}> Register </Text>
      </TouchableOpacity>
    </View>
  )
}

export default RegisterSheet

const styles = StyleSheet.create({
  container : {
    flex : 1,
    display : 'flex',
    alignItems : 'center',
    justifyContent: 'center',
    paddingVertical : 20
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    width : '80%'
  },
  loginOption : { 
    width : '80%',
    marginTop : 10,
    backgroundColor : RED,
    display : 'flex',
    alignItems : 'center',
    justifyContent: 'center',
    paddingVertical : 10,
    borderRadius : 20

  }
})