import { useState, type FormEvent } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../lib/auth';

interface Props {
  onNavigate: (screen: 'signup' | 'recover') => void;
}

export default function SignIn({ onNavigate }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Entrar"
      subtitle="Bem-vinda de volta! Acesse sua conta para continuar criando."
      footer={
        <>
          Ainda não tem conta?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="font-semibold text-rose-600 hover:text-rose-700 underline-offset-2 hover:underline"
          >
            Criar conta
          </button>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <Input
          name="email"
          type="email"
          label="E-mail"
          placeholder="seu@email.com"
          required
          icon={<Mail className="w-4 h-4" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="space-y-1.5">
          <Input
            name="password"
            type={show ? 'text' : 'password'}
            label="Senha"
            placeholder="••••••••"
            required
            icon={<Lock className="w-4 h-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-600"
            >
              {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {show ? 'Ocultar senha' : 'Mostrar senha'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('recover')}
              className="text-xs font-medium text-rose-500 hover:text-rose-700"
            >
              Esqueci minha senha
            </button>
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </AuthLayout>
  );
}
