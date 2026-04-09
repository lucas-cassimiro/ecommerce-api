# 🔥 E-commerce Backend (DDD + Clean Architecture)

## 🧠 Visão Geral

Este projeto é um **backend de e-commerce escalável**, desenvolvido com foco em **arquitetura limpa, regras de negócio bem definidas e alta manutenibilidade**.

A aplicação simula um ambiente real de produção, incluindo:

- Processamento de pedidos
- Integração com pagamentos (Stripe)
- Controle de estoque
- Autenticação e autorização
- Webhooks para eventos externos
- Testes automatizados

> O objetivo não é apenas “funcionar”, mas sim demonstrar **como sistemas reais devem ser construídos**.

---

## 🚀 Tecnologias

### Core

- TypeScript
- Node.js
- Fastify

### Arquitetura & Qualidade

- DDD (Domain-Driven Design)
- Clean Architecture
- SOLID
- TDD

### Banco de dados

- PostgreSQL
- Prisma ORM

### Infra / Performance

- Redis (cache / filas)
- Docker

### Pagamentos

- Stripe API (Checkout + Webhooks)

### Testes

- Vitest
- Testes unitários e de integração

---

## 🏗️ Arquitetura

O projeto segue **Clean Architecture + DDD**, com separação clara de responsabilidades:

src/
├── domain/ # Regras de negócio puras
├── application/ # Casos de uso
├── infra/ # Banco, serviços externos (Stripe, Redis)
├── presentation/ # Controllers (HTTP)
└── main/ # Setup da aplicação

### 🔥 Principais conceitos aplicados

- Entidades ricas (não anêmicas)
- Casos de uso desacoplados
- Inversão de dependência
- Baixo acoplamento entre camadas
- Alta coesão

---

## 💳 Fluxo de Pagamento (Stripe)

1. Usuário cria um pedido
2. Backend gera sessão de checkout no Stripe
3. Usuário realiza pagamento
4. Stripe dispara webhook
5. Sistema atualiza status do pedido automaticamente

### Status possíveis:

- `PENDING`
- `PAID`
- `CANCELLED`

---

## 🧪 Testes

O projeto possui cobertura de testes focada em:

- Regras de negócio (Domain)
- Casos de uso (Application)
- Integrações críticas

Exemplo:

```ts
describe('CreateOrderUseCase', () => {
  test('should create an order successfully', async () => {
    // ...
  })
})
```

⚡ Funcionalidades
✅ Cadastro de usuários
✅ Autenticação com JWT
✅ Criação de pedidos
✅ Integração com Stripe
✅ Webhook para confirmação de pagamento
✅ Atualização automática de status
✅ Controle de produtos
✅ Cache com Redis
✅ Estrutura pronta para escala

🐳 Como rodar o projeto
# Clonar repositório
git clone https://github.com/seu-user/seu-repo

# Instalar dependências
yarn

# Subir containers
docker-compose up -d

# Rodar aplicação
yarn dev

🔐 Variáveis de ambiente
DATABASE_URL=
REDIS_URL=
JWT_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

📡 Webhook Stripe (ambiente local)
stripe listen --forward-to localhost:3000/stripe/webhook

📈 Diferenciais do projeto
Esse projeto vai além de um CRUD comum:

Arquitetura pensada para escala real
Integração com sistema de pagamento profissional
Uso de eventos (webhooks)
Código testável e desacoplado
Separação clara entre regras de negócio e infraestrutura

🧠 Aprendizados
Durante o desenvolvimento foram aplicados conceitos avançados como:
- Modelagem de domínio
- Estratégias de desacoplamento
- Tratamento de eventos assíncronos
- Boas práticas de testes
- Integração com serviços externos

👨‍💻 Autor

Lucas Cassimiro
- LinkedIn: https://linkedin.com/in/seu-link
- GitHub: https://github.com/seu-user

⚠️ Observação

Este projeto foi desenvolvido com fins educacionais e para demonstração de habilidades técnicas, simulando cenários reais de mercado.

---

Se quiser deixar isso **nível absurdo mesmo (tipo dev pleno chamando recruiter)**, o próximo upgrade seria:

- badges (build, coverage, etc.)
- README em inglês
- diagramas (arquitetura + fluxo Stripe)
- GIF rodando

Se quiser, eu monto a versão **nível “contrata esse cara agora”** pra você 😏
