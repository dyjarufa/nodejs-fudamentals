import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res) //? middlewares => são interceptadores, que recebem o "req" e "res"

  if (method === 'GET' && url === '/users') {
    /* 
      Posso também obter dados dos header do req(ex: req.headers) nesse caso enviados front-end para o backend
    */

    const users = database.select('users')

    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
