import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';

const BuscarCep = () => {
  // Estados principais
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);

  // Função async para buscar CEP
  async function Buscar() {
    // Remove formatação
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Validação simples
    if (cepLimpo.length !== 8) {
      Alert.alert('Erro', 'Digite um CEP válido com 8 números');
      return;
    }

    setLoading(true);

    try {
      // Usando const response = await axios.get
      const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      
      // Verifica se o CEP existe
      if (response.data.erro) {
        Alert.alert('CEP não encontrado');
        setEndereco(null);
      } else {
        // Armazena os dados
        setEndereco(response.data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar CEP</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={9}
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={Buscar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Buscar</Text>
        )}
      </TouchableOpacity>
      
      {endereco && (
        <View style={styles.resultado}>
          <Text style={styles.resultText}>CEP: {endereco.cep}</Text>
          <Text style={styles.resultText}>Rua: {endereco.logradouro}</Text>
          <Text style={styles.resultText}>Bairro: {endereco.bairro}</Text>
          <Text style={styles.resultText}>Cidade: {endereco.localidade}</Text>
          <Text style={styles.resultText}>UF: {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
});

export default BuscarCep;