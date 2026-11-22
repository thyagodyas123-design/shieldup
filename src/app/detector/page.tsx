import { Quiz, LinkChecker } from '@/components/exercises';
export const metadata = { title: 'Detector de golpes' };
export default function Detector() { return <div className="space-y-6"><h1 className="text-2xl font-bold text-blue-300">Detector de golpes</h1><p>Treine seu olhar para golpes, phishing e vídeos manipulados. Cada desafio concluído vale 20 XP.</p><Quiz /><LinkChecker /></div>; }
