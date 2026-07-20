import type { ReactNode } from 'react';
import Logo from '../Logo';
import mascoteOficial from '../MascotePlaceholder/c2a39992-faa7-4e28-b622-74498a6c4d80.png';

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-rose-100 via-lilac-100 to-sky-100">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-lilac-200/40 blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <Logo size="lg" />
          <div className="flex flex-col items-center gap-8">
            <img
              src={mascoteOficial}
              alt="Mascote oficial da Meell"
              className="w-auto h-64 xl:h-80 object-contain drop-shadow-sm"
              draggable={false}
            />
            <div className="text-center max-w-sm">
              <h2 className="font-display text-2xl font-bold text-rose-700">
                Sua assistente criativa
              </h2>
              <p className="mt-2 text-sm text-rose-500 leading-relaxed">
                Papelaria digital, personalizados, agendas, planners e criação de imagens com
                inteligência artificial.
              </p>
            </div>
          </div>
          <p className="text-xs text-rose-400">© {new Date().getFullYear()} Meell IA ✨</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-up">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo size="md" />
          </div>
          <div className="meell-card p-8 sm:p-10">
            <h1 className="font-display text-2xl font-bold text-rose-700">{title}</h1>
            <p className="mt-1.5 text-sm text-rose-400">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
          {footer && <div className="mt-6 text-center text-sm text-rose-500">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
