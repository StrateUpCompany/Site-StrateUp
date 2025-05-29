// import-fixer.js (v2.0)
const fs = require('fs');
const path = require('path');

// --- CONFIGURAÇÃO ---
const ROOT_DIR = '/Users/smotion/Documents/GitHub/Site-StrateUp'; // ATUALIZE SE NECESSÁRIO
const TSCONFIG_PATH = path.join(ROOT_DIR, 'tsconfig.json');
const DRY_RUN = false; // true para simular, false para aplicar as mudanças
const DEBUG_LOG = false; // true para logs mais detalhados

// --- MAPA DE MOVIMENTAÇÃO DE ARQUIVOS ("De -> Para") ---
// Chaves e valores NORMALIZADOS (sem extensão .ts/.tsx, sem /index no final)
const fileMappings = {
  // Libs to Core
  'lib/supabase': 'core/lib/supabase/client',
  'lib/create-supabase-client': 'core/lib/supabase/server',
  'lib/utils': 'core/utils', // era lib/utils.ts -> core/utils/index.ts
  'lib/security': 'core/utils/security',
  'lib/password-security': 'core/utils/password-security',

  // Actions to Core
  'app/actions/auth-actions': 'core/actions/auth-actions',
  'app/actions/admin-actions': 'core/actions/admin-actions',
  'app/actions/blog-actions': 'core/actions/blog-actions',
  'app/actions/consultation-actions': 'core/actions/consultation-actions',
  'app/actions/contact-actions': 'core/actions/contact-actions',
  'app/actions/diagnostic-actions': 'core/actions/diagnostic-actions',
  'app/actions/newsletter-actions': 'core/actions/newsletter-actions',

  // Contexts to Core
  'contexts/auth-context': 'core/contexts/auth-context',

  // Hooks to Core
  'hooks/use-form-validation': 'core/hooks/use-form-validation',
  'hooks/use-mobile': 'core/hooks/use-mobile',
  'hooks/use-toast': 'core/hooks/use-toast',
  'hooks/use-translations': 'core/hooks/use-translations',

  // Types to Core
  'types/blog': 'core/types/blog',
  'types/translations': 'core/types/translations',

  // Services to Core
  'services/translation-service': 'core/services/translation-service',

  // Components/Features
  'components/admin/ai-tools': 'components/features/admin/ai-tools',
  'components/admin/blog-manager': 'components/features/admin/blog-manager',
  'components/admin/dashboard-analytics': 'components/features/admin/dashboard-analytics',
  'components/admin/script-executor': 'components/features/admin/script-executor',
  'components/admin/seo-tools': 'components/features/admin/seo-tools',
  'components/admin/supabase-checker': 'components/features/admin/supabase-checker',
  'components/admin/user-manager': 'components/features/admin/user-manager',

  'components/blog/BlogCategoryCard': 'components/features/blog/BlogCategoryCard',
  'components/blog/BlogPostCard': 'components/features/blog/BlogPostCard',
  'components/blog/BlogPostList': 'components/features/blog/BlogPostList',
  'components/blog/NewsletterForm': 'components/features/blog/NewsletterForm',
  'components/blog/SearchInput': 'components/features/blog/SearchInput',

  'components/diagnostic/benefits': 'components/features/diagnostic/benefits',
  'components/diagnostic/cta': 'components/features/diagnostic/cta',
  'components/diagnostic/diagnostic-form': 'components/features/diagnostic/diagnostic-form',
  'components/diagnostic/faq': 'components/features/diagnostic/faq',
  'components/diagnostic/methodology': 'components/features/diagnostic/methodology',
  'components/diagnostic/results-action-plan': 'components/features/diagnostic/results-action-plan',
  'components/diagnostic/results-detailed-analysis': 'components/features/diagnostic/results-detailed-analysis',
  'components/diagnostic/results-download-pdf': 'components/features/diagnostic/results-download-pdf',
  'components/diagnostic/results-overview': 'components/features/diagnostic/results-overview',
  'components/diagnostic/results-recommendations': 'components/features/diagnostic/results-recommendations',
  'components/diagnostic/testimonials': 'components/features/diagnostic/testimonials',

  'components/chatbot/agenda-selector': 'components/features/chatbot/agenda-selector',
  'components/chatbot/chatbot-sdr': 'components/features/chatbot/chatbot-sdr',
  'components/chatbot/chatbot-wrapper': 'components/features/chatbot/chatbot-wrapper',
  'components/chatbot/whatsapp-integration': 'components/features/chatbot/whatsapp-integration',

  'components/analytics/analytics': 'components/features/analytics/analytics',
  'components/ab-testing/ab-test': 'components/features/ab-testing/ab-test',

  'components/sections/benefits-section': 'components/features/sections/benefits-section',
  'components/sections/contact-form': 'components/features/sections/contact-form',
  'components/sections/cta-section': 'components/features/sections/cta-section',
  'components/sections/faq-section': 'components/features/sections/faq-section',
  'components/sections/hero-section-ab': 'components/features/sections/hero-section-ab',
  'components/sections/hero-section-alt': 'components/features/sections/hero-section-alt',
  'components/sections/hero-section-funnel': 'components/features/sections/hero-section-funnel',
  'components/sections/hero-section': 'components/features/sections/hero-section',
  'components/sections/how-it-works-section': 'components/features/sections/how-it-works-section',
  'components/sections/team-section': 'components/features/sections/team-section',
  'components/sections/testimonials-section': 'components/features/sections/testimonials-section',

  // Components/Layout
  'components/ui/sidebar': 'components/layout/sidebar',

  // Components/Shared
  'components/theme-provider': 'components/shared/theme-provider',
  'components/language-switcher': 'components/shared/language-switcher',
  'components/ui/logo': 'components/shared/logo',
  'components/ui/loading': 'components/shared/loading',

  // App/Pages (Marketing)
  'app/page': 'app/(marketing)/page',
  'app/blog/page': 'app/(marketing)/blog/page',
  'app/blog/BlogClientPage': 'app/(marketing)/blog/BlogClientPage',
  'app/blog/[slug]/page': 'app/(marketing)/blog/[slug]/page',
  'app/blog/categoria/[category]/loading': 'app/(marketing)/blog/categoria/[category]/loading',
  'app/blog/categoria/[category]/page': 'app/(marketing)/blog/categoria/[category]/page',
  'app/blog/loading': 'app/(marketing)/blog/loading',
  'app/blog/not-found': 'app/(marketing)/blog/not-found',

  'app/contato/page': 'app/(marketing)/contato/page',
  'app/contato/ContatoPageClient': 'app/(marketing)/contato/ContatoPageClient',

  'app/docs/page': 'app/(marketing)/docs/page',
  'app/privacidade/page': 'app/(marketing)/privacidade/page',

  'app/servicos/page': 'app/(marketing)/servicos/page',
  'app/servicos/[service]/page': 'app/(marketing)/servicos/[service]/page',

  'app/sobre/page': 'app/(marketing)/sobre/page',
  'app/termos/page': 'app/(marketing)/termos/page',

  // App/Pages (Funnels)
  'app/(funnels)/diagnostico/metadata': 'app/(funnels)/diagnostico/metadata',
  'app/(funnels)/diagnostico/page': 'app/(funnels)/diagnostico/page',
  // 'app/(funnels)/diagnostico/styles.css' // CSS file, not handled by this JS/TS import fixer
  'app/(funnels)/resultados/[id]/page': 'app/(funnels)/resultados/[id]/page',
  'app/(funnels)/layout': 'app/(funnels)/layout',

  // App/Pages (Admin/Auth/Platform)
  'app/admin/login/page': 'app/(auth)/admin/login/page',
  'app/admin/setup/page': 'app/(auth)/admin/setup/page',
  'app/admin/reset-password/page': 'app/(auth)/admin/reset-password/page',
  'app/admin/reset-password/loading': 'app/(auth)/admin/reset-password/loading',
  'app/admin/forgot-password/page': 'app/(auth)/admin/forgot-password/page',
  'app/admin/change-password/page': 'app/(auth)/admin/change-password/page',
  
  'app/admin/page': 'app/(platform)/admin/page',
  'app/admin/layout': 'app/(platform)/admin/layout',
  'app/admin/loading': 'app/(platform)/admin/loading',

  // Arquivos Raiz (ou app/ raiz) que não mudaram, mas precisam ter seus imports internos checados
  'middleware': 'middleware',
  'app/layout': 'app/layout',
};

