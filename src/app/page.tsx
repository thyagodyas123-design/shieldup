import Link from "next/link";
import { ProgressSummary } from "@/components/progress";

export default function Home() {
  const modules = [
    { href: "/detector", icon: "🛡️", title: "Detector de Golpes", desc: "Aprenda a identificar golpes, phishing e deepfakes" },
    { href: "/ia", icon: "🤖", title: "IA para Todos", desc: "Descubra o poder da Inteligência Artificial" },
    { href: "/privacidade", icon: "🔐", title: "Privacidade e Dados", desc: "Proteja suas informações pessoais" },
    { href: "/oportunidades", icon: "🚀", title: "Oportunidades em IA", desc: "Cursos, vagas e projetos em IA" },
    { href: "/mentoria", icon: "👨‍🏫", title: "Mentoria Segura", desc: "Prepare-se para uma mentoria segura" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">🛡️ ShieldUp</h1>
        <p className="text-slate-300 text-lg">Cidadania Digital para Jovens do Interior</p>
        <p className="text-slate-300 mt-2">Aprenda a se proteger de golpes e deepfakes, explore oportunidades em IA e prepare-se para uma mentoria segura.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m) => (
          <Link key={m.href} href={m.href} className="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition-colors border border-slate-700">
            <div className="text-3xl mb-2">{m.icon}</div>
            <h2 className="text-lg font-semibold text-white">{m.title}</h2>
            <p className="text-slate-300 text-sm mt-1">{m.desc}</p>
          </Link>
        ))}
      </div>

      <ProgressSummary />
    </div>
  );
}
