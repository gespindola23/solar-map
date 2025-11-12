# 🚀 Deploy no Vercel - Passo a Passo SIMPLES

**Tempo total: 15-20 minutos**

---

## PARTE 1: Pegar o Token do Mapbox (5 min)

### Passo 1: Criar conta no Mapbox
1. Abra: https://account.mapbox.com/auth/signup/
2. Preencha:
   - Email
   - Username (qualquer nome)
   - Senha
3. Clique em **Continue**
4. Confirme o email (cheque sua caixa de entrada)

### Passo 2: Pegar o Token
1. Após login, você vai ver uma página com "Access tokens"
2. Procure por **"Default public token"**
3. Tem um botão de **copiar** (ícone de clipboard) ao lado
4. Clique pra copiar
5. **COLE ESSE TOKEN NO BLOCO DE NOTAS** - você vai precisar dele depois!

O token começa com `pk.` e é tipo:
```
pk.eyJ1IjoibWV1dXNlciIsImEiOiJjbHh4eHh4In0.xxxxxxxxxxxxxxx
```

✅ **Checklist:**
- [ ] Conta Mapbox criada
- [ ] Token copiado e salvo

---

## PARTE 2: Pegar o GID do Google Sheet (2 min)

### Passo 1: Abrir o Sheet
1. Abra: https://docs.google.com/spreadsheets/d/1Ls6LZCmSFFNkOhzBINVZH9TBA24a2CWpev4UstEFeok/edit

### Passo 2: Clicar na aba PM_DATABASE_CT
1. Lá embaixo da planilha, clique na aba **"PM_DATABASE_CT"**
2. Olhe pra URL no topo do navegador
3. Você vai ver algo tipo:
   ```
   ...edit#gid=123456789
   ```
4. **Copie APENAS os números depois de `gid=`**
5. **Cole no bloco de notas** junto com o token

**Exemplo:**
- URL completa: `...edit#gid=987654321`
- Você copia: `987654321`

Se NÃO aparecer `gid=` na URL:
- Use `0` (zero)

✅ **Checklist:**
- [ ] GID encontrado e salvo

---

## PARTE 3: Criar Conta no GitHub (5 min)

O Vercel precisa que o código esteja no GitHub primeiro.

### Passo 1: Criar conta
1. Abra: https://github.com/signup
2. Preencha email, senha, username
3. Confirme email
4. Faça login

### Passo 2: Criar Repositório (pasta pro código)
1. No GitHub, clique no **+** no canto superior direito
2. Clique em **"New repository"**
3. Preencha:
   - **Repository name:** `solar-map` (sem espaços)
   - **Public** ou **Private** (tanto faz)
   - ✅ Marque **"Add a README file"**
4. Clique em **"Create repository"**

✅ **Checklist:**
- [ ] Conta GitHub criada
- [ ] Repositório `solar-map` criado

---

## PARTE 4: Subir o Código pro GitHub (3 min)

### Passo 1: Fazer Upload dos Arquivos
1. No seu repositório no GitHub, clique em **"uploading an existing file"** (link azul)
   - Ou clique em **"Add file"** → **"Upload files"**

2. Arraste TODOS os arquivos e pastas do projeto `solar-map` pra área de upload
   - Selecione tudo dentro da pasta `solar-map`
   - **NÃO** arraste a pasta `solar-map` em si, apenas o conteúdo

3. Espere o upload terminar (barra verde completa)

4. Lá embaixo, clique em **"Commit changes"**

**IMPORTANTE:** Você vai arrastar:
- A pasta `app`
- A pasta `components`
- A pasta `lib`
- Arquivos como `package.json`, `README.md`, etc.
- **NÃO** arraste `.env.local` (se tiver criado)

✅ **Checklist:**
- [ ] Arquivos enviados pro GitHub
- [ ] Vejo todos os arquivos no repositório

---

## PARTE 5: Deploy no Vercel (5 min)

### Passo 1: Criar conta no Vercel
1. Abra: https://vercel.com/signup
2. Clique em **"Continue with GitHub"**
3. Autorize o Vercel a acessar o GitHub
4. Selecione sua conta