let pathAliases = { baseUrl: '.', paths: {} };
const ABSOLUTE_PATH_ALIASES = ['@/']; // Adicione outros aliases absolutos se houver, ex: '~/'

function normalizePathForMap(filePath) {
    let normalized = filePath.replace(/\\/g, '/');
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    for (const ext of extensions) {
        if (normalized.endsWith(ext)) {
            normalized = normalized.slice(0, -ext.length);
            break;
        }
    }
    if (normalized.endsWith('/index')) {
        normalized = normalized.slice(0, -'/index'.length);
    }
    if (normalized === 'index' || normalized === '') return '.';
    return normalized;
}


function parseTsConfig() {
  try {
    if (!fs.existsSync(TSCONFIG_PATH)) {
        console.warn(`AVISO: tsconfig.json não encontrado em '${TSCONFIG_PATH}'. Usando configuração de alias padrão @/ -> ./`);
        pathAliases = { 
            baseUrl: path.resolve(ROOT_DIR, '.'), 
            paths: { "@/*": [path.resolve(ROOT_DIR, "./")] } 
        };
        if (DEBUG_LOG) console.log('TSConfig padrão (fallback) carregado:', pathAliases);
        return;
    }
    
    const tsConfigRaw = fs.readFileSync(TSCONFIG_PATH, 'utf-8')
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // Remove block and line comments

    const tsConfig = JSON.parse(tsConfigRaw);
    pathAliases.baseUrl = path.resolve(ROOT_DIR, tsConfig.compilerOptions?.baseUrl || '.');
    
    if (tsConfig.compilerOptions?.paths) {
      pathAliases.paths = {};
      for(const alias in tsConfig.compilerOptions.paths) {
          const anAliasPattern = alias.endsWith('/*') ? alias : alias + (alias.endsWith('/') ? '*' : '/*');
          pathAliases.paths[anAliasPattern] = tsConfig.compilerOptions.paths[alias].map(
              // Resolve o target do alias relativo ao baseUrl, e depois torna-o absoluto
              p => path.resolve(pathAliases.baseUrl, p.endsWith('/*') ? p.slice(0,-1) : p) 
          );
      }
    } else {
      pathAliases.paths = { "@/*": [path.resolve(pathAliases.baseUrl, "./")] };
    }
    if (DEBUG_LOG) console.log('TSConfig Parsed. Base URL (Absolute):', pathAliases.baseUrl, 'Paths (Absolute Targets):', pathAliases.paths);
  } catch (error) {
    console.error(`ERRO: Não foi possível ler ou parsear o tsconfig.json em ${TSCONFIG_PATH}`, error);
    console.warn('AVISO: Continuando com aliases de path padrão. A resolução de @/ pode não ser precisa.');
    pathAliases = { 
        baseUrl: path.resolve(ROOT_DIR, '.'), 
        paths: { "@/*": [path.resolve(ROOT_DIR, "./")] } // Note que o target do path aqui é relativo ao baseUrl, então "./" já está correto se baseUrl é ROOT_DIR
    };
  }
}

