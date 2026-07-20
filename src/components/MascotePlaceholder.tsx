import { Sparkles } from 'lucide-react';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  className?: string;
}

const sizes = {
  sm: 'w-12 h-12 text-base',
  md: 'w-20 h-20 text-lg',
  lg: 'w-32 h-32 text-xl',
  xl: 'w-44 h-44 text-2xl',
};

// Placeholder reservado para a mascote oficial da Meell.
// A imagem oficial será adicionada posteriormente — não gerar outra.
export default function MascotePlaceholder({ size = 'md', label, className = '' }: Props) {
  return (
    <div
      className={`relative ${sizes[size]} rounded-full bg-gradient-to-br from-rose-100 via-lilac-100 to-sky-100 border border-white shadow-soft flex items-center justify-center overflow-hidden ${className}`}
      aria-label="Espaço reservado para a mascote oficial da Meell"
    >
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
      <div className="relative flex flex-col items-center justify-center text-rose-400">
        <Sparkles className="animate-pulse-soft" />
      </div>
      {label && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-rose-400/80">
          {label}
        </span>
      )}
    </div>
  );
}
