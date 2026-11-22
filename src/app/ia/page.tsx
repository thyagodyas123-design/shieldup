import { PromptChallenge } from '@/components/exercises';
export default function IA() {
  const tools = [
    { name: "ChatGPT", desc: "Conversar, escrever textos, tirar dúvidas", icon: "💬" },
    { name: "DALL-E / Midjourney", desc: "Criar imagens com IA", icon: "🎨" },
    { name: "GitHub Copilot", desc: "Programar com ajuda de IA", icon: "💻" },
    { name: "Whisper", desc: "Transcrever áudio em texto", icon: "🎤" },
    { name: "Stable Diffusion", desc: "Gerar imagens com modelos de IA", icon: "🖼️" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-400">🤖 IA para Todos</h1>
      <p className="text-slate-300">Descubra o poder da Inteligência Artificial e como usá-la de forma responsável.</p>

      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h2 className="font-semibold mb-3">O que é IA?</h2>
        <p className="text-slate-300 text-sm">Inteligência Artificial é a capacidade de máquinas aprenderem, raciocinarem e tomarem decisões. Hoje, a IA está em tudo: assistentes virtuais, recomendações de vídeos, tradução automática e muito mais.</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h2 className="font-semibold mb-3">Ferramentas de IA para conhecer</h2>
        <p className="help mb-3">Planos, limites de uso e disponibilidade variam por ferramenta.</p>
        <div className="space-y-3">
          {tools.map((t) => (
            <div key={t.name} className="flex items-center gap-3 bg-slate-700 rounded-lg p-3">
              <span className="text-2xl">{t.icon}</span>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-slate-300 text-sm">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PromptChallenge />

      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h2 className="font-semibold mb-3">⚠️ IA Responsável</h2>
        <ul className="text-slate-300 text-sm space-y-1">
          <li>• Não compartilhe dados pessoais com IA</li>
          <li>• Sempre verifique informações geradas por IA</li>
          <li>• Use IA como ferramenta, não como verdade absoluta</li>
          <li>• Respeite direitos autorais em conteúdos gerados por IA</li>
        </ul>
      </div>
    </div>
  );
}
