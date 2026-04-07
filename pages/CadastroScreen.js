// pages/CadastroScreen.js
import React, { useState } from 'react';
import axios from 'axios';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  const validarFormulario = () => {
    const novosErros = {};
    let valido = true;

    if (!name.trim()) {
      novosErros.nome = 'Nome é obrigatório';
      valido = false;
    }

    if (!email.trim()) {
      novosErros.email = 'E-mail é obrigatório';
      valido = false;
    } else if (!email.includes('@')) {
      novosErros.email = 'E-mail inválido';
      valido = false;
    }

    if (!cpf.trim()) {
      novosErros.cpf = 'CPF é obrigatório';
      valido = false;
    }

    if (!birth_date.trim()) {
      novosErros.birth_date = 'Data de nascimento é obrigatória';
      valido = false;
    }

    if (!phone.trim()) {
      novosErros.telefone = 'Telefone é obrigatório';
      valido = false;
    }

    if (!password) {
      novosErros.senha = 'Senha é obrigatória';
      valido = false;
    } else if (password.length < 6) {
      novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
      valido = false;
    }

    setErrors(novosErros);
    return valido;
  };

  function formatoApi(data) {
    if (!data) return null;
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  }

  async function handleCadastro() {
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    const values = {
      name: name,
      email: email,
      cpf: cpf,
      birth_date: formatoApi(birth_date),
      phone: phone,
      password: password,
      password_confirmation: password, // ✅ ADICIONE ESTA LINHA
    };

    // Se tiver avatar, adiciona (opcional)
    if (avatar) {
      values.avatar = avatar;
    }

    try {
      // ✅ ALTERE APENAS A URL: remova "/regular"
      const response = await axios.post("http://10.0.2.2:8000/api/register", values);
      console.log(response.data);

      Alert.alert('Sucesso', 'Conta criada com sucesso');
      navigation.replace('Login');
    } catch (error) {
      console.log("ERRO", error.response?.data?.errors || error.message);

      if (error.response?.data?.errors) {
        const erros = Object.values(error.response.data.errors).flat();
        Alert.alert('Erro', erros.join('\n'));
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar usuário');
      }
    } finally {
      setLoading(false);
    }
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
                value={name}
                onChangeText={(text) => setName(text)}
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
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
            <ErrorMessage message={errors.email} />

            {/* Cpf */}
            <View style={[styles.inputContainer, errors.cpf && styles.inputContainerError]}>
              <MaterialIcons name="badge" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="CPF"
                placeholderTextColor="#ADB5BD"
                value={cpf}
                onChangeText={(text) => setCpf(text)}
                keyboardType="numeric"
                maxLength={14}
                style={styles.input}
              />
            </View>
            <ErrorMessage message={errors.cpf} />

            {/* Data de nascimento */}
            <View style={[styles.inputContainer, errors.birth_date && styles.inputContainerError]}>
              <MaterialIcons name="calendar-today" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="Data de nascimento (DD/MM/AAAA)"
                placeholderTextColor="#ADB5BD"
                value={birth_date}
                onChangeText={(text) => setBirthDate(text)}
                keyboardType="numeric"
                maxLength={10}
                style={styles.input}
              />
            </View>
            <ErrorMessage message={errors.birth_date} />

            {/* Telefone */}
            <View style={[styles.inputContainer, errors.telefone && styles.inputContainerError]}>
              <MaterialIcons name="phone" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="(99) 99999-9999"
                placeholderTextColor="#ADB5BD"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
                maxLength={15}
                style={styles.input}
              />
            </View>
            <ErrorMessage message={errors.telefone} />

            {/* Avatar */}
            <View style={[styles.inputContainer, errors.avatar && styles.inputContainerError]}>
              <MaterialIcons name="person" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="Avatar"
                placeholderTextColor="#ADB5BD"
                value={avatar}
                onChangeText={(text) => setAvatar(text)}
                style={styles.input}
              />
            </View>
            

            {/* Senha */}
            <View style={[styles.inputContainer, errors.senha && styles.inputContainerError]}>
              <MaterialIcons name="lock" size={20} color="#6C757D" style={styles.inputIcon} />
              <Input
                placeholder="Senha"
                placeholderTextColor="#ADB5BD"
                value={password}
                onChangeText={(text) => setPassword(text)}
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