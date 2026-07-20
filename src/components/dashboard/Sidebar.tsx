import { Home, MessageCircle, Palette, Image, Settings, LogOut, X } from 'lucide-react';
import Logo from '../Logo';
import { useAuth } from '../../lib/auth';
import type { View } from '../../types';

interface Props {
  current: View;
  onNavigate: (v: View) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const items: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'inicio', label: 'Início', icon: <Home className="w-5 h-5" /> },
  { id: 'conversar', label: 'Conversar com a Meell', icon: <MessageCircle className="w-5 h-5" /> },
  { id: 'criar', label: 'Criar imagens', icon: <Palette className="w-5 h-5" /> },
  { id: 'criacoes', label: 'Minhas criações', icon: <Image className="w-5 h-5" /> },
  { id: 'conta', label: 'Minha conta', icon: <Settings className="w-5 h-5" /> },
];

export default function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: Props) {
  const { user, signOut } = useAuth();

  return (
    <>
      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-rose-900/20 backdrop-blur-sm lg:hidden transition-opacity ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onCloseMobile}
      />

      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 border-r border-white/70 bg-white/80 backdrop-blur-md flex flex-col transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Logo size="md" />
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 rounded-xl text-rose-400 hover:bg-rose-50"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto scroll-soft">
          {items.map((item) => {
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-medium transition group ${
                  active
                    ? 'bg-gradient-to-r from-rose-100 to-lilac-100 text-rose-700 shadow-soft'
                    : 'text-rose-500 hover:bg-rose-50 hover:text-rose-700'
                }`}
              >
                <span className={active ? 'text-rose-500' : 'text-rose-300 group-hover:text-rose-400'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-rose-50">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-lilac-200 grid place-items-center text-rose-600 font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'M'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-rose-700 truncate">{user?.name}</p>
              <p className="text-xs text-rose-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="mt-2 w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-medium text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition"
          >
            <LogOut className="w-5 h-5 text-rose-300" />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
