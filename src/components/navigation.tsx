'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const links = [['/detector', 'Detector'], ['/ia', 'IA'], ['/privacidade', 'Privacidade'], ['/oportunidades', 'Oportunidades'], ['/mentoria', 'Mentoria']];
export function Navigation() {
  const path = usePathname();
  return <header className="border-b border-slate-700 bg-slate-800"><div className="mx-auto max-w-4xl px-4 py-4"><Link href="/" className="text-xl font-bold text-blue-300">ShieldUp</Link><nav className="mt-3 flex flex-wrap gap-x-5 gap-y-3" aria-label="Navegação principal">{links.map(([href, title]) => <Link href={href} key={href} aria-current={path === href ? 'page' : undefined} className="nav-link">{title}</Link>)}</nav></div></header>;
}
