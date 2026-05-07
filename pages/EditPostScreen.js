import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../app/services/api';

export default function EditPostScreen({ navigation, route }) {
  const post = route?.params?.post || {};
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setCategory(post.category || '');
    }
  }, [post]);

  const salvarEdicao = async () => {
    if (!title.trim() || !content.trim() || !category.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (!post?.id) {
      Alert.alert('Erro', 'Post não encontrado');
      return;
    }

    setLoading(true);
    console.log('Iniciando edição do post:', post.id);

    try {
      console.log('Enviando dados para atualização:', {
        title: title.trim(),
        content: content.trim(),
        category: category.trim(),
      });

      const response = await api.put(`/posts/${post.id}`, {
        title: title.trim(),
        content: content.trim(),
        category: category.trim(),
      });

      console.log('Post atualizado com sucesso:', response.data);
      Alert.alert('Sucesso', 'Post atualizado!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao editar post:', error);
      Alert.alert('Erro', 'Erro ao atualizar post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Post</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Digite o título"
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Digite a categoria"
        />

        <Text style={styles.label}>Conteúdo</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={content}
          onChangeText={setContent}
          placeholder="Digite o conteúdo"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={salvarEdicao}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    color: '#007bff',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});