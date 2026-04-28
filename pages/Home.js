import { useState, useEffect, use } from "react";
import axios from "axios";
import Container from "../components/Container";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  Alert,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Lista(navigation) {
  const [dados, setDados] = useState([]);
  const [modal, setModal] = useState(false);
  const [recebeDado, setRecebeDado] = useState("");
  const [userName, setUserName] = useState("Usuário");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function Buscar() {
      try {
        const response = await axios.get("http://10.0.2.2:8000/api/feed");
        console.log("Resposta da API:", response.data.data);
        setDados(response.data.data);
      } catch (error) {
        console.error(
          "Erro ao buscar dados:",
          error?.response?.data || error.message,
        );
      }
    }
    loadUserData();
    Buscar();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        setRecebeDado(item);
        setModal(!modal);
      }}
    >
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.postAvatar}>
            <MaterialIcons name="person" size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.postUserName}>Usuário Exemplo</Text>
            <Text style={styles.postTime}>Há 2 horas</Text>
          </View>
        </View>
        <Text>{item.title}</Text>
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.postAction}>
            <MaterialIcons name="favorite-border" size={20} color="#6C757D" />
            <Text style={styles.postActionText}>Curtir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postAction}>
            <MaterialIcons
              name="chat-bubble-outline"
              size={20}
              color="#6C757D"
            />
            <Text style={styles.postActionText}>Comentar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postAction}>
            <MaterialIcons name="share" size={20} color="#6C757D" />
            <Text style={styles.postActionText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user");
      if (userData) {
        const user = JSON.parse(userData);
        // Pega o nome do usuário (pode ser 'name' para usuário comum ou 'ong_name' para ONG)
        setUserName(user.name || user.ong_name || "Usuário");
      }
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer logout
  const handleLogout = async () => {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            // Remover token e dados do usuário
            await AsyncStorage.removeItem("@auth_token");
            await AsyncStorage.removeItem("@user");
            navigation.replace("Login");
          } catch (error) {
            console.log("Erro ao fazer logout:", error);
          }
        },
      },
    ]);
  };

  return (
    <Container>
      <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.userName}>
            {loading ? "Carregando..." : userName}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="#6C757D" />
        </TouchableOpacity>
      </View>

      {/* Card de boas-vindas */}
      <View style={styles.welcomeCard}>
        <MaterialIcons name="celebration" size={40} color="#6C757D" />
        <Text style={styles.welcomeTitle}>Bem-vindo à Rede Social!</Text>
        <Text style={styles.welcomeText}>
          Conecte-se com amigos e compartilhe momentos especiais
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Feed de Atividades</Text>

      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={dados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        <Modal
          visible={modal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModal(!modal)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Detalhes do Post</Text>
                <TouchableOpacity onPress={() => setModal(false)}>
                  <MaterialIcons name="close" size={24} color="#6C757D" />
                </TouchableOpacity>
              </View>

              {/* Conteúdo */}
              <View style={styles.modalContent}>
                <Text style={styles.modalPostTitle}>{recebeDado.title}</Text>
                <Text style={styles.modalPostContent}>
                  {recebeDado.content}
                </Text>
              </View>

              {/* Botão */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModal(false)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={28} color="#6C757D" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="search" size={28} color="#ADB5BD" />
          <Text style={[styles.navText, styles.navTextInactive]}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="add-circle" size={28} color="#ADB5BD" />
          <Text style={[styles.navText, styles.navTextInactive]}>Postar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <MaterialIcons name="favorite" size={28} color="#ADB5BD" />
          <Text style={[styles.navText, styles.navTextInactive]}>
            Atividade
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={28} color="#ADB5BD" />
          <Text style={[styles.navText, styles.navTextInactive]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  greeting: {
    fontSize: 14,
    color: "#6C757D",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#E9ECEF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  welcomeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginTop: 10,
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 14,
    color: "#6C757D",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  gridItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },
  gridIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gridText: {
    fontSize: 12,
    color: "#6C757D",
    textAlign: "center",
  },
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6C757D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  postUserName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  postTime: {
    fontSize: 12,
    color: "#ADB5BD",
  },
  postContent: {
    fontSize: 14,
    color: "#212529",
    marginBottom: 15,
    lineHeight: 20,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    paddingTop: 10,
  },
  postAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  postActionText: {
    fontSize: 12,
    color: "#6C757D",
    marginLeft: 5,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 11,
    marginTop: 2,
    color: "#6C757D",
  },
  navTextInactive: {
    color: "#ADB5BD",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(159, 159, 159, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },

  modalContent: {
    marginBottom: 20,
  },

  modalPostTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 10,
  },

  modalPostContent: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
  },

  modalButton: {
    backgroundColor: "#6C757D",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
