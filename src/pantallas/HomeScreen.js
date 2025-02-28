import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Platform } from 'react-native';

export default function HomeScreen({ navigation }) {
  const mostrar = require("../../assets/iconos/invisible.png");
  const ocultar = require("../../assets/iconos/mostrar-contrasena.png");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const validUser = 'isis';
    const validPassword = '210201';

    if (username === validUser && password === validPassword) {
      setIsLoggedIn(true);
      const sistemaOperativo = Platform.OS === 'ios' ? 'iOS' : 'Android';
      Alert.alert('Sistema Operativo', `Estás utilizando un dispositivo ${sistemaOperativo}`);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  if (isLoggedIn) {
    setUsername('');
    setPassword('');
    setIsLoggedIn(false);
    navigation.navigate('Principal');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={[styles.input]}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={[styles.input, { flex: 1 }]}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={showPassword ? mostrar : ocultar} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F161C',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#232a30',
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#232a30',
  },
  image: {
    width: 25,
    height: 25,
    tintColor: '#fff',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