function getNewPathForMovedFile(oldNormalizedPathFromRoot) {
  return fileMappings[oldNormalizedPathFromRoot] || oldNormalizedPathFromRoot;
}

function findActualFilePath(normalizedPathFromRoot) {
    // Tenta encontrar o arquivo/diretório real para o alvo normalizado
    const possibleBasePaths = [
        path.join(ROOT_DIR, normalizedPathFromRoot), // Caso seja um diretório exato
        path.join(ROOT_DIR, normalizedPathFromRoot + '.ts'),
        path.join(ROOT_DIR, normalizedPathFromRoot + '.tsx'),
        path.join(ROOT_DIR, normalizedPathFromRoot, 'index.ts'),
        path.join(ROOT_DIR, normalizedPathFromRoot, 'index.tsx'),
    ];

    for (const p of possibleBasePaths) {
        if (fs.existsSync(p)) {
            if (fs.lstatSync(p).isFile() || fs.lstatSync(p).isDirectory()) { // Aceita diretório se o import original era para um diretório
                return p;
            }
        }
    }
    if (DEBUG_LOG) console.warn(`    findActualFilePath: Não foi possível encontrar o arquivo/diretório real para: ${normalizedPathFromRoot}`);
    return null;
}


function calculateNewImportPath(importingFileNewRelativePath, importedModuleOldNormalizedTargetFromRoot) {
  const importedModuleNewNormalizedTargetFromRoot = getNewPathForMovedFile(importedModuleOldNormalizedTargetFromRoot);

  const importingFileNewDirAbsolute = path.dirname(path.join(ROOT_DIR, importingFileNewRelativePath));
  const importedModuleNewFullPathAbsolute = findActualFilePath(importedModuleNewNormalizedTargetFromRoot);

  if (!importedModuleNewFullPathAbsolute) {
      if (DEBUG_LOG) console.warn(`    calculateNewImportPath: Falha ao encontrar o arquivo real para o novo alvo: ${importedModuleNewNormalizedTargetFromRoot}`);
      return null; 
  }

  if (DEBUG_LOG) {
    // console.log(`  CalculateNewImportPath Details:`);
    // console.log(`    Importing File (New Rel Path): ${importingFileNewRelativePath}`);
    // console.log(`    Imported Module (Old Norm Target from Root): ${importedModuleOldNormalizedTargetFromRoot}`);
    // console.log(`    Imported Module (New Norm Target from Root): ${importedModuleNewNormalizedTargetFromRoot}`);
    // console.log(`    Imported Module (New Full Abs Path): ${importedModuleNewFullPathAbsolute}`);
  }

  // Tentar usar alias @/ para o novo caminho
  const aliasEntries = Object.entries(pathAliases.paths);
  for (const [aliasPattern, targetBaseDirsAbsolute] of aliasEntries) { // aliasPattern ex: "@/*"
    if (aliasPattern.endsWith('/*')) {
      const aliasPrefix = aliasPattern.slice(0, -1); // Ex: "@/"
      for (const targetBaseDirAbsolute of targetBaseDirsAbsolute) { 
        if (importedModuleNewFullPathAbsolute.startsWith(targetBaseDirAbsolute + path.sep) || importedModuleNewFullPathAbsolute === targetBaseDirAbsolute) {
          let pathRelativeToAliasBase = path.relative(targetBaseDirAbsolute, importedModuleNewFullPathAbsolute);
          pathRelativeToAliasBase = pathRelativeToAliasBase.replace(/\\/g, '/');
          
          let aliasedPathNormalized = normalizePathForMap(pathRelativeToAliasBase);
          // Se o path normalizado for vazio (ex: importando o próprio diretório base do alias), usar '.'
          if(aliasedPathNormalized === '' && importedModuleNewFullPathAbsolute === targetBaseDirAbsolute) aliasedPathNormalized = '.'; 
          else if (aliasedPathNormalized === '.' && pathRelativeToAliasBase !== '.') aliasedPathNormalized = pathRelativeToAliasBase;


          let finalAliasedPath = aliasPrefix + aliasedPathNormalized;
          
          if (DEBUG_LOG) console.log(`    --> Path via Alias '${aliasPattern}': ${finalAliasedPath}`);
          return finalAliasedPath;
        }
      }
    }
  }

  // Calcular caminho relativo
  let relativePath = path.relative(importingFileNewDirAbsolute, importedModuleNewFullPathAbsolute);
  relativePath = relativePath.replace(/\\/g, '/');

  if (!relativePath.startsWith('.') && !relativePath.startsWith('..')) {
    relativePath = './' + relativePath;
  }

  relativePath = normalizePathForMap(relativePath);
  
  if (DEBUG_LOG) console.log(`    --> Path Relative: ${relativePath}`);
  return relativePath;
}


