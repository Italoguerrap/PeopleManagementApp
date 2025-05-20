# Aplicação de Gerenciamento de Pessoas

## Visão Geral

Esta aplicação foi desenvolvida como um sistema completo para gerenciamento de pessoas, composta por um frontend em React/TypeScript/Vite e um backend em .NET Core. O sistema permite cadastro, visualização, edição e exclusão de registros de pessoas, com autenticação e controle de acesso.

## Tecnologias Utilizadas

### Frontend
- **React 19**: Framework para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Ferramenta de build moderna e rápida
- **Styled Components**: Biblioteca para estilização com CSS-in-JS
- **React Icons**: Pacote de ícones para React
- **React Toastify**: Biblioteca para notificações e alertas

### Backend
- **.NET Core**: Framework para desenvolvimento do backend
- **Entity Framework Core**: ORM para acesso ao banco de dados
- **Swagger**: Documentação interativa da API
- **JWT**: Autenticação baseada em tokens
- **FluentValidation**: Validação de requisições

## Estrutura do Projeto Frontend

```
PeopleManagementApp/
├── public/                # Arquivos estáticos
├── src/                   # Código fonte
│   ├── app/               # Componentes principais
│   │   └── pages/         # Páginas da aplicação
│   ├── components/        # Componentes reutilizáveis
│   ├── context/           # Contextos React
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas da aplicação
│   ├── services/          # Serviços e API
│   └── styles/            # Estilos globais
├── index.html             # Template HTML
├── vite.config.ts         # Configuração do Vite
└── package.json           # Dependências
```

## Guia para Build e Deploy

### Requisitos
- Node.js (versão 18 ou superior)
- npm (incluído com Node.js)
- Firebase CLI (`npm install -g firebase-tools`)
- Conta no Firebase

### Comandos Disponíveis

```bash
# Executar em ambiente de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Visualizar a versão de produção localmente
npm run preview
```

### Passos para Deploy no Firebase

1. **Fazer login no Firebase:**
   ```bash
   firebase login
   ```

2. **Inicializar o Firebase no projeto (caso ainda não tenha feito):**
   ```bash
   firebase init
   ```
   - Selecione a opção "Hosting"
   - Escolha seu projeto Firebase ou crie um novo
   - Defina "dist" como diretório público (onde o Vite gera o build)
   - Configure como SPA (Single-Page Application): Sim
   - Não sobrescreva o index.html existente

3. **Gerar o build de produção:**
   ```bash
   npm run build
   ```

4. **Realizar o deploy:**
   ```bash
   firebase deploy
   ```

## Endpoints da API

O backend está disponível em: [https://github.com/Italoguerrap/PeopleManagement](https://github.com/Italoguerrap/PeopleManagement)

### Autenticação
- `POST /api/v1/Auth`: Autenticação de usuário (login)

### Gerenciamento de Pessoas
- `GET /api/v1/People`: Buscar pessoas com filtros opcionais
- `POST /api/v1/People`: Adicionar nova pessoa
- `PUT /api/v1/People/{cpf}`: Atualizar pessoa existente
- `DELETE /api/v1/People/{cpf}`: Excluir pessoa

## Funcionalidades

- **Autenticação e Autorização**: Login com JWT
- **Gestão de Pessoas**: CRUD completo
- **Validação de Dados**: CPF, e-mail e outros campos
- **Interface Responsiva**: Adaptada para dispositivos móveis e desktop
- **Paginação e Filtros**: Busca de registros por diferentes critérios

## Ambiente de Desenvolvimento

Para execução em ambiente local:

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure variáveis de ambiente (se necessário)
4. Execute: `npm run dev`
5. Acesse: `http://localhost:xxxx`

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
