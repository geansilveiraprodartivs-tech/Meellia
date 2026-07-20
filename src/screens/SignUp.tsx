import { useState, type FormEvent } from 'react';
import { User as UserIcon, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../lib/auth';

interface Props {
  onNavigate: (screen: 'signin' | 'recover') => void;
}

export default function SignUp({ onNavigate }: Props) {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter ao menos 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      await signUp(name, email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Crie sua conta e comece a criar com a Meell."
      footer={
        <>
          Já tem conta?{' '}
          <button
            onClick={() => onNavigate('signin')}
            className="font-semibold text-rose-600 hover:text-rose-700 underline-offset-2 hover:underline"
          >
            Entrar
          </button>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <Input
          name="name"
          label="Nome"
          placeholder="Seu nome"
          required
          icon={<UserIcon className="w-4 h-4" />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        </div>
        <div className="space-y-1.5">
          <Input
            name="confirm"
            type={show ? 'text' : 'password'}
            label="Confirmar senha"
            placeholder="••••••••"
            required
            icon={<Lock className="w-4 h-4" />}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-600"
          >
            {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {show ? 'Ocultar senhas' : 'Mostrar senhas'}
          </button>
        </div>
        {error && (
          <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </form>
    </AuthLayout>
  );
}
