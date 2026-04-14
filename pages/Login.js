// pages/Login.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '../components/Container';
import Input from '../components/Input';
import Botao from '../components/Botao';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [showSenha, setShowSenha] = useState(false);

  // Verificar se já existe token salvo ao abrir o app
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('@auth_token');
        const userData = await AsyncStorage.getItem('@user');
        
        if (token && userData) {
          // Token existe, redirecionar para Home
          console.log('Token encontrado, redirecionando...');
          navigation.replace('Home');
        }
      } catch (error) {
        console.log('Erro ao verificar token:', error);
      } finally {
        setCheckingToken(false);
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://10.0.2.2:8000/api/login', {
        email: email,
        password: password,
      });

      console.log('Resposta:', response.data);

      if (response.data.success) {
        // Salvar token e dados do usuário
        await AsyncStorage.setItem('@auth_token', response.data.token);
        await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
        
        Alert.alert('Sucesso', 'Login realizado!');
        navigation.replace('Home');
      } else {
        Alert.alert('Erro', response.data.message || 'Falha no login');
      }
    } catch (error) {
      console.log('Erro:', error.response?.data || error.message);
      
      if (error.response?.data?.message) {
        Alert.alert('Erro', error.response.data.message);
      } else if (error.response?.data?.errors) {
        const erros = Object.values(error.response.data.errors).flat();
        Alert.alert('Erro', erros.join('\n'));
      } else {
        Alert.alert('Erro', 'Erro ao fazer login. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Tela de carregamento enquanto verifica token
  if (checkingToken) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C757D" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          {/* Logo ou ícone */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MaterialIcons name="people" size={50} color="#495057" />
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>Rede Social</Text>
          
          {/* Subtítulo */}
          <View style={styles.subtitleContainer}>
            <MaterialIcons name="email" size={16} color="#6C757D" />
            <Text style={styles.subtitle}> Faça login para continuar</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            {/* E-mail */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="E-mail"
                placeholderTextColor="#ADB5BD"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            {/* Senha com botão de mostrar/ocultar */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="Senha"
                placeholderTextColor="#ADB5BD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showSenha}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowSenha(!showSenha)}
                style={styles.eyeIcon}
              >
                <MaterialIcons
                  name={showSenha ? 'visibility' : 'visibility-off'}
                  size={22}
                  color="#6C757D"
                />
              </TouchableOpacity>
            </View>

            {/* Botão Entrar */}
            <Botao
              txtBtn="ENTRAR"
              onPress={handleLogin}
              loading={loading}
            />

            {/* Divisor "ou" */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Botão Google */}
            <TouchableOpacity 
              style={styles.googleButton}
              onPress={() => Alert.alert('Google', 'Funcionalidade em breve')}
            >
              <MaterialIcons name="android" size={24} color="#6C757D" />
              <Text style={styles.googleButtonText}>Continuar com Google</Text>
            </TouchableOpacity>

            {/* Link para cadastro */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Não possui conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.registerLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>

            {/* Link esqueceu senha */}
            <TouchableOpacity 
              style={styles.forgotContainer}
              onPress={() => Alert.alert('Recuperar senha', 'Funcionalidade em breve')}
            >
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#6C757D',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    height: 50,
    position: 'relative',
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#212529',
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
    padding: 5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9ECEF',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#6C757D',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#6C757D',
    fontSize: 14,
  },
  registerLink: {
    color: '#495057',
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgotContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  forgotText: {
    color: '#495057',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});