### Passo 2: Importar o Projeto
1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Você vai ver uma lista dos seus repositórios do GitHub
3. Encontre **"solar-map"**
4. Clique em **"Import"**

### Passo 3: Configurar Variáveis de Ambiente
**ATENÇÃO: PASSO CRUCIAL!**

1. Na tela de configuração, procure por **"Environment Variables"**
2. Você vai adicionar 4 variáveis:

**Variável 1:**
- Name: `NEXT_PUBLIC_MAPBOX_TOKEN`
- Value: `[COLE SEU TOKEN DO MAPBOX AQUI]`
- Clique em **"Add"**

**Variável 2:**
- Name: `NEXT_PUBLIC_SHEET_ID`
- Value: `1Ls6LZCmSFFNkOhzBINVZH9TBA24a2CWpev4UstEFeok`
- Clique em **"Add"**

**Variável 3:**
- Name: `NEXT_PUBLIC_SHEET_GID`
- Value: `[COLE SEU GID AQUI]` (os números que você copiou)
- Clique em **"Add"**

**Variável 4:**
- Name: `NEXT_PUBLIC_PRIVACY_OFFSET`
- Value: `500`
- Clique em **"Add"**

### Passo 4: Deploy!
1. Clique em **"Deploy"**
2. Aguarde uns 2-3 minutos
3. Você vai ver confetes 🎉 quando terminar!

### Passo 5: Pegar a URL do Mapa
1. Após o deploy, clique em **"Continue to Dashboard"**
2. Você vai ver uma seção **"Domains"**
3. Copie a URL (algo tipo `solar-map-abc123.vercel.app`)
4. Clique nela pra testar - o mapa deve aparecer!

✅ **Checklist:**
- [ ] Deploy feito com sucesso
- [ ] Mapa abre e funciona
- [ ] URL copiada

---

## PARTE 6: Embedar no Ecoloop.us (2 min)

### Passo 1: Criar o Código de Embed
Copie este código e **substitua a URL**:

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;">
  <iframe 
    src="https://SUA-URL.vercel.app" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    loading="lazy"
    title="Mapa de Instalações Solares">
  </iframe>
</div>
```

Substitua `SUA-URL.vercel.app` pela URL real que você copiou.

### Passo 2: Colar no Site
1. Entre no painel admin do ecoloop.us
2. Edite a página onde quer o mapa
3. Adicione um bloco de **HTML customizado** (ou "Custom HTML")
4. Cole o código acima
5. Salve e publique!

✅ **Checklist:**
- [ ] Código embedado no site
- [ ] Mapa aparece no ecoloop.us
- [ ] Funciona no celular também

---

## 🎉 PRONTO!

Seu mapa está no ar!

### Testou tudo?
- [ ] Mapa carrega
- [ ] Pins aparecem
- [ ] Filtros funcionam
- [ ] Contador mostra número correto
- [ ] Funciona no celular

---

## ⚠️ Se algo der errado:

### Mapa não aparece / página em branco
→ Verifique as variáveis de ambiente no Vercel
→ Token do Mapbox está correto? (começa com `pk.`)

### Nenhum pin aparece
→ Verifique o GID (número da aba)
→ Confirme que a coluna AN (ENTERINSSUB) tem valores

### Erro 403 / Permission denied
→ Torne o Google Sheet público:
   1. Abra o sheet
   2. Clique em "Share"
   3. Mude para "Anyone with the link can view"

### Quer refazer o deploy
1. No Vercel, vá em **Settings** → **Environment Variables**
2. Edite as variáveis se necessário
3. Vá em **Deployments** → clique nos 3 pontinhos → **"Redeploy"**

---

## 📞 Precisa de Ajuda?

Se travar em algum passo, me manda:
1. Em qual PARTE está (1, 2, 3, 4, 5 ou 6)
2. Qual passo especificamente
3. Qual erro aparece (se houver)

---

**Tempo total esperado:** 15-20 minutos
**Custo:** $0 (tudo grátis nos planos free)
