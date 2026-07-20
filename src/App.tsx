import { useState } from 'react';
import { AuthProvider, useAuth } from './lib/auth';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import RecoverPassword from './screens/RecoverPassword';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Inicio from './screens/dashboard/Inicio';
import Conversar from './screens/dashboard/Conversar';
import Criar from './screens/dashboard/Criar';
import Criacoes from './screens/dashboard/Criacoes';
import Conta from './screens/dashboard/Conta';
import type { View } from './types';

type AuthScreen = 'signin' | 'signup' | 'recover';

const titles: Record<View, string> = {
  inicio: 'Início',
  conversar: 'Conversar com a Meell',
  criar: 'Criar imagens',
  criacoes: 'Minhas criações',
  conta: 'Minha conta',
};

function Shell() {
  const { user } = useAuth();
  const [authScreen, setAuthScreen] = useState<AuthScreen>('signin');
  const [view, setView] = useState<View>('inicio');

  if (!user) {
    if (authScreen === 'signup') return <SignUp onNavigate={setAuthScreen} />;
    if (authScreen === 'recover') return <RecoverPassword onNavigate={setAuthScreen} />;
    return <SignIn onNavigate={setAuthScreen} />;
  }

  return (
    <DashboardLayout current={view} onNavigate={setView} title={titles[view]}>
      {view === 'inicio' && <Inicio onNavigate={setView} userName={user.name} />}
      {view === 'conversar' && <Conversar />}
      {view === 'criar' && <Criar />}
      {view === 'criacoes' && <Criacoes onNavigate={setView} />}
      {view === 'conta' && <Conta />}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
