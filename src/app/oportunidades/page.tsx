export default function Oportunidades() {
  const courses = [
    { name: "ConectAI (Microsoft)", desc: "Cursos gratuitos de IA para brasileiros", url: "https://news.microsoft.com/source/latam/features/ai/microsoft-ai-courses-brazil/", icon: "🎓" },
    { name: "Code.org", desc: "Fundamentos de ciência da computação", url: "https://code.org", icon: "💻" },
    { name: "Kaggle Learn", desc: "Cursos gratuitos de IA e dados", url: "https://www.kaggle.com/learn", icon: "📊" },
    { name: "freeCodeCamp", desc: "Programação e desenvolvimento web", url: "https://www.freecodecamp.org", icon: "🌐" },
    { name: "Google AI Essentials", desc: "Fundamentos de IA do Google", url: "https://grow.google/intl/pt/courses-and-tools/", icon: "🔍" },
  ];

  const jobs = [
    { title: "Estágio em IA", company: "Diversas empresas", location: "Remoto" },
    { title: "Trainee de Dados", company: "Startups", location: "Híbrido" },
    { title: "Jovem Aprendiz Tech", company: "Grandes empresas", location: "Presencial" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-400">🚀 Oportunidades em IA</h1>
      <p className="text-slate-300">Explore recursos externos e conheça caminhos para começar sua jornada em IA.</p>

      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h2 className="font-semibold mb-3">📚 Cursos e materiais para explorar</h2>
        <div className="space-y-3">
          {courses.map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-slate-700 rounded-lg p-3 hover:bg-slate-600 transition-colors">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-slate-300 text-sm">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h2 className="font-semibold mb-3">💼 Exemplos de caminhos profissionais</h2>
        <p className="help mb-3">São exemplos educativos, não anúncios de vagas abertas. Consulte os canais oficiais das empresas.</p>
        <div className="space-y-3">
          {jobs.map((j) => (
            <div key={j.title} className="bg-slate-700 rounded-lg p-3">
              <p className="font-medium">{j.title}</p>
              <p className="text-slate-300 text-sm">{j.company} • {j.location}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h2 className="font-semibold mb-3">🏆 Desafios e Hackathons</h2>
        <p className="text-slate-300 text-sm">Participe de desafios de IA e ganhe experiência, certificados e networking. Em breve: desafios exclusivos ShieldUp!</p>
      </div>
    </div>
  );
}
