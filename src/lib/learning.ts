export const activities = {
  'golpe-link': 20, 'golpe-video': 20, 'golpe-dados': 20,
  'privacidade-cpf': 10, 'privacidade-local': 10, 'privacidade-senha': 10,
  'ia-prompt': 50,
} as const;
export type Activity = keyof typeof activities;
export const totalXP = Object.values(activities).reduce((sum, xp) => sum + xp, 0);
export function parseProgress(raw: string): Activity[] {
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return [...new Set(data.filter((id): id is Activity => typeof id === 'string' && Object.hasOwn(activities, id)))];
  } catch { return []; }
}
export function addActivity(completed: Activity[], id: Activity): Activity[] {
  return completed.includes(id) ? completed : [...completed, id];
}
export function progressXP(completed: Activity[]): number {
  return [...new Set(completed)].reduce((sum, id) => sum + activities[id], 0);
}
export function promptFeedback(prompt: string): string | null {
  if (prompt.trim().length < 30) return 'Escreva pelo menos 30 caracteres e inclua o personagem, o cenário e o estilo da imagem.';
  if (prompt.trim().length > 1000) return 'Use até 1.000 caracteres para este exercício.';
  return null;
}
export type LinkAnalysis = { error: string } | { host: string; warnings: string[] };
export function analyzeLink(input: string): LinkAnalysis {
  const value = input.trim();
  if (!value || value.length > 2048 || /\s/.test(value)) return { error: 'Cole um endereço completo de até 2.048 caracteres, sem espaços.' };
  let url: URL;
  try { url = new URL(value); } catch { return { error: 'Informe um endereço completo começando com https:// ou http://.' }; }
  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) return { error: 'Use um endereço público começando com https:// ou http://.' };
  const warnings: string[] = [];
  if (url.protocol !== 'https:') warnings.push('A conexão não usa HTTPS. Evite enviar informações pessoais.');
  if (url.username || url.password) warnings.push('Há credenciais antes do domínio. Isso pode disfarçar o destino real.');
  if (/^\d+\.\d+\.\d+\.\d+$/.test(url.hostname) || url.hostname.startsWith('[')) warnings.push('O destino usa um endereço IP em vez de um nome de domínio.');
  if (url.hostname.split('.').some(part => part.startsWith('xn--'))) warnings.push('O domínio contém caracteres internacionais. Compare com o endereço oficial.');
  if (['bit.ly', 'tinyurl.com', 't.co', 'cutt.ly', 'is.gd'].includes(url.hostname)) warnings.push('Este é um encurtador: o destino final não aparece no endereço.');
  if (url.port && !['80', '443'].includes(url.port)) warnings.push('O endereço usa uma porta incomum. Confirme com a fonte oficial.');
  return { host: url.hostname, warnings };
}
