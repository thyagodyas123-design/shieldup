import { PrivacySimulator } from '@/components/exercises';
export default function Privacidade() {
  const tips = [
    { title: "WhatsApp", tips: ["Ative verificação em duas etapas", "Desative 'visto por último' para desconhecidos", "Não compartilhe localização em tempo real"] },
    { title: "Instagram", tips: ["Conta privada para menores", "Desative 'Atividade de status'", "Revise aplicativos conectados"] },
    { title: "Geral", tips: ["Use senhas diferentes para cada serviço", "Ative 2FA em todas as contas", "Nunca compartilhe CPF/senha por mensagem"] },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-400">🔐 Privacidade e Dados</h1>
      <p className="text-slate-300">Proteja suas informações pessoais. Compartilhamento responsável começa com você.</p>

      {tips.map((t) => (
        <div key={t.title} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <h2 className="font-semibold mb-3">📱 {t.title}</h2>
          <ul className="space-y-1">
            {t.tips.map((tip, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-green-400">✓</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <PrivacySimulator />

      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h2 className="font-semibold mb-3">📜 LGPD Simplificada</h2>
        <p className="text-slate-300 text-sm">A Lei Geral de Proteção de Dados (LGPD) garante que suas informações pessoais sejam tratadas com segurança e transparência. Você tem direito de saber quem tem seus dados e pedir a exclusão.</p>
      </div>
    </div>
  );
}
