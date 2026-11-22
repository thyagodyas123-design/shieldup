# ShieldUp — Cidadania Digital

Aplicativo educativo em português para jovens do interior, com Next.js 16, React 19, TypeScript e Tailwind CSS 4.

## Executar

Requer Node.js 22.18+ e npm. A versão desta entrega foi validada com Node.js 26.7.0 e Chrome instalado.

```sh
npm ci
npm run dev -- --hostname 127.0.0.1
```

Abra http://127.0.0.1:3000. Para produção local:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3001
```

A configuração usa Webpack e a integração PostCSS do Tailwind. O empacotamento inicial com Turbopack falhou no ambiente de teste; Webpack foi validado em desenvolvimento/compilação e produção.

## Testes

```sh
npm run test:all
```

Esse comando executa lint, TypeScript, sete testes de lógica e 34 cenários de interface (17 cenários em dois perfis). Playwright compila o projeto e inicia um servidor de produção na porta 3100, encerrado ao final. A porta precisa estar disponível. Os testes usam o Google Chrome instalado, sem perfil pessoal do usuário. Em máquinas sem Chrome, instale o navegador antes de executar a suíte.

Para testar um servidor já iniciado:

```sh
BASE_URL=http://127.0.0.1:3001 npm run test:e2e
```

O relatório de interface fica em `playwright-report/index.html`. Falhas preservam traces em `test-results/`. Esses diretórios são gerados e ficam fora do controle de versão. A auditoria de dependências pode ser repetida com `npm audit --registry=https://registry.npmjs.org`.

## GitHub Actions e GitHub Pages

O workflow verifica pull requests e commits enviados à branch `main`. Depois de lint, TypeScript, testes unitários e testes de interface passarem, o workflow publica automaticamente a exportação estática de `out/` quando roda na `main`. No GitHub, a fonte de publicação em **Settings → Pages** é **GitHub Actions**.

Para reproduzir localmente os testes do Pages, com o caminho usado no repositório e Python 3.9 ou superior:

```sh
PAGES_BASE_PATH=/shieldup npm run test:all
```

Esse comando testa a exportação estática no caminho `/shieldup/`. O comando sem a variável continua testando a versão com servidor Next.js.

## Funcionalidades implementadas

- Três desafios de golpes com feedback, novas tentativas e 20 XP por acerto.
- Três situações de privacidade com explicações e 10 XP por lição.
- Laboratório de prompts com validação de tamanho e 50 XP pela atividade.
- Progresso de até 140 XP e três conquistas, persistidos no navegador e sincronizados entre abas. Repetições não concedem mais pontos.
- Exclusão do progresso com confirmação e modo de sessão quando o armazenamento está bloqueado.
- Analisador educativo de URLs: valida formato e identifica HTTP, credenciais, endereços IP, encurtadores conhecidos, domínios internacionais e portas incomuns. Não acessa o destino.
- Conteúdo introdutório de IA, recursos externos e roteiros de preparação para mentoria.
- Navegação adaptável, foco visível, link para pular ao conteúdo e zoom liberado.

## Limites desta versão

A análise de links usa regras locais; não consulta listas de ameaças nem certifica a segurança de um site. O laboratório de prompts não usa uma API de IA, não gera imagens e não avalia semanticamente o texto. O exercício concede XP pela submissão de um texto dentro do tamanho indicado.

O progresso não tem conta de usuário, sincronização entre dispositivos ou valor de certificação. Ele pode ser alterado pelo próprio usuário nas ferramentas do navegador. Nenhum texto digitado no laboratório ou no verificador é enviado a um servidor pela aplicação.

Não há banco de dados, autenticação, painel administrativo, agenda, cadastro de mentores, chat, moderação ou verificação de profissionais. A página de mentoria deixa isso explícito. Os exemplos profissionais não são anúncios de vagas abertas. Condições e conteúdo dos sites externos precisam ser conferidos nas fontes originais.

Há um manifesto e um ícone válido, mas não há service worker nem suporte completo offline. Testes automatizados de acessibilidade não substituem avaliação com tecnologias assistivas e usuários reais. Safari, Firefox, aparelhos físicos, carga e uma auditoria de segurança especializada não foram testados.
