## Conceitos

### Fastify

Microframework de back-end do Node, semelhante ao Express

- Mais atual e mnantido comparado ao Express
- Suporte ao Typescript
- Tem menos opinião comparado a grandes frameworks como Nest.js, Adonis etc.
  - Ou seja, não obriga você a usar certas convenções como nome de pastas db's especificos etc

#### Quickstart Fastify

```
import fastify from "fastify";

const app = fastify()

app.get('/hello', () => {
  return 'Hello World'
})

app.listen({
  port: 3333,
}). then(() => {
  console.log('HTTP server Running')
})

```

### Typescript

- Linguagem de programção ou superset do JS
- Facilita a programação tipando o JS
- `npm i -D typescript`
- `npx tsc --init` para gerar o arquivo config -> alterar o target para uma versão de JS mais atual
- `npm install -D @types/node` para que ao buildar não de erro
- `npm install tsx -D` Automatiza processo de build e executar
  - Podemos rodar nosso arquivo ts diretamente usando
  - `npx tsx nome_arquivo`
  - Sempre usar somente em desenvolvimento
  - Em prod é melhor buildar e executar em js (+ rapido)
- `npx tsc nome_arquivo` para buildar e converter o arquivo em js

### eslint

- Deixar automatizado a formatação e padronização do arquivo
- `npm i eslint @rocketseat/eslint-config -D`
- Criar o arquivo .eslintrc.json no root
  - Podemos configurar como a gente preferir

```
  {
    "extends": [
      "@rocketseat/eslint-config/node"
    ]
  }
```

### Knex

- Query builder mais famoso do Node
- Para evitar ter que escrever queries diretamente usando uma lib nativa do SQL
- Mistura código JS com SQL para facilitar o nosso entendimento
- Torna facil trocar de banco de dados caso o query builder suporte

### ZOD

- Lib para validação
- Tanto para env vars quanto para campos provenientes de outros lugares como front-end

### Vitest

- Framework de testes
- Compativel com typescript diferente do jest que precisariamos instalar bundles a parte para rodar os testes
