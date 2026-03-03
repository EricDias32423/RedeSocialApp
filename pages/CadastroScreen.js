// pages/CadastroScreen.js
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
import ErrorMessage from '../components/ErrorMessage';

export default function CadastroScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const formatarTelefone = (text) => {
    const numeros = text.replace(/\D/g, '');
    if (numeros.length <= 11) {
      if (numeros.length <= 2) {
        return `(${numeros}`;
      } else if (numeros.length <= 7) {
        return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;
      } else {
        return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7,11)}`;
      }
    }
    return text;
  };

  const validarFormulario = () => {
    let novosErros = {};
    let valido = true;

    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
      valido = false;
    }

    if (!formData.email.trim()) {
      novosErros.email = 'E-mail é obrigatório';
      valido = false;
    } else if (!formData.email.includes('@')) {
      novosErros.email = 'E-mail inválido';
      valido = false;
    }

    if (!formData.telefone.trim()) {
      novosErros.telefone = 'Telefone é obrigatório';
      valido = false;
    } else if (formData.telefone.length < 14) {
      novosErros.telefone = 'Telefone incompleto';
      valido = false;
    }

    if (!formData.senha) {
      novosErros.senha = 'Senha é obrigatória';
      valido = false;
    } else if (formData.senha.length < 6) {
      novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
      valido = false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem';
      valido = false;
    }

    setErrors(novosErros);
    return valido;
  };

  const handleCadastro = () => {
    if (validarFormulario()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          'Sucesso!',
          'Cadastro realizado!',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      }, 1500);
    }
  };

  const handleChange = (field, value) => {
    if (field === 'telefone') {
      value = formatarTelefone(value);
    }
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
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
              <MaterialIcons name="person-add" size={50} color="#495057" />
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>Criar Conta</Text>
          
          {/* Subtítulo */}
          <View style={styles.subtitleContainer}>
            <MaterialIcons name="info" size={16} color="#6C757D" />
            <Text style={styles.subtitle}> Preencha seus dados</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            {/* Nome */}
            <View style={[styles.inputContainer, errors.nome && styles.inputContainerError]}>
              <MaterialIcons name="person" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="Nome completo"
                placeholderTextColor="#ADB5BD"
                value={formData.nome}
                onChangeText={(text) => handleChange('nome', text)}
                style={styles.input}
              />
            </View>
            <ErrorMessage message={errors.nome} />

            {/* E-mail */}
            <View style={[styles.inputContainer, errors.email && styles.inputContainerError]}>
              <MaterialIcons name="email" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="E-mail"
                placeholderTextColor="#ADB5BD"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
            <ErrorMessage message={errors.email} />

            {/* Telefone */}
            <View style={[styles.inputContainer, errors.telefone && styles.inputContainerError]}>
              <MaterialIcons name="phone" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="(99) 99999-9999"
                placeholderTextColor="#ADB5BD"
                value={formData.telefone}
                onChangeText={(text) => handleChange('telefone', text)}
                keyboardType="phone-pad"
                maxLength={15}
                style={styles.input}
              />
            </View>
            <ErrorMessage message={errors.telefone} />

            {/* Senha */}
            <View style={[styles.inputContainer, errors.senha && styles.inputContainerError]}>
              <MaterialIcons name="lock" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="Senha"
                placeholderTextColor="#ADB5BD"
                value={formData.senha}
                onChangeText={(text) => handleChange('senha', text)}
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
            <ErrorMessage message={errors.senha} />

            {/* Confirmar Senha */}
            <View style={[styles.inputContainer, errors.confirmarSenha && styles.inputContainerError]}>
              <MaterialIcons name="lock" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="Confirmar senha"
                placeholderTextColor="#ADB5BD"
                value={formData.confirmarSenha}
                onChangeText={(text) => handleChange('confirmarSenha', text)}
                secureTextEntry={!showConfirmSenha}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmSenha(!showConfirmSenha)}
                style={styles.eyeIcon}
              >
                <MaterialIcons
                  name={showConfirmSenha ? 'visibility' : 'visibility-off'}
                  size={22}
                  color="#6C757D"
                />
              </TouchableOpacity>
            </View>
            <ErrorMessage message={errors.confirmarSenha} />

            {/* Botão Cadastrar */}
            <Botao
              txtBtn="CADASTRAR"
              onPress={handleCadastro}
              loading={loading}
            />

            {/* Link para login */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Faça login</Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 40,
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
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    height: 50,
    position: 'relative',
  },
  inputContainerError: {
    borderColor: '#DC3545',
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  loginText: {
    color: '#6C757D',
    fontSize: 14,
  },
  loginLink: {
    color: '#495057',
    fontSize: 14,
    fontWeight: 'bold',
  },
});