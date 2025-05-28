#!/bin/bash

# ===============================================
# SCRIPT DE REORGANIZAÇÃO - SITE STRATEUP (v2)
# ===============================================
# OBJETIVO: Mover arquivos para a nova estrutura.
# ATENÇÃO: ESTE SCRIPT IRÁ QUEBRAR OS IMPORTS!
#          Execute em um branch separado e prepare-se
#          para corrigir os imports manually depois.
# CORREÇÃO v2: Adicionadas aspas simples para tratar
#              nomes de pasta com parênteses ().
# ===============================================

echo "--- Iniciando a reorganização da estrutura de pastas (v2) ---"

# --- 1. Criação das Novas Estruturas ---
echo "[MKDIR] Criando diretórios base..."
mkdir -p core
mkdir -p components/ui components/features components/layout components/shared
mkdir -p 'app/(auth)' 'app/(marketing)' 'app/(funnels)' 'app/(platform)' app/api
mkdir -p translations # Diretório consolidado

echo "[MKDIR] Criando estrutura 'core'..."
mkdir -p core/actions core/contexts core/hooks core/lib/supabase core/lib/mailer core/services core/types core/utils

echo "[MKDIR] Criando estrutura 'app'..."
mkdir -p 'app/(marketing)/blog/categoria' 'app/(marketing)/servicos' 'app/(marketing)/termos' 'app/(marketing)/sobre' 'app/(marketing)/privacidade' 'app/(marketing)/contato' 'app/(marketing)/docs'
mkdir -p 'app/(funnels)/diagnostico' 'app/(funnels)/resultados'
mkdir -p 'app/(platform)/admin'
mkdir -p 'app/(auth)/admin/login' 'app/(auth)/admin/setup' 'app/(auth)/admin/reset-password' 'app/(auth)/admin/forgot-password' 'app/(auth)/admin/change-password'
mkdir -p app/api/webhooks

echo "[MKDIR] Criando estrutura 'components/features'..."
mkdir -p components/features/admin components/features/blog components/features/diagnostic components/features/chatbot components/features/analytics components/features/ab-testing components/features/sections

echo "[MKDIR] Diretórios criados com sucesso!"

# --- 2. Movimentação dos Arquivos ---
echo "[MV] Movendo arquivos... (AVISOS sobre 'Não existe' podem ocorrer se a estrutura já foi parcialmente movida)"

# Mover Core/Lib
echo "[MV] Movendo lib..."
mv lib/supabase.ts core/lib/supabase/client.ts 2>/dev/null || echo "AVISO: Falha ao mover lib/supabase.ts"
mv lib/create-supabase-client.ts core/lib/supabase/server.ts 2>/dev/null || echo "AVISO: Falha ao mover lib/create-supabase-client.ts"
mv lib/utils.ts core/utils/index.ts 2>/dev/null || echo "AVISO: Falha ao mover lib/utils.ts"
mv lib/security.ts core/utils/security.ts 2>/dev/null || echo "AVISO: Falha ao mover lib/security.ts"
mv lib/password-security.ts core/utils/password-security.ts 2>/dev/null || echo "AVISO: Falha ao mover lib/password-security.ts"

# Mover Core/Actions
echo "[MV] Movendo actions..."
mv app/actions/* core/actions/ 2>/dev/null || echo "AVISO: Falha ao mover app/actions/*"

# Mover Core/Contexts e Hooks
echo "[MV] Movendo contexts e hooks..."
mv contexts/* core/contexts/ 2>/dev/null || echo "AVISO: Falha ao mover contexts/*"
mv hooks/* core/hooks/ 2>/dev/null || echo "AVISO: Falha ao mover hooks/*"

# Mover Core/Types
echo "[MV] Movendo types..."
mv types/* core/types/ 2>/dev/null || echo "AVISO: Falha ao mover types/*"

# Mover Core/Services
echo "[MV] Movendo services..."
mv services/* core/services/ 2>/dev/null || echo "AVISO: Falha ao mover services/*"

# Mover Translations (Consolidando)
echo "[MV] Movendo translations..."
mv translations/* translations/ 2>/dev/null || echo "AVISO: Falha ao mover translations/*"
mv public/translations/* translations/ 2>/dev/null || echo "AVISO: Falha ao mover public/translations/*"
rmdir public/translations 2>/dev/null || echo "INFO: 'public/translations' não removido (não existe ou não está vazio)."

# Mover Components/Features
echo "[MV] Movendo components/features..."
mv components/admin/* components/features/admin/ 2>/dev/null || echo "AVISO: Falha ao mover components/admin/*"
mv components/blog/* components/features/blog/ 2>/dev/null || echo "AVISO: Falha ao mover components/blog/*"
mv components/diagnostic/* components/features/diagnostic/ 2>/dev/null || echo "AVISO: Falha ao mover components/diagnostic/*"
mv components/chatbot/* components/features/chatbot/ 2>/dev/null || echo "AVISO: Falha ao mover components/chatbot/*"
mv components/analytics/* components/features/analytics/ 2>/dev/null || echo "AVISO: Falha ao mover components/analytics/*"
mv components/ab-testing/* components/features/ab-testing/ 2>/dev/null || echo "AVISO: Falha ao mover components/ab-testing/*"
mv components/sections/* components/features/sections/ 2>/dev/null || echo "AVISO: Falha ao mover components/sections/*"

# Mover Components/Layout (Apenas os que existem)
echo "[MV] Movendo components/layout..."
mv components/layout/header.tsx components/layout/header.tsx 2>/dev/null || echo "AVISO: Falha ao mover components/layout/header.tsx"
mv components/layout/footer.tsx components/layout/footer.tsx 2>/dev/null || echo "AVISO: Falha ao mover components/layout/footer.tsx"
mv components/ui/sidebar.tsx components/layout/sidebar.tsx 2>/dev/null || echo "AVISO: Falha ao mover components/ui/sidebar.tsx"

# Mover Components/Shared (Exemplos)
echo "[MV] Movendo components/shared..."
mv components/theme-provider.tsx components/shared/theme-provider.tsx 2>/dev/null || echo "AVISO: Falha ao mover components/theme-provider.tsx"
mv components/language-switcher.tsx components/shared/language-switcher.tsx 2>/dev/null || echo "AVISO: Falha ao mover components/language-switcher.tsx"
mv components/ui/logo.tsx components/shared/logo.tsx 2>/dev/null || echo "AVISO: Falha ao mover components/ui/logo.tsx"
mv components/ui/loading.tsx components/shared/loading.tsx 2>/dev/null || echo "AVISO: Falha ao mover components/ui/loading.tsx"

# Mover App/Pages (Marketing)
echo "[MV] Movendo páginas (Marketing)..."
mv app/page.tsx 'app/(marketing)/page.tsx' 2>/dev/null || echo "AVISO: Falha ao mover app/page.tsx"
mv app/blog 'app/(marketing)/blog' 2>/dev/null || echo "AVISO: Falha ao mover app/blog"
mv app/contato 'app/(marketing)/contato' 2>/dev/null || echo "AVISO: Falha ao mover app/contato"
mv app/servicos 'app/(marketing)/servicos' 2>/dev/null || echo "AVISO: Falha ao mover app/servicos"
mv app/sobre 'app/(marketing)/sobre' 2>/dev/null || echo "AVISO: Falha ao mover app/sobre"
mv app/termos 'app/(marketing)/termos' 2>/dev/null || echo "AVISO: Falha ao mover app/termos"
mv app/privacidade 'app/(marketing)/privacidade' 2>/dev/null || echo "AVISO: Falha ao mover app/privacidade"
mv app/docs 'app/(marketing)/docs' 2>/dev/null || echo "AVISO: Falha ao mover app/docs"

# Mover App/Pages (Funnels)
echo "[MV] Movendo páginas (Funnels)..."
mv app/diagnostico 'app/(funnels)/diagnostico' 2>/dev/null || echo "AVISO: Falha ao mover app/diagnostico"
mv app/resultados 'app/(funnels)/resultados' 2>/dev/null || echo "AVISO: Falha ao mover app/resultados"
# Se (funnels) já existe, movemos seu layout
mv 'app/(funnels)/layout.tsx' 'app/(funnels)/layout.tsx' 2>/dev/null || echo "AVISO: Falha ao mover app/(funnels)/layout.tsx"


# Mover App/Pages (Admin/Auth)
echo "[MV] Movendo páginas (Admin/Auth)..."
mv app/admin/login 'app/(auth)/admin/login' 2>/dev/null || echo "AVISO: Falha ao mover app/admin/login"
mv app/admin/setup 'app/(auth)/admin/setup' 2>/dev/null || echo "AVISO: Falha ao mover app/admin/setup"
mv app/admin/reset-password 'app/(auth)/admin/reset-password' 2>/dev/null || echo "AVISO: Falha ao mover app/admin/reset-password"
mv app/admin/forgot-password 'app/(auth)/admin/forgot-password' 2>/dev/null || echo "AVISO: Falha ao mover app/admin/forgot-password"
mv app/admin/change-password 'app/(auth)/admin/change-password' 2>/dev/null || echo "AVISO: Falha ao mover app/admin/change-password"
mv app/admin/page.tsx 'app/(platform)/admin/page.tsx' 2>/dev/null || echo "AVISO: Falha ao mover app/admin/page.tsx"
mv app/admin/layout.tsx 'app/(platform)/admin/layout.tsx' 2>/dev/null || echo "AVISO: Falha ao mover app/admin/layout.tsx"
mv app/admin/loading.tsx 'app/(platform)/admin/loading.tsx' 2>/dev/null || echo "AVISO: Falha ao mover app/admin/loading.tsx"

# --- 3. Limpeza (Opcional - CUIDADO!) ---
echo "[RMDIR] Tentando limpar diretórios antigos (Apenas se estiverem vazios)..."
rmdir lib contexts hooks types services public/translations app/actions app/admin components/admin components/blog components/diagnostic components/chatbot components/analytics components/ab-testing components/sections 2>/dev/null

echo "--- Reorganização via script concluída. ---"
echo "==============================================="
echo "🚨 AÇÃO NECESSÁRIA AGORA: 🚨"
echo "1. Verifique os arquivos e pastas movidos."
echo "2. **CORRIJA TODOS OS CAMINHOS DE IMPORTAÇÃO** nos arquivos .ts e .tsx."
echo "3. Atualize seu 'tsconfig.json' com os 'paths' se ainda não o fez."
echo "4. Rode 'pnpm install' (ou npm/yarn)."
echo "5. Teste a aplicação COMPLETAMENTE ('pnpm dev' e 'pnpm build')."
echo "6. Faça o commit das alterações no Git ('git add .' e 'git commit')."
echo "==============================================="