import { MessageCircle, Palette, ArrowRight } from 'lucide-react';
import mascoteOficial from '../../components/MascotePlaceholder/c2a39992-faa7-4e28-b622-74498a6c4d80.png';
import type { View } from '../../types';

interface Props {
  onNavigate: (v: View) => void;
  userName: string;
}

export default function Inicio({ onNavigate, userName }: Props) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Greeting + mascote */}
      <section className="meell-card overflow-hidden animate-fade-up">
        <div className="relative p-8 sm:p-12 bg-gradient-to-br from-rose-50 via-white to-lilac-50">
          <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-rose-100/50 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-center gap-8">
            <img
              src={mascoteOficial}
              alt="Mascote oficial da Meell"
              className="w-40 sm:w-52 h-auto max-h-[260px] object-contain drop-shadow-sm animate-float-slow shrink-0"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-rose-400">Olá, {userName}!</p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-rose-700">
                O que vamos criar hoje? 💗
              </h2>
              <p className="mt-3 max-w-lg text-rose-500 leading-relaxed">
                Escolha por onde começar: converse com a Meell para planejar suas ideias ou crie
                imagens incríveis com inteligência artificial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two main cards */}
      <section className="grid md:grid-cols-2 gap-6">
        <article className="meell-card p-8 group hover:-translate-y-1 transition animate-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 grid place-items-center mb-5">
            <MessageCircle className="w-7 h-7 text-rose-500" />
          </div>
          <h3 className="font-display text-xl font-bold text-rose-700">Conversar com a Meell</h3>
          <p className="mt-2.5 text-sm text-rose-500 leading-relaxed">
            Converse com sua assistente criativa para desenvolver ideias, criar prompts, planejar
            produtos e transformar inspiração em projetos.
          </p>
          <button
            onClick={() => onNavigate('conversar')}
            className="mt-6 meell-btn-primary group-hover:shadow-glow"
          >
            Começar a conversar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
        </article>

        <article className="meill-card p-8 group hover:-translate-y-1 transition animate-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lilac-100 to-lilac-200 grid place-items-center mb-5">
            <Palette className="w-7 h-7 text-lilac-500" />
          </div>
          <h3 className="font-display text-xl font-bold text-rose-700">Criar com IA</h3>
          <p className="mt-2.5 text-sm text-rose-500 leading-relaxed">
            Transforme suas ideias e referências em imagens criativas com inteligência artificial.
          </p>
          <button
            onClick={() => onNavigate('criar')}
            className="mt-6 meell-btn-primary group-hover:shadow-glow"
          >
            Criar uma imagem
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
        </article>
      </section>

      {/* Quick tips */}
      <section className="grid sm:grid-cols-3 gap-4">
        {[
          { t: 'Prompts criativos', d: 'Peça ajuda para descrever suas ideias.' },
          { t: 'Papelaria digital', d: 'Planners, agendas e personalizados.' },
          { t: 'Mascotes e PNGs', d: 'Crie personagens com identidade própria.' },
        ].map((tip) => (
          <div key={tip.t} className="meell-card p-5 animate-fade-up">
            <h4 className="font-semibold text-rose-700 text-sm">{tip.t}</h4>
            <p className="mt-1 text-xs text-rose-400 leading-relaxed">{tip.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
