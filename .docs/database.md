```js
/* 
  # --> Tornar uma propriedade privada, Não permite que arquivos externos acessem a prop database
*/

// import fs from 'node:fs ==> forma antiga de usar o fs, e permite uso do createReadStream

// 'node:fs/promises' ==> forma mais atual que utiliza as funções async/ await porém, não possuem o createReadStream

import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url) // setar o  caminho relativo do arquivo db.json

export class Database {
  #database = {}

  //será executado assim que o classe Database for instanciada
  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist() // caso eu nao tenha um banco de dados, persist um bd vazio
      })
  }

  //Método que será chamado sempre, após inserir dados no BD
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database)) // fs.writeFile não permite outro aquivo que não seja string, por isso uso o stringify para converter
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    // se existe um array inserido nessa tabela
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data] // se não vou criar um array com os dados
    }

    this.#persist()

    return data
  }
}
```

# O Construtor (constructor)

O constructor é um método especial dentro de uma classe em muitas linguagens de programação orientadas a objeto, incluindo JavaScript. Ele tem algumas características e finalidades específicas:

<br>
<br>
<br>

# Classe `Database`

A classe `Database` é uma implementação de um simples sistema de gerenciamento de banco de dados usando o Node.js. Ela permite ler, inserir e persistir dados em um arquivo JSON.

## Construtor

```javascript
constructor() {
  fs.readFile(databasePath, 'utf8')
    .then((data) => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
}
```

### Descrição

O construtor é chamado automaticamente quando uma nova instância da `Database` é criada. Ele realiza as seguintes ações:

1. **Leitura de Arquivo**: Tenta ler um arquivo JSON no caminho especificado por `databasePath`. Se a leitura for bem-sucedida, o conteúdo do arquivo é analisado e armazenado na propriedade privada `#database`.

2. **Manipulação de Erro**: Se a leitura do arquivo falhar (por exemplo, se o arquivo não existir), a função `#persist` é chamada para criar um novo arquivo de banco de dados vazio.

## Métodos

### `#persist`

```javascript
#persist() {
  fs.writeFile(databasePath, JSON.stringify(this.#database))
}
```

#### Descrição

`#persist` é um método privado usado para escrever/salvar o estado atual do banco de dados no arquivo. É chamado sempre que é necessário atualizar o arquivo de banco de dados.

### `select`

```javascript
select(table) {
  const data = this.#database[table] ?? []

  return data
}
```

#### Descrição

O método `select` é usado para recuperar dados de uma tabela específica. Se a tabela não existir, um array vazio é retornado.

### `insert`

```javascript
insert(table, data) {
  if (Array.isArray(this.#database[table])) {
    this.#database[table].push(data)
  }

  this.#persist()

  return data
}
```

#### Descrição

O método `insert` insere um novo registro em uma tabela especificada. Se a tabela já existir e for um array, o novo dado é adicionado a ela. Após a inserção, o método `#persist` é chamado para atualizar o arquivo de banco de dados.

## Uso

Para usar a classe `Database`, primeiro crie uma instância da classe e depois chame os métodos `select` ou `insert` conforme necessário.

```javascript
const db = new Database()
// Uso dos métodos db.select(...) ou db.insert(...)
```