function processFile(newAbsoluteFilePath) {
  let oldRelativeFilePathNormalized = null; 
  const newRelativeFilePathForLookup = normalizePathForMap(path.relative(ROOT_DIR, newAbsoluteFilePath));

  for (const [oldPathNormalizedEntry, newPathNormalizedEntry] of Object.entries(fileMappings)) {
    if (newPathNormalizedEntry === newRelativeFilePathForLookup) {
      oldRelativeFilePathNormalized = oldPathNormalizedEntry;
      break;
    }
  }
  if (!oldRelativeFilePathNormalized) {
    oldRelativeFilePathNormalized = newRelativeFilePathForLookup; 
  }
  
  const newRelativeFilePathForLog = path.relative(ROOT_DIR, newAbsoluteFilePath);
  if (DEBUG_LOG) console.log(`\nProcessing (New Abs Path): ${newAbsoluteFilePath}\n  Old Relative Path (Normalized for Map): ${oldRelativeFilePathNormalized}\n  New Relative Path (for Log): ${newRelativeFilePathForLog}`);

  try {
    if (!fs.existsSync(newAbsoluteFilePath)) {
        if(DEBUG_LOG) console.warn(`  AVISO: Arquivo não encontrado em ${newAbsoluteFilePath}. Pulando.`);
        return;
    }
    let content = fs.readFileSync(newAbsoluteFilePath, 'utf-8');
    let originalContent = content;
    let newFileContent = "";
    let lastIndexProcessed = 0;

    const importRegex = /import(\s+type)?\s*(\{[\s\S]*?\}|[\w\s*]*?as\s+[\w*]+|\w+|[\w\s*]+)?\s*from\s*['"]([^'"]+)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      newFileContent += content.substring(lastIndexProcessed, match.index); 
      
      const fullImportStatement = match[0];
      const originalImportPathString = match[3];

      if (DEBUG_LOG) console.log(`  Found import statement: ${fullImportStatement.split('\n')[0]} (Original Path: '${originalImportPathString}')`);

      const isExternalOrNodeModule = !originalImportPathString.startsWith('.') && !ABSOLUTE_PATH_ALIASES.some(alias => originalImportPathString.startsWith(alias));
      if (isExternalOrNodeModule) {
        if (DEBUG_LOG) console.log(`    Ignorando (externo/node_module): ${originalImportPathString}`);
        newFileContent += fullImportStatement;
        lastIndexProcessed = importRegex.lastIndex;
        continue;
      }

      // Determinar o caminho absoluto antigo do módulo importado
      let oldAbsoluteTargetOfImport;
      // O oldRelativeFilePathNormalized é o caminho do *arquivo que está importando*, na estrutura antiga, normalizado.
      // Precisamos adicionar uma extensão temporária para que path.dirname funcione como esperado para arquivos, não diretórios.
      const tempOldImportingFileForPathOps = oldRelativeFilePathNormalized.includes('.') ? oldRelativeFilePathNormalized : oldRelativeFilePathNormalized + '.ts';
      let oldAbsoluteDirOfImportingFile = path.dirname(path.join(ROOT_DIR, tempOldImportingFileForPathOps));

      if (ABSOLUTE_PATH_ALIASES.some(alias => originalImportPathString.startsWith(alias))) {
          let aliasUsed = ABSOLUTE_PATH_ALIASES.find(a => originalImportPathString.startsWith(a));
          let pathWithoutAlias = originalImportPathString.substring(aliasUsed.length);
          
          const aliasPatternInTsConfig = aliasUsed + '*'; 
          const targetBaseDirsAbsolute = pathAliases.paths[aliasPatternInTsConfig];

          if (targetBaseDirsAbsolute && targetBaseDirsAbsolute.length > 0) {
              const baseDirForAlias = targetBaseDirsAbsolute[0]; 
              oldAbsoluteTargetOfImport = path.resolve(baseDirForAlias, pathWithoutAlias);
          } else {
              if(DEBUG_LOG) console.warn(`    AVISO: Alias '${aliasUsed}' não encontrado no tsconfig.paths resolvido para ${originalImportPathString}. Tentando com baseUrl.`);
              oldAbsoluteTargetOfImport = path.resolve(pathAliases.baseUrl, pathWithoutAlias);
          }
      } else { // Caminho relativo
          oldAbsoluteTargetOfImport = path.resolve(oldAbsoluteDirOfImportingFile, originalImportPathString);
      }
      
      const oldTargetNormalizedForMapLookup = normalizePathForMap(path.relative(ROOT_DIR, oldAbsoluteTargetOfImport));
      if (DEBUG_LOG) console.log(`    Old Import Target (Normalized for Map Lookup): ${oldTargetNormalizedForMapLookup}`);

      const newCalculatedImportPath = calculateNewImportPath(newRelativeFilePathForLog, oldTargetNormalizedForMapLookup);

      if (newCalculatedImportPath && newCalculatedImportPath !== originalImportPathString) {
        if (DEBUG_LOG) console.log(`    !!! MUDANÇA: '${originalImportPathString}' -> '${newCalculatedImportPath}'`);
        const importPathStartIndex = fullImportStatement.lastIndexOf(originalImportPathString);
        const newImportStatement = fullImportStatement.substring(0, importPathStartIndex) +
                                 newCalculatedImportPath +
                                 fullImportStatement.substring(importPathStartIndex + originalImportPathString.length);
        newFileContent += newImportStatement;
      } else {
        if (DEBUG_LOG && newCalculatedImportPath === originalImportPathString) console.log(`    SEM MUDANÇA (caminho calculado é o mesmo ou normalizado é o mesmo): ${originalImportPathString}`);
        else if (DEBUG_LOG && newCalculatedImportPath !== null) console.warn(`    AVISO: Caminho calculado '${newCalculatedImportPath}' resultou em não mudança para '${originalImportPathString}'. Mantendo original.`);
        else if (DEBUG_LOG && newCalculatedImportPath === null) console.warn(`    AVISO: Não foi possível calcular novo caminho para '${originalImportPathString}'. Mantendo original.`);
        newFileContent += fullImportStatement;
      }
      lastIndexProcessed = importRegex.lastIndex;
    }
    newFileContent += content.substring(lastIndexProcessed); 
    
    if (newFileContent !== originalContent) {
      console.log(`  ARQUIVO MODIFICADO: ${newRelativeFilePathForLog}`);
      if (!DRY_RUN) {
        try {
            fs.writeFileSync(newAbsoluteFilePath, newFileContent, 'utf-8');
            console.log(`    SALVO: ${newRelativeFilePathForLog}`);
        } catch (writeError) {
            console.error(`  ERRO AO SALVAR ${newRelativeFilePathForLog}:`, writeError);
        }
      } else {
        console.log(`    DRY_RUN: Nenhuma alteração salva para ${newRelativeFilePathForLog}`);
      }
    }

  } catch (error) {
    console.error(`  ERRO GERAL ao processar ${newRelativeFilePathForLog}:`, error);
  }
}

