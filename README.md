📌 Sobre o projeto

Aplicativo mobile desenvolvido em React Native com o objetivo de consumir uma API REST para autenticação e gerenciamento de conteúdo de uma rede social focada em ONGs e Organizações.


🎯 Objetivo (MVP)

    ✅ Realizar cadastro de usuários (Usuários Comuns)

    ✅ Autenticar usuário (login/logout)

    ✅ Armazenar token localmente (AsyncStorage)

    ✅ Consumir dados da API (posts, ONGs)

    ✅ Splash Screen com verificação de token

    ✅ Interface responsiva e amigável

🚀 Tecnologias utilizadas
Tecnologia	Versão	            Descrição
React Native	0.72+	        Framework para desenvolvimento mobile
Expo	49+	                    Plataforma para desenvolvimento React Native
Axios	1.6+	                Cliente HTTP para requisições à API
AsyncStorage	1.19+	        Armazenamento local de dados (token)
React Navigation	6.x	        Navegação entre telas
Expo Vector Icons	-	        Ícones personalizáveis




📲 Funcionalidades implementadas


🔐 Autenticação

    ✅ Tela de Splash Screen com verificação de token

    ✅ Tela de Login (integrada com API)

    ✅ Tela de Cadastro de usuários

    ✅ Validação de formulários

    ✅ Persistência de token com AsyncStorage

    ✅ Logout com remoção de token

🏠 Home

    ✅ Exibição do nome do usuário logado

    ✅ Cards de funcionalidades

    ✅ Feed de atividades (exemplo)

    ✅ Barra de navegação inferior

🔌 Integração com API

    ✅ Consumo de endpoints REST

    ✅ Tratamento de erros (401, 422, 500)

    ✅ Interceptor para adicionar token automaticamente

⚙️ Como executar o projeto
Pré-requisitos

    Node.js (versão 16 ou superior)

    npm ou yarn

    Expo CLI

    Emulador Android/iOS ou dispositivo físico com Expo Go


Passos para instalação
    # Clonar repositório
    git clone https://github.com/seu-usuario/ongs-app
    cd ongs-app

    # Instalar dependências
    npm install

    # Instalar dependências específicas
    npx expo install @react-native-async-storage/async-storage axios
    npx expo install @react-navigation/native @react-navigation/native-stack
    npx expo install expo-vector-icons

    # Iniciar projeto
    npx expo start

Configuração da API

No arquivo app/services/api.js, configure a URL base da sua API:
    // Para emulador Android
    const API_URL = 'http://10.0.2.2:8000/api';

    // Para dispositivo físico (mesma rede WiFi)
    // const API_URL = 'http://192.168.x.x:8000/api';


Estrutura do projeto

    app/
    ├── assets/
    │   └── logo.png
    ├── components/
    │   ├── Container.js      # Componente container principal
    │   ├── Input.js          # Campo de entrada estilizado
    │   ├── Botao.js          # Botão customizado
    │   └── ErrorMessage.js   # Mensagem de erro
    ├── pages/
    │   ├── Splash.js         # Tela de abertura
    │   ├── Login.js          # Tela de login
    │   ├── CadastroScreen.js # Tela de cadastro
    │   └── Home.js           # Tela principal
    ├── services/
    │   └── api.js            # Configuração do Axios
    └── navigation/
        └── AppNavigator.js   # Configuração de navegação


🔌 Integração com API

A aplicação consome uma API REST desenvolvida em Laravel.


📬 Endpoints utilizados
Método	    Endpoint	        Descrição
POST	    /api/register	    Cadastro de usuário
POST	    /api/login	        Autenticação
GET	        /api/me	            Dados do usuário logado
GET	        /api/posts	        Listagem de posts
GET	        /api/ongs	        Listagem de ONGs

🔑 Headers de autenticação

Após o login, o token é armazenado no AsyncStorage e enviado automaticamente em todas as requisições:

headers: {
  'Authorization': 'Bearer {token}',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}



📋 Tratamento de erros

A API retorna códigos HTTP padrão:
Código	    Significado	        Ação no App
200	        Sucesso	            Processar dados
201	        Criado	            Redirecionar
401	        Não autenticado	    Redirecionar para Login
403	        Sem permissão	    Exibir alerta
422	        Erro de validação	Exibir erros campo a campo
500	        Erro no servidor	Exibir mensagem amigável



🎨 Telas do aplicativo

Splash Screen

    Exibe logo e nome do app

    Verifica se usuário possui token salvo

    Redireciona automaticamente para Home ou Login

Login

    Campos: E-mail, Senha

    Validação de campos obrigatórios

    Exibição de erros da API

    Link para tela de cadastro

Cadastro

    Campos: Nome, E-mail, CPF, Data de Nascimento, Telefone, Senha

    Formatação de data para API (DD/MM/AAAA → YYYY-MM-DD)

    Validação de campos

    Tratamento de erros de validação

Home

    Saudação personalizada com nome do usuário

    Grid de funcionalidades

    Feed de atividades

    Barra de navegação inferior

    Logout com confirmação



📦 Dependências principais

    "dependencies": {
    "@react-navigation/bottom-tabs": "^7.15.3",
    "@react-navigation/native": "^7.1.31",
    "@react-navigation/native-stack": "^7.14.2",
    "axios": "^1.13.6",
    "expo": "~55.0.4",
    "expo-status-bar": "~55.0.4",
    "react": "19.2.0",
    "react-native": "0.83.2",
    "react-native-safe-area-context": "~5.6.2",
    "react-native-screens": "~4.23.0"
  },




  📱 Como testar


  Emulador Android

    Abra o Android Studio

    Inicie um emulador

    Execute npx expo start

    Pressione a para abrir no emulador

Dispositivo físico

    Instale o app Expo Go no celular

    Escaneie o QR code gerado pelo npx expo start

    Certifique-se de que celular e computador estão na mesma rede WiFi

Configuração de IP para dispositivo físico
No arquivo app/services/api.js, substitua o IP:

// Emulador Android
const API_URL = 'http://10.0.2.2:8000/api';

// Dispositivo físico (use o IP do seu computador)
const API_URL = 'http://192.168.1.100:8000/api';




Fluxo do aplicativo


App inicia
    ↓
Splash Screen (verifica token)
    ↓
    ├── Token existe → vai para Home
    └── Token não existe → vai para Login
         ↓
    Login → salva token → vai para Home
         ↓
    Home → logout → remove token → volta para Login



    Possíveis melhorias futuras

    Tela de perfil do usuário

    Edição de dados do usuário

    Upload de foto de perfil

    Funcionalidade de curtir posts

    Comentários em tempo real

    Push notifications

    Dark mode

👨‍💻 Autores

Eric Luciano M. Dias
Guilherme de Oliveira Pinheiro