```js
import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// Query Parameters: URL Stateful => Filtros, Paginação, não-obrigatórios
// http://localhost:3333/users?userId=1&username=Jady

// Route Parameters: Identificação de Recursos =>
// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// Request Body => Envio de informações de formulário

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path) // match executa a regex e retorna um array com os dados

    /* 
      O operador de propagação ... é usado para extrair todas as propriedades 
      e seus valores de routeParams.groups e colocá-los em um novo objeto. 
      Assim, const params = { ...routeParams.groups } cria um novo objeto 
      params que tem exatamente as mesmas propriedades e valores que 
      routeParams.groups
    */

    // console.log(routeParams.groups) ==>  { query: '?search=Louise&page=2' }
    // console.log(extractQueryParams(routeParams.groups.query)) ==> { search: 'Louise', page: '2' }

    //req.params = { ...routeParams.groups } // passo o valor para dentro do req.params para conseguir resgatar o id em routes.js

    const { query, ...params } = routeParams.groups

    req.params = params

    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
```
