// /next.config.mjs - VERSÃO COMPLETA E ATUALIZADA COM CSP CORRIGIDA
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true, // ATENÇÃO: Idealmente, corrija os erros de ESLint.
  },

  typescript: {
    ignoreBuildErrors: true, // ATENÇÃO: Idealmente, corrija os erros de TypeScript.
  },

  images: {
    domains: ['strateup.com.br'], // Verifique se este domínio é realmente para imagens externas otimizadas.
    unoptimized: true, // ATENÇÃO: Desabilita a otimização de imagens do Next.js. Avalie a necessidade.
  },

  async headers() {
    return [
      {
        source: '/:path*', // Aplica a todas as rotas
        headers: [
          // --- Cabeçalhos de Segurança Padrão ---
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // --- Content Security Policy (CSP) ---
          {
            key: 'Content-Security-Policy',
            // CSP Alinhada com Vercel Analytics, Google Translate e Supabase
            // MANTENHA APENAS AS FONTES QUE VOCÊ REALMENTE USA.
            value: [
              "default-src 'self'", // Padrão: permite apenas do próprio domínio
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://translate.google.com https://translate.googleapis.com https://va.vercel-scripts.com", // Adicionado Vercel Analytics
              "style-src 'self' 'unsafe-inline'", // Permite estilos inline e do próprio domínio
              "img-src 'self' data: https://strateup.com.br", // Permite imagens do próprio domínio, data URIs e do seu domínio de imagens
              "font-src 'self' data:", // Permite fontes do próprio domínio e data URIs
              // ADICIONE A URL DA SUA API SUPABASE AQUI (sem o https:// no início, apenas o domínio)
              // Exemplo: connect-src 'self' https://va.vercel-scripts.com xyzabc.supabase.co wss://xyzabc.supabase.co;
              "connect-src 'self' https://va.vercel-scripts.com SEU_ID_PROJETO_SUPABASE.supabase.co wss://SEU_ID_PROJETO_SUPABASE.supabase.co",
              "object-src 'none'", // Não permite <object>, <embed>, <applet>
              "frame-ancestors 'self'", // Não permite que seu site seja embutido em iframes de outros domínios
              "form-action 'self'", // Permite que formulários enviem apenas para o próprio domínio
              "upgrade-insecure-requests" // Converte HTTP para HTTPS
            ].join('; '),
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/servicos/:service',
        destination: '/servicos#:service',
        permanent: true,
      },
    ];
  },

  experimental: {
    // serverActions: true, // Habilitado por padrão no Next 14+
  },
};

export default nextConfig;