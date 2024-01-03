/*  Readable Streams & Writable Streams */

/* 
  Streams --> Lê pequenas partes para já conseguir trabalhar antes de lê os arquivos por completo
      -  Mecanismos para ler e escrever dados de forma assíncrona, controlada e em partes
*/

// process --> é um variável global do node.js

/*
  pipe --> server para encaminhar uma saída
  Encaminha os dados provindos de uma stream para outra
*/

process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

// Readable Stream: lê e retorna
class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    // setTimeout aqui simulado como o stream funcionado, simulando a leitura de cada parte a cada 1 seg
    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000)
  }
}

//Transform Stream => serve para transformar um dado em outro

/* 

  Qual a diferença entre Writable e Transform Stream?

  Se usarmos o `fs.createReadStream` para ler o conteúdo do arquivo, estamos criando uma Stream de leitura, ou seja, podemos ler os dados gradualmente e enviar para alguma outra Stream.

  Se enviarmos esses dados para uma Stream de escrita (`WriteableStream`), essa poderá receber os dados aos poucos, normalizar o áudio normalmente, mas não conseguirá enviar os pedacinhos
  do áudio normalizado para outra Stream porque uma `WriteableStream` sempre é um ponto final, não consigo encaminhar nada dali para frente.

  Se eu usar uma `TransformStream`, posso também ler a Stream de leitura do arquivo de áudio, normalizar o volume e reencaminhar os dados processados para fora dessa Stream, 
  para então usar um `fs.createWriteStream` para escrever o arquivo em disco com o áudio normalizado.
*/

// chunks ==>  Pedaços de dados que são lidos e escritos em uma stream de forma assíncrona

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString() * -1)

    callback(null, Buffer.from(String(transformed)))
  }
}

//Writable Stream somente escreve e processa
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
