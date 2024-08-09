// Importa os módulos necessários
const { WebSocketServer } = require('ws') // Módulo WebSocket para criar um servidor WebSocket
const http = require('http')              // Módulo HTTP para criar um servidor HTTP
const uuidv4 = require('uuid').v4         // Função para gerar UUIDs únicos
const url = require('url')                // Módulo URL para manipular URLs

// Cria um servidor HTTP básico
const server = http.createServer()

// Cria um servidor WebSocket associado ao servidor HTTP
const wsServer = new WebSocketServer({ server })

// Define a porta em que o servidor WebSocket vai rodar
const port = 8000

// Objeto para armazenar as conexões ativas, identificadas por UUIDs
const connections = {}

// Objeto para armazenar informações dos usuários conectados, identificadas por UUIDs
const users = {}

// Função que lida com mensagens recebidas de um cliente WebSocket
const handleMessage = (bytes, uuid) => {
  // Converte os bytes recebidos em uma string e então para um objeto JSON
  const message = JSON.parse(bytes.toString())

  // Obtém o usuário associado ao UUID da conexão
  const user = users[uuid]

  // Modifica a mensagem adicionando uma propriedade `test` com valor 5
  message.test = 5

  // Atualiza o estado do usuário com a nova mensagem recebida
  user.state = message 

  // Exibe no console que o estado do usuário foi atualizado
  console.log(`${user.username} updated their state: ${JSON.stringify(user.state)}`)

  // Envia o estado atualizado para todos os clientes conectados
  broadcast()
}

// Função que lida com o encerramento de uma conexão WebSocket
const handleClose = uuid => {
  // Exibe no console que o usuário se desconectou
  console.log(`${users[uuid].username} disconnected`)

  // Remove a conexão e o usuário do objeto de conexões e usuários
  delete connections[uuid]
  delete users[uuid]

  // Atualiza todos os clientes conectados com as novas informações (removendo o usuário desconectado)
  broadcast()
}

// Função que envia o estado atualizado de todos os usuários para todos os clientes conectados
const broadcast = () => {
  Object.keys(connections).forEach(uuid => {
    const connection = connections[uuid]
    const message = JSON.stringify(users)
    connection.send(message)
  })
}

// Evento que é disparado quando um novo cliente se conecta ao servidor WebSocket
wsServer.on('connection', (connection, request) => {
  // Extrai o nome de usuário dos parâmetros da URL da conexão
  const { username }  = url.parse(request.url, true).query

  // Exibe no console que o usuário se conectou
  console.log(`${username} connected`)

  // Gera um UUID único para a nova conexão
  const uuid = uuidv4()

  // Armazena a conexão e as informações do usuário nos respectivos objetos
  connections[uuid] = connection
  users[uuid] = {
    username,   
    state: {}
  }

  // Envia uma mensagem de boas-vindas ao novo cliente conectado
  connection.send(JSON.stringify({
    message: `Bem-vindo, ${username}!`,
    userId: uuid
  }))

  // Define o que acontece quando o servidor WebSocket recebe uma mensagem do cliente
  connection.on('message', message => handleMessage(message, uuid))

  // Define o que acontece quando a conexão com o cliente é fechada
  connection.on('close', () => handleClose(uuid))
})

// Inicia o servidor HTTP e WebSocket na porta especificada
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
})
