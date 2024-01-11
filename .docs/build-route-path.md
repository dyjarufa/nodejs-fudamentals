# code

```js
export function buildRoutePath(path) {
  const routeParametersRegex = /(:[a-zA-Z]+)/g

  // em regex é possível nomear grupos com o uso do ?<id> ex: '(?<id>[a-z0-9-_]+)'

  // outra forma seria apenas usar o $1, e dessa forma ele nomeia o grupo encontrada de acordo com o nome declarado na rota => ex: '/users/:id'

  // nesse caso o nome seria "id", conforme encontrado na regex "routeParametersRegex"

  /* 
      exemplo de saída caso o a minha rota fosse: 
      path: buildRoutePath('/users/:id/groups/:groupId'),

      groups: [Object: null prototype] {
          id: '74262f5f-81e7-4391-9c55-7cca74a5bee4',
          groupId: '2020'
  }  */

  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9-_]+)'
  )

  // o caractere "^" informa aqui que a string precisa começar com essa regex. Se omitido ele interpreta que contém essa regex
  const pathRegex = new RegExp(`^${pathWithParams}`)

  return pathRegex

  // const test = /\/users\/([a-z0-9-_]+)/
}
```

# Função `buildRoutePath` em JavaScript

## Descrição

A função `buildRoutePath` é usada para construir uma expressão regular a partir de um caminho de rota fornecido.
Ela é útil para manipular e identificar parâmetros dinâmicos em rotas de aplicações web.

## Código

```javascript
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9-_]+)'
  )
  const pathRegex = new RegExp(`^${pathWithParams}`)
  return pathRegex
}
```

# Função `buildRoutePath` em JavaScript

## Descrição

A função `buildRoutePath` é projetada para transformar um caminho de rota, com parâmetros nomeados, em uma expressão regular. Esta função é amplamente utilizada em sistemas de roteamento de aplicações web para manipular rotas dinâmicas.

## Código

```javascript
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9-_]+)'
  )
  const pathRegex = new RegExp(`^${pathWithParams}`)
  return pathRegex
}
```

## Funcionamento Detalhado

1. **Definição e Exportação da Função**:

   - A função `buildRoutePath` é definida para aceitar um `path` como argumento.
   - `export` permite que esta função seja utilizada em outros arquivos JavaScript.

2. **Regex para Parâmetros de Rota**:

   - Uma expressão regular é definida para identificar parâmetros na rota, que são marcados com `:` e seguidos por letras.
   - A flag `g` indica que a busca pelos parâmetros é global na string fornecida.

3. **Substituição de Parâmetros na Rota**:

   - A função `replaceAll` substitui cada parâmetro identificado por um grupo de captura nomeado.
   - O grupo de captura aceita letras minúsculas, números, hífens e underscores.
   - `$1` representa o nome do parâmetro capturado pela regex.

4. **Criação da Expressão Regular Final**:

   - A string modificada é convertida em uma expressão regular.
   - `^` assegura que a correspondência da regex comece no início da string.

5. **Retorno da Expressão Regular**:
   - A função retorna a regex, que pode ser usada para correspondência de padrões em sistemas de roteamento.

Esta função é um exemplo prático de como as expressões regulares podem ser utilizadas para manipulação avançada de strings em JavaScript, especialmente em contextos de desenvolvimento web.

---

## Atualizaçao da REGEX

```js
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g

  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9-_]+)'
  )

  //regex atualizada
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
```

A regex `const pathRegex = new RegExp(\`^${pathWithParams}(?<query>\\?(.*))?$\`)` é usada para criar um padrão que identifica e captura partes específicas de um caminho (path) em uma URL. A explicação detalhada de cada parte é a seguinte:

1. `^`: Representa o início da string. A regex só vai coincidir com uma string se a correspondência começar desde o início da string.

2. `${pathWithParams}`: É uma variável que contém um padrão definido anteriormente. Ela é substituída pelo valor dessa variável, que é construído com base em outra regex. Esta parte é responsável por casar com o caminho principal da URL, incluindo parâmetros dinâmicos.

3. `(?<query>\\?(.*))?`: Esta parte da regex é dividida em subpartes:

   - `(?<query>`: Um grupo de captura nomeado, que permite que a parte da string que corresponde a este grupo seja capturada e armazenada com um nome específico (`query`).
   - `\\?`: Corresponde a um ponto de interrogação literal (`?`). A barra invertida é usada para indicar que queremos encontrar o próprio caractere de ponto de interrogação.
   - `(.*))`: Um grupo de captura que irá capturar qualquer coisa após o ponto de interrogação. `.*` significa "qualquer caractere (exceto nova linha), repetido zero ou mais vezes".
   - `?`: Torna todo o grupo `(?<query>\\?(.*))` opcional, significando que a regex pode corresponder a strings com ou sem uma parte de query.

4. `$`: Representa o final da string. A regex só vai corresponder se a string terminar com o padrão especificado antes deste símbolo.

Essa regex é usada para combinar com um caminho de URL, que pode conter parâmetros dinâmicos, e opcionalmente uma string de query após um ponto de interrogação. Ela captura essas partes e as torna facilmente acessíveis através de nomes de grupos de captura.
