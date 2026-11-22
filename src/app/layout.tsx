import type { Metadata, Viewport } from 'next';
import { Navigation } from '@/components/navigation';
import './globals.css';
export const metadata: Metadata = { title: { default: 'ShieldUp — Cidadania Digital', template: '%s | ShieldUp' }, description: 'Educação digital sobre golpes, privacidade e inteligência artificial para jovens do interior.', manifest: `${process.env.PAGES_BASE_PATH ?? ''}/manifest.json` };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0f172a' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Navigation /><main id="conteudo" tabIndex={-1} className="max-w-4xl mx-auto px-4 py-8">{children}</main><footer className="max-w-4xl mx-auto px-4 py-6 border-t border-slate-700 text-slate-300 text-sm">ShieldUp · Aprender para navegar com mais autonomia.<br />Sem cadastro. Seu progresso fica salvo neste navegador.</footer></body></html>;
}
