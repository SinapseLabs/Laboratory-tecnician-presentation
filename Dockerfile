# Usa a imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do package.json e package-lock.json antes de instalar as dependências
COPY package.json package-lock.json ./

# Instala as dependências usando a flag --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o projeto para produção
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
