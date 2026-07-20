import { Menu } from 'lucide-react';

interface Props {
  title: string;
  onOpenMobile: () => void;
}

export default function Topbar({ title, onOpenMobile }: Props) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/60 border-b border-white/70">
      <div className="flex items-center gap-3 px-4 sm:px-8 h-16">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-rose-500 hover:bg-rose-50"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-display text-lg font-semibold text-rose-700">{title}</h1>
      </div>
    </header>
  );
}
