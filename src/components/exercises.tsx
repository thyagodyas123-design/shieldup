'use client';
import { useState, type FormEvent } from 'react';
import { analyzeLink, promptFeedback, type Activity, type LinkAnalysis } from '@/lib/learning';
import { useProgress } from './progress';
import { useHydrated } from './use-hydrated';
const questions: {id: Activity; question: string; options: string[]; correct: number; explanation: string}[] = [
  { id: 'golpe-link', question: 'Você recebeu no WhatsApp: “Ganhe R$500 agora! Clique aqui”. O que fazer?', options: ['Clicar para ver', 'Ignorar e não clicar', 'Encaminhar para amigos'], correct: 1, explanation: 'Promessas de dinheiro fácil e urgência são sinais de alerta. Verifique a origem sem abrir o link recebido.' },
  { id: 'golpe-video', question: 'Um vídeo de um famoso pede uma doação. Como verificar se é real?', options: ['Confiar no vídeo', 'Buscar na fonte oficial', 'Compartilhar para alertar'], correct: 1, explanation: 'Vídeos podem ser manipulados. Procure a publicação nos canais oficiais e confirme o destino da doação.' },
  { id: 'golpe-dados', question: 'Uma pessoa desconhecida pede seus dados bancários por mensagem. O que fazer?', options: ['Enviar os dados', 'Bloquear e denunciar', 'Responder perguntando mais'], correct: 1, explanation: 'Não envie dados bancários a desconhecidos. Bloqueie, denuncie e use os canais oficiais para confirmar contatos.' },
];
export function Quiz() {
  const hydrated = useHydrated();
  const { completed, complete } = useProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  return <div className="space-y-5">{questions.map((q, i) => {
    const done = completed.includes(q.id);
    const answer = answers[q.id];
    return <section key={q.id} className="panel"><fieldset><legend className="font-semibold mb-3">{i + 1}. {q.question}</legend>
      <div className="space-y-2">{q.options.map((option, j) => <button key={option} className="option" disabled={!hydrated || done} aria-pressed={answer === j || (done && j === q.correct)} onClick={() => { setAnswers(prev => ({ ...prev, [q.id]: j })); if (j === q.correct) complete(q.id); }}>{option}</button>)}</div>
      <div aria-live="polite">{done ? <p className="feedback success">Correto! Atividade concluída (+20 XP). {q.explanation}</p> : answer !== undefined ? <p className="feedback">Ainda não. Pense em como confirmar a origem sem se expor ao risco e tente novamente.</p> : <p className="help">Escolha uma resposta. Você pode tentar de novo.</p>}</div>
    </fieldset></section>;
  })}</div>;
}
export function LinkChecker() {
  const hydrated = useHydrated();
  const [value, setValue] = useState('');
  const [result, setResult] = useState<LinkAnalysis | null>(null);
  function submit(e: FormEvent) { e.preventDefault(); setResult(analyzeLink(value)); }
  return <section className="panel"><h2>Verificador educativo de links</h2><p>Identifique sinais no endereço sem abrir o site. Esta análise não consulta listas de ameaças e não garante segurança.</p>
    <form onSubmit={submit} className="mt-4"><label htmlFor="suspect-link">Endereço para analisar</label><input id="suspect-link" disabled={!hydrated} type="text" inputMode="url" autoComplete="off" spellCheck={false} maxLength={2048} value={value} onChange={e => { setValue(e.target.value); setResult(null); }} placeholder="https://exemplo.com" aria-describedby="link-help" /><p id="link-help" className="help">O endereço é analisado neste navegador e não é enviado a um servidor.</p><button className="button mt-3" type="submit" disabled={!hydrated}>Analisar endereço</button></form>
    <div aria-live="polite">{result && ('error' in result ? <p className="feedback">{result.error}</p> : <div className="feedback"><p>Domínio real: <strong className="break-all">{result.host}</strong></p>{result.warnings.length ? <ul className="list-disc pl-5 mt-2">{result.warnings.map(w => <li key={w}>{w}</li>)}</ul> : <p>Nenhum dos sinais básicos avaliados foi encontrado. Isso não significa que o site seja confiável.</p>}<p className="mt-2">Confirme o domínio no canal oficial antes de acessar ou informar dados.</p></div>)}</div>
  </section>;
}
const scenarios: { id: Activity; title: string; explanation: string }[] = [
  { id: 'privacidade-cpf', title: 'Compartilhar CPF em grupo de WhatsApp', explanation: 'O dado pode ser copiado e usado em tentativas de fraude. Evite publicar documentos em grupos; confirme a necessidade e use um canal privado oficial.' },
  { id: 'privacidade-local', title: 'Postar foto com localização ativada', explanation: 'A publicação pode revelar sua rotina e onde você está. Revise o público da postagem e prefira compartilhar depois de sair do local.' },
  { id: 'privacidade-senha', title: 'Usar a mesma senha em todos os sites', explanation: 'Se um serviço vazar, outras contas ficam expostas. Use senhas únicas, um gerenciador e autenticação em dois fatores.' },
];
export function PrivacySimulator() {
  const hydrated = useHydrated();
  const [selected, setSelected] = useState<Activity | null>(null);
  const { completed, complete } = useProgress();
  const active = scenarios.find(s => s.id === selected);
  return <section className="panel"><h2>Simulador de privacidade</h2><p className="mb-4">Escolha uma situação e veja como reduzir a exposição.</p><div className="space-y-2">{scenarios.map(s => <button className="option" key={s.id} disabled={!hydrated} aria-pressed={selected === s.id} onClick={() => setSelected(s.id)}>{s.title}{completed.includes(s.id) && ' · concluído'}</button>)}</div>
    <div aria-live="polite">{active && <div className="feedback"><h3 className="font-semibold">{active.title}</h3><p className="my-3">{active.explanation}</p><button className="button" disabled={completed.includes(active.id)} onClick={() => complete(active.id)}>{completed.includes(active.id) ? 'Lição concluída (+10 XP)' : 'Entendi, concluir lição'}</button></div>}</div>
  </section>;
}
export function PromptChallenge() {
  const hydrated = useHydrated();
  const [prompt, setPrompt] = useState('');
  const [message, setMessage] = useState('');
  const { completed, complete } = useProgress();
  const done = completed.includes('ia-prompt');
  function submit(e: FormEvent) { e.preventDefault(); const error = promptFeedback(prompt); if (error) { setMessage(error); return; } complete('ia-prompt'); setMessage('Exercício concluído (+50 XP). Revise se seu prompt descreve personagem, cenário e estilo. Esta atividade não gera uma imagem nem avalia o conteúdo com IA.'); }
  return <section className="panel"><h2>Laboratório de prompts</h2><p>Descreva uma imagem de um jovem do interior usando tecnologia. Inclua personagem, cenário e estilo. A atividade vale 50 XP uma única vez.</p>
    <form onSubmit={submit} className="mt-4"><label htmlFor="image-prompt">Seu prompt</label><textarea id="image-prompt" disabled={!hydrated} minLength={30} maxLength={1000} value={prompt} onChange={e => { setPrompt(e.target.value); setMessage(''); }} placeholder="Um jovem brasileiro do interior usando um laptop…" aria-describedby="prompt-help" /><p id="prompt-help" className="help">De 30 a 1.000 caracteres · {prompt.length}/1.000. Não inclua dados pessoais. O texto não é salvo.</p><button className="button mt-3" disabled={!hydrated || done} type="submit">{done ? 'Atividade concluída' : 'Concluir exercício'}</button></form><p role="status" className={message ? 'feedback' : ''}>{message || (done ? 'Você já recebeu os 50 XP desta atividade.' : '')}</p>
  </section>;
}
