# 🎯 MatchLegal

Este é o repositório do projeto **MatchLegal**, que consiste em uma aplicação com **backend em Node.js** e **frontend em React**.
O projeto simula uma Inteligência Artificial (Assistente) para cadastrar conexões e avaliar matches. 
O Banco de dados está hospedado online no Firebase - Firestore. 

## 🌐 Links do Projeto

- 🔗 API (Backend): [https://match-legal-api.vercel.app/docs](https://match-legal-api.vercel.app/docs)
- 🔗 Frontend: [https://match-legal.vercel.app/](https://match-legal.vercel.app/)
- 🔗 Github: [https://github.com/joseguilhermeromano/MatchLegal](https://github.com/joseguilhermeromano/MatchLegal)

---

## 🚀O que foi utilizado?

1. **Backend**
   - [Node.js](https://nodejs.org/) (versão recomendada: 18.x ou superior, eu utilizei v22.13.1)
   - [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
   - [Firebase](https://firebase.google.com/)
   - [Firestore](https://firebase.google.com/docs/firestore)
   - [Swagger](https://swagger.io/)
   - [TypeScript](https://www.typescriptlang.org/)
   - [Jest](https://jestjs.io/)
   - [ESLint](https://eslint.org/)
   - [Express](https://expressjs.com/)
   - [Axios](https://axios-http.com/)
   - [Firebase Admin](https://firebase.google.com/docs/admin)

2. **Frontend**
   - [React](https://reactjs.org/)
   - [Vite](https://vitejs.dev/)
   - [MUI](https://mui.com/)
   - [React Router](https://reactrouter.com/)
   - [React Query](https://tanstack.com/query/v4)

## 🚀 Como rodar o projeto localmente

### 🔧 Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão recomendada: 18.x ou superior, eu utilizei v22.13.1)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

### 📦 Instalação e execução

A seguir estão os passos para rodar o projeto localmente, tanto o frontend quanto o backend.

---

#### 🔹 Frontend (React)

Para iniciar o frontend da aplicação:

1. Acesse a pasta do frontend:
   - `cd frontend`

2. Instale as dependências:
   - `npm install`

3. Execute o servidor de desenvolvimento:
   - `npm run dev`

4. Abra o navegador e acesse:
   - `http://localhost:5173`

> ⚠️ **Atenção:** fique de olho na porta em que a aplicação está rodando. Por padrão será a `5173`, mas o terminal pode indicar outra porta, caso essa já esteja em uso.

---

#### 🔸 Backend (Node.js API)

Para iniciar o backend da aplicação:

1. Acesse a pasta do backend:
   - `cd backend`

2. Instale as dependências:
   - `npm install`

3. Inicie a API:
   - `npm start`

4. Abra o navegador e acesse:
   - `http://localhost:3000/`

> ✅ Se tudo estiver funcionando corretamente, você verá uma mensagem indicando que a API foi iniciada com sucesso.

### ⚠️  Criar os arquivos .ENV

É importante copiar os .envs abaixo para o seu projeto. 

1 - Projeto backend:

```dotenv
FIREBASE_PROJECT_ID=matchlegal-9adf5
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@matchlegal-9adf5.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2Ouc9B7zFMIRr\nUx9pI3ALcmuash+f/Foe2KBx77qxQzy4+Q5OhLehMlvHzEjT1TbpcXnS2k6+QugZ\nr+U7LhvRdWH7QUeWMxqIsBe4xV2hw4vQhG11HxZFlZgmOXstX+BYSvZrGV+i0KkO\nEj4JcIZUhzGTJ5fGE68U/2vwssaYefEOapXOI4Zw5uEZU9OxGyGrG/qhUqkPJIa6\n8GjMGXxQfhZRQT5dtqMGEXtKfLNm1fUOCL3tjvRfuru3WUvOr6G0zs9IAfXvzQNh\nR5vEOMfRPXDmKhqxV1/ev7C5LvI5rkmJN4uUfmb6NTCtmgetxK86ARtlYyeqE3wI\ncmiQWceFAgMBAAECgf8+/x3xeztG7/7XG2VAc3/IdUW9tNY5+IMvJrRQrw9bOGNF\njtPjUP4qO75+06BZmtvg19nFirKuE3MpbiVQ0B/NyUaWFXsp8YC6wCVzOsejpHYx\nH5a3ZofMhmqSzExI41wrKb8GRz9Iidnng2bu3HeTwSjiNk3BrAxatfIaw7LkAq1C\niRyytUjLOCZWQsLwjn9esiTIVtgGASKe7dypBis35uVtV3x8PvAuEVfWGaqqk0+R\nSRyFOFXDl+JWV0lnhAkXC9JEeCa1qPO6py5xI8mDzXbTOVohYXsheftOCZHvrEpa\n886kYU132t77zS+DleNVr6VFIGacfhVIFrXycKcCgYEA9YUIlOqjyDuNbhiKuQ6f\niao3HSsZgIh9XW7zpR6YDG4VODby6t/2qDgIAjhCyvOBUlBbB51GP9J1iS4f53oE\nUF045qeNy83Y04vMDOjrSGefHDYZJSooHd5w9uemVw3M1LWJNZisfAkrsZdpeTAc\n0+GD8ECH+flOqekYvuyJxn8CgYEAvgJCjfPttviXzfV5RXHVcpyJtQbnzFuzuB73\nB2WE0vrK4u+sloXBpa+lnA9/UrUpT+MBFOLZwZ1jJEYKwC+i0FAeHq4TfvLFb8sN\n5VyLBuuHQBHfRX9HhfH3nviHhY2HINuoFKAo23iJPQXH7nts1zzLU8Scff8t1x1o\nJeuxV/sCgYEAzOntkayMadAaaGsfTPjBerqQKU4RiM9iIps5yvRP3v/5weNKt3GZ\ngijRtliSlqTJqJPchexj91yGMKpIgn+6HgDQPuJVXGY/s8AX3CaCSPoDOB6GuhgH\nR3aiPdB1am7gKCAjlpIIU7WrvBstMrJPPSAZaGnTk3TajME5oA/3pa0CgYAkQtQm\nuQWFpJ173bveB+JfNAaHuKCl/F4o5ifojnQxu1DazDiYpUAWeZXWWZLH2vDeYQkE\nzmIWNA4GjyNgF/cvYArPehMYaAZL1ml5exbBJFO0Y3TDk423vzytZuqeDytZlvHV\ntdb2Q2OVdLP6DC3ySZTYEK540SkTY3ZLvlYi3wKBgQDOofQ9FwDjXbFmT2Is3emW\nx28O6I31nh1BsFKEXlz9iKEHZhRVOWMvjs2ZYGgbZ9vT4Ats9jf11Hx7F++xz8ji\nBg4H6YLhw2TgJ8C0Msqw4xaZcUyH+GqCXbrWcgctZaxgzrq2JOHTl3nnjlNY09q6\ntUAYqJpF1ywipqnSfmc+wQ==\n-----END PRIVATE KEY-----\n"
REACT_APP_API_BASE_URL=http://localhost:5173
API_BASE_URL=http://localhost:3000/api
```

2 - Projeto Frontend: 

```dotenv
VITE_API_BASE_URL= http://localhost:3000/api
```

### 🧪 Testando a aplicação

Com o frontend e o backend rodando simultaneamente, já é possível utilizar a aplicação. 
Basta seguir os passos exibidos na tela e escrever as mensagens conforme solicitado.

### 📚 Segue os prints da aplicação funcionando no VERCEL

![Screenshot 1](prints/Screenshot_1.png)  
![Screenshot 2](prints/Screenshot_2.png)  
![Screenshot 3](prints/Screenshot_3.png)  
![Screenshot 4](prints/Screenshot_4.png)  
![Screenshot 5](prints/Screenshot_5.png)  
![Screenshot 6](prints/Screenshot_6.png)  
![Screenshot 7](prints/Screenshot_7.png)  
![Screenshot 8](prints/Screenshot_8.png)  
![Screenshot 9](prints/Screenshot_9.png)  
![Screenshot 10](prints/Screenshot_10.png)  
![Screenshot 11](prints/Screenshot_11.png)  
![Screenshot 12](prints/Screenshot_12.png)  
![Screenshot 13](prints/Screenshot_13.png)  
![Screenshot 14](prints/Screenshot_14.png)
![Screenshot 15](prints/Screenshot_15.png)

### 📚 Principais decisões tomadas durante o desenvolvimento

1. Procurei criar uma interface simples em React com Material UI para simular uma assistente virtual de IA. 
2. Integrei o projeto com o banco de dados NOSQL do firebase. 
3. criei um algoritmo simples para calcular o match de até 3 usuários mais próximos. 
4. Procurei usar recursos totalmente próprios, sem recorrer a IAs externas. 
5. Além disso, documentei toda a API com Swagger. 

### 📚 O que você faria diferente se tivesse mais tempo?

1. Eu iria aprimorar as respostas da IA, para que elas fossem mais naturais e humanas.
2. Eu iria criar uma autenticação para os usuários, para que pudesse salvar suas preferências e matches.
3. Eu iria criar testes unitários para as principais funcionalidades da API.
4. Eu iria aprimorar o layout para deixar mais profissional. 
5. Eu iria impelmentar outros cadastros com o assistente, como empresas, eventos, etc.