function walkDir(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git' && !entry.name.startsWith('.')) {
          walkDir(fullPath);
        }
      } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        processFile(fullPath);
      }
    }
  } catch (error) {
      console.error(`ERRO ao ler diretório ${dir}:`, error);
  }
}

// --- EXECUÇÃO PRINCIPAL ---
console.log(`--- Iniciando correção de imports para StrateUp (v2.0) ---`);
console.log(`ROOT_DIR: ${ROOT_DIR}`);
console.log(`DRY_RUN: ${DRY_RUN}`);
console.log(`DEBUG_LOG: ${DEBUG_LOG}`);

if (!fs.existsSync(ROOT_DIR)) {
    console.error(`ERRO CRÍTICO: O ROOT_DIR '${ROOT_DIR}' não existe. Verifique a configuração.`);
    process.exit(1);
}

parseTsConfig();

console.log("\nIniciando varredura dos arquivos na NOVA estrutura...");
walkDir(ROOT_DIR);

console.log("\n--- Correção de imports concluída (v2.0) ---");
if (DRY_RUN) {
  console.log("AVISO: DRY_RUN estava ativo. Nenhuma alteração foi salva nos arquivos.");
  console.log("Execute com DRY_RUN = false para aplicar as correções.");
}
console.log("Por favor, revise os logs e as alterações (se houver) cuidadosamente.");