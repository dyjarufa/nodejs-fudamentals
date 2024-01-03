//* Buffer --> Estruturas de dados que representa informações binárias
//* É um representação de um espaço na memória do computador que o Node utiliza. É um forma de transportar dados de forma rápida
//* É uma maneira de salvar e lê da memória de forma performática

const buf = Buffer.from('hello') // Buffer.from => método usado para criar um Buffer a partir de um string

console.log(buf.toJSON())
