import { Sparkles } from 'lucide-react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const text = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
};

export default function Logo({ size = 'md', withText = true }: Props) {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="grid place-items-center w-9 h-9 rounded-2xl bg-gradient-to-br from-rose-300 to-lilac-300 shadow-soft">
        <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
      {withText && (
        <span className={`font-display font-bold tracking-tight text-rose-700 ${text[size]}`}>
          Meell IA <span className="text-rose-400">✨</span>
        </span>
      )}
    </div>
  );
}
