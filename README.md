# older-website

Painel web da plataforma BitCode. Construído com React 19, Vite e Tailwind CSS.

## Tecnologias

- **Framework**: React 19
- **Build**: Vite 6
- **Estilo**: Tailwind CSS 3
- **Roteamento**: React Router 7
- **Formulários**: React Hook Form + Yup
- **Tabelas**: TanStack Table
- **Gráficos**: ApexCharts
- **Internacionalização**: i18next
- **Deploy**: Vercel

## Setup

```bash
# 1. Instalar dependências
npm install
# ou
yarn install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com seus valores

# 3. Iniciar em dev
npm run dev
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Preview do build local |
| `npm run lint` | Verifica com ESLint |

## Estrutura

```
src/
├── app/           # Páginas e layouts
├── components/    # Componentes reutilizáveis
├── services/      # Chamadas de API (axios)
├── hooks/         # Custom hooks
├── utils/         # Utilitários
├── configs/       # Configurações globais
├── constants/     # Constantes
├── i18n/          # Internacionalização
└── styles/        # Estilos globais
public/            # Arquivos estáticos
```
