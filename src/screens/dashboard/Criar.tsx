import { useState, type ChangeEvent } from 'react';
import { Upload, X, Sparkles, Lock, Palette, Pencil, Image as ImageIcon } from 'lucide-react';
import type { CreationType, ReferenceMode } from '../../types';

const creationTypes: { id: CreationType; label: string; emoji: string; desc: string }[] = [
  { id: 'ilustracao', label: 'Ilustração', emoji: '🎀', desc: 'Artes e ilustrações' },
  { id: 'mascote', label: 'Mascote', emoji: '🧸', desc: 'Personagem recorrente' },
  { id: 'elemento', label: 'Elemento PNG', emoji: '✂️', desc: 'Recorte sem fundo' },
  { id: 'papelaria', label: 'Papelaria', emoji: '📔', desc: 'Planners, agendas' },
  { id: 'cena', label: 'Cena completa', emoji: '🖼️', desc: 'Composição completa' },
];

const referenceModes: {
  id: ReferenceMode;
  emoji: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'preservar',
    emoji: '🔒',
    title: 'Preservar personagem',
    desc: 'Mantém a identidade, rosto, traços e aparência da personagem ou mascote.',
    icon: <Lock className="w-4 h-4" />,
  },
  {
    id: 'estilo',
    emoji: '🎨',
    title: 'Usar estilo como referência',
    desc: 'Usa cores, acabamento e linguagem visual como inspiração sem copiar a personagem.',
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: 'editar',
    emoji: '✏️',
    title: 'Editar esta imagem',
    desc: 'Usa a própria imagem enviada como base e altera somente o que for solicitado.',
    icon: <Pencil className="w-4 h-4" />,
  },
];

export default function Criar() {
  const [type, setType] = useState<CreationType>('ilustracao');
  const [prompt, setPrompt] = useState('');
  const [refImage, setRefImage] = useState<string | null>(null);
  const [refName, setRefName] = useState<string>('');
  const [mode, setMode] = useState<ReferenceMode>('preservar');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setRefName(f.name);
    const reader = new FileReader();
    reader.onload = () => setRefImage(reader.result as string);
    reader.readAsDataURL(f);
  };

  const removeRef = () => {
    setRefImage(null);
    setRefName('');
  };

  const generate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setGenerated(false);
    // Visual placeholder only — no generation API connected yet.
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Creation type */}
      <section className="meell-card p-6 animate-fade-up">
        <h2 className="font-display text-lg font-bold text-rose-700 mb-1">Tipo de criação</h2>
        <p className="text-sm text-rose-400 mb-4">Escolha o que você quer criar agora.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {creationTypes.map((c) => {
            const active = type === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setType(c.id)}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border text-center transition ${
                  active
                    ? 'border-rose-300 bg-gradient-to-br from-rose-50 to-lilac-50 shadow-soft'
                    : 'border-rose-100 bg-white hover:border-rose-200 hover:bg-rose-50/50'
                }`}
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className={`text-sm font-semibold ${active ? 'text-rose-700' : 'text-rose-600'}`}>
                  {c.label}
                </span>
                <span className="text-[11px] text-rose-400 leading-tight">{c.desc}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Reference image */}
      <section className="meell-card p-6 animate-fade-up">
        <div className="flex items-center justify-between gap-4 mb-1">
          <h2 className="font-display text-lg font-bold text-rose-700">Imagem de referência</h2>
          <span className="meell-chip border-rose-100 text-rose-400 bg-rose-50">opcional</span>
        </div>
        <p className="text-sm text-rose-400 mb-4">
          Envie uma imagem para a Meell usar como base, estilo ou referência.
        </p>

        {refImage ? (
          <div className="flex items-center gap-4 p-3 rounded-2xl border border-rose-100 bg-rose-50/50">
            <img
              src={refImage}
              alt="Referência"
              className="w-20 h-20 object-cover rounded-xl border border-white shadow-soft"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-rose-700 truncate">{refName}</p>
              <p className="text-xs text-rose-400">Imagem carregada com sucesso</p>
            </div>
            <button
              onClick={removeRef}
              className="p-2 rounded-xl text-rose-400 hover:bg-rose-100 hover:text-rose-600"
              aria-label="Remover imagem"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="block cursor-pointer">
            <div className="flex flex-col items-center justify-center gap-2 py-8 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/40 hover:bg-rose-50 hover:border-rose-300 transition">
              <div className="w-12 h-12 rounded-full bg-rose-100 grid place-items-center text-rose-400">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-rose-600">Clique para enviar uma imagem</p>
              <p className="text-xs text-rose-400">PNG, JPG ou WEBP</p>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          </label>
        )}

        {/* Reference modes — only when a reference exists */}
        {refImage && (
          <div className="mt-6 space-y-3 animate-fade-up">
            <p className="text-sm font-semibold text-rose-700">Como usar a referência?</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {referenceModes.map((m) => {
                const active = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`text-left p-4 rounded-2xl border transition ${
                      active
                        ? 'border-rose-300 bg-gradient-to-br from-rose-50 to-lilac-50 shadow-soft'
                        : 'border-rose-100 bg-white hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">{m.emoji}</span>
                      <span className={`text-sm font-semibold ${active ? 'text-rose-700' : 'text-rose-600'}`}>
                        {m.title}
                      </span>
                    </div>
                    <p className="text-xs text-rose-400 leading-relaxed">{m.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Prompt */}
      <section className="meell-card p-6 animate-fade-up">
        <h2 className="font-display text-lg font-bold text-rose-700 mb-1">Descreva sua criação</h2>
        <p className="text-sm text-rose-400 mb-4">
          Quanto mais detalhes, mais a Meell entende o que você imagina.
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
          placeholder="Ex: Uma mascote coelha de papelaria, estilo aquarela, tons pastel de rosa e lilás, segurando um planner..."
          className="meell-input resize-none scroll-soft"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={generate}
            disabled={!prompt.trim() || generating}
            className="meell-btn-primary"
          >
          <Sparkles className="w-4 h-4" />
            {generating ? 'Gerando...' : '✨ Gerar minha criação'}
          </button>
        </div>
      </section>

      {/* Result */}
      <section className="meell-card p-6 animate-fade-up">
        <h2 className="font-display text-lg font-bold text-rose-700 mb-1">🎨 Sua criação</h2>
        <p className="text-sm text-rose-400 mb-4">
          O resultado da sua criação aparecerá aqui em breve.
        </p>
        <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/40 min-h-[280px] flex items-center justify-center">
          {generating ? (
            <div className="flex flex-col items-center gap-3 text-rose-400">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300 animate-pulse-soft" />
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300 animate-pulse-soft [animation-delay:0.2s]" />
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300 animate-pulse-soft [animation-delay:0.4s]" />
              </div>
              <p className="text-sm font-medium">Meell está criando sua imagem...</p>
            </div>
          ) : generated ? (
            <div className="flex flex-col items-center gap-3 text-center px-6 py-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-lilac-100 grid place-items-center">
                <ImageIcon className="w-7 h-7 text-rose-400" />
              </div>
              <p className="text-sm font-medium text-rose-600">
                Criação pronta! (placeholder visual)
              </p>
              <p className="text-xs text-rose-400 max-w-sm">
                A geração real de imagens com IA será ativada em breve. Aqui será exibida a imagem
                gerada a partir do seu prompt.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-rose-300 px-6 py-10 text-center">
              <ImageIcon className="w-10 h-10" />
              <p className="text-sm">Sua criação aparecerá aqui</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
