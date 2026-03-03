// pages/Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Container from '../components/Container';
import Input from '../components/Input';
import Botao from '../components/Botao';

export default function Login({ navigation }) {
  const [formData, setFormData] = useState({
    usuario: '',
    senha: '',
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
  if (!formData.usuario || !formData.senha) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }

  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    // Mudar para Home em vez de só mostrar alerta
    navigation.replace('Home');
  }, 1500);
};
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

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
            <Text style={styles.subtitle}> Email, telefone ou usuário</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="Email, telefone ou usuário"
                placeholderTextColor="#ADB5BD"
                value={formData.usuario}
                onChangeText={(text) => handleChange('usuario', text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="Senha"
                placeholderTextColor="#ADB5BD"
                value={formData.senha}
                onChangeText={(text) => handleChange('senha', text)}
                secureTextEntry
                style={styles.input}
              />
            </View>

            {/* Botão Entrar */}
            <Botao
              txtBtn="Entrar"
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
              onPress={() => Alert.alert('Google', 'Login com Google')}
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
              onPress={() => Alert.alert('Recuperar', 'Esqueceu a senha')}
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
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#212529',
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