import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeLink, addActivity, parseProgress, progressXP, promptFeedback } from '../src/lib/learning.ts';
test('dados inválidos e IDs desconhecidos não concedem XP', () => {
  for (const value of ['', 'null', '{}', '{bad', '["__proto__", "inventado", 50]']) assert.deepEqual(parseProgress(value), []);
});
test('progresso deduplica conquistas e não permite cultivar XP', () => {
  const progress = parseProgress('["golpe-link", "golpe-link", "ia-prompt"]');
  assert.equal(progressXP(progress), 70);
  assert.deepEqual(addActivity(progress, 'golpe-link'), progress);
  assert.equal(progressXP(addActivity(progress, 'privacidade-cpf')), 80);
});
test('limites do exercício de prompt', () => {
  assert.ok(promptFeedback('a'.repeat(29))); assert.equal(promptFeedback('a'.repeat(30)), null);
  assert.equal(promptFeedback('a'.repeat(1000)), null); assert.ok(promptFeedback('a'.repeat(1001))); assert.ok(promptFeedback(' '.repeat(50)));
});
test('recusa protocolos executáveis, URLs incompletas e endereços malformados', () => {
  for (const url of ['', 'google.com', 'javascript:alert(1)', 'file:///etc/passwd', 'data:text/html,hi', 'https://', 'https://host sem espaço.com', 'https://localhost', 'x'.repeat(2049)]) assert.ok('error' in analyzeLink(url), url);
});
test('mostra o domínio verdadeiro em URL que disfarça destino com credenciais', () => {
  const result = analyzeLink('https://banco.com@fraude.example/login');
  assert.equal(result.host, 'fraude.example'); assert.ok(result.warnings.some(w => w.includes('credenciais')));
});
test('detecta HTTP, IP, encurtadores, porta e domínio internacional', () => {
  for (const url of ['http://example.com', 'https://127.0.0.1', 'https://bit.ly/test', 'https://example.com:8443', 'https://xn--pple-43d.com']) assert.ok(analyzeLink(url).warnings.length, url);
});
test('HTTPS sem sinais básicos não é declarado seguro', () => {
  assert.deepEqual(analyzeLink(' https://example.com/caminho '), { host: 'example.com', warnings: [] });
});
