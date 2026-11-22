'use client';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { type Activity, addActivity, parseProgress, progressXP, totalXP } from '@/lib/learning';
const KEY = 'shieldup-progress-v1';
const EVENT = 'shieldup-progress';
let memory = '';
let sessionOnly = false;
function snapshot() { if (sessionOnly) return memory; try { return localStorage.getItem(KEY) ?? ''; } catch { return memory; } }
function subscribe(notify: () => void) {
  window.addEventListener('storage', notify); window.addEventListener(EVENT, notify);
  return () => { window.removeEventListener('storage', notify); window.removeEventListener(EVENT, notify); };
}
export function useProgress() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '');
  const completed = useMemo(() => parseProgress(raw), [raw]);
  function write(value: string) {
    memory = value;
    try { localStorage.setItem(KEY, value); } catch { sessionOnly = true; }
    window.dispatchEvent(new Event(EVENT));
  }
  return {
    completed, xp: progressXP(completed),
    complete: (id: Activity) => write(JSON.stringify(addActivity(parseProgress(snapshot()), id))),
    reset: () => write('[]'),
  };
}
export function ProgressSummary() {
  const { xp, completed, reset } = useProgress();
  const [confirm, setConfirm] = useState(false);
  const badges = [
    { title: 'Olho de Lince', earned: ['golpe-link', 'golpe-video', 'golpe-dados'].every(id => completed.includes(id as Activity)) },
    { title: 'Guardião da Privacidade', earned: ['privacidade-cpf', 'privacidade-local', 'privacidade-senha'].every(id => completed.includes(id as Activity)) },
    { title: 'Explorador de IA', earned: completed.includes('ia-prompt') },
  ];
  return <section className="panel" aria-labelledby="progress-heading">
    <h2 id="progress-heading">Seu progresso</h2>
    <p className="text-2xl font-bold text-yellow-300" aria-live="polite">{xp} XP</p>
    <p>{completed.length} de 7 atividades concluídas · {xp >= 100 ? 'Explorador' : 'Iniciante'}</p>
    <progress className="w-full mt-3" value={xp} max={totalXP} aria-label="Progresso das atividades" />
    <p className="help">O progresso fica neste navegador. Em modo privado ou com armazenamento bloqueado, pode durar apenas esta sessão.</p>
    <ul className="flex flex-wrap gap-2 my-4" aria-label="Conquistas">{badges.map(b => <li key={b.title} className={`badge ${b.earned ? 'earned' : ''}`}>{b.title} · {b.earned ? 'conquistado' : 'a conquistar'}</li>)}</ul>
    {confirm ? <div className="flex gap-3 flex-wrap items-center"><p>Apagar todo o progresso deste navegador?</p><button className="button" onClick={() => { reset(); setConfirm(false); }}>Confirmar exclusão</button><button className="button secondary" onClick={() => setConfirm(false)}>Cancelar</button></div> : <button className="button secondary" disabled={xp === 0} onClick={() => setConfirm(true)}>Reiniciar progresso</button>}
  </section>;
}
