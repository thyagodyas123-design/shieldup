export const metadata = { title: 'Mentoria segura' };
export default function Mentoria() {
  return <div className="space-y-6">
    <h1 className="text-2xl font-bold text-blue-300">Mentoria segura</h1>
    <p>Prepare seus objetivos e saiba o que observar antes de participar de uma mentoria.</p>
    <section className="panel"><h2>O serviço de mentoria ainda está em preparação</h2><p>Esta versão não oferece agendamentos, cadastro de mentores ou chat. Não há profissionais verificados disponíveis na plataforma.</p></section>
    <section className="panel"><h2>Prepare seu primeiro encontro</h2><p className="mb-4">Explore um tema e use o roteiro para organizar suas perguntas.</p>
      {[
        ['Inteligência artificial', 'Quero entender como a IA funciona e escolher um primeiro projeto.', 'Pergunte quais fundamentos estudar, que ferramentas experimentar e como avaliar os resultados.'],
        ['Segurança digital', 'Quero melhorar a proteção das minhas contas e reconhecer golpes.', 'Pergunte como organizar senhas, configurar autenticação em dois fatores e confirmar contatos suspeitos.'],
        ['Desenvolvimento web', 'Quero construir e publicar meu primeiro site.', 'Pergunte por onde começar, como dividir o projeto em etapas e como testar acessibilidade e navegação.'],
      ].map(([title, goal, questions]) => <details key={title} className="border-t border-slate-600 py-4"><summary className="font-semibold cursor-pointer py-2">{title}</summary><p className="mt-3"><strong>Objetivo:</strong> {goal}</p><p className="mt-2">{questions}</p><p className="help">Leve um exemplo do que já tentou e defina um pequeno próximo passo com a pessoa mentora.</p></details>)}
    </section>
    <section className="panel"><h2>Antes de conversar com alguém</h2><ul className="list-disc pl-5 space-y-2"><li>Confira a identidade e a experiência da pessoa nos canais oficiais.</li><li>Não compartilhe senhas, documentos ou dados bancários.</li><li>Se você for menor de idade, envolva um responsável na escolha e no acompanhamento.</li><li>Combine objetivos, duração e limites do encontro antes de começar.</li><li>Encerre a conversa se houver pedidos inadequados e procure alguém de confiança.</li></ul></section>
  </div>;
}
