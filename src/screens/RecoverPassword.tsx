import { useState, type FormEvent } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../lib/auth';

interface Props {
  onNavigate: (screen: 'signin' | 'signup') => void;
}

export default function RecoverPassword({ onNavigate }: Props) {
  const { recoverPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await recoverPassword(email);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Recuperar senha"
      subtitle="Informe seu e-mail e enviaremos instruções para redefinir sua senha."
      footer={
        <>
          Lembrou a senha?{' '}
          <button
            onClick={() => onNavigate('signin')}
            className="font-semibold text-rose-600 hover:text-rose-700 underline-offset-2 hover:underline"
          >
            Voltar para entrar
          </button>
        </>
      }
    >
      {sent ? (
        <div className="text-center py-6 animate-pop-in">
          <div className="mx-auto w-14 h-14 rounded-full bg-rose-100 grid place-items-center mb-4">
            <CheckCircle2 className="w-7 h-7 text-rose-500" />
          </div>
          <h3 className="font-display text-lg font-semibold text-rose-700">Verifique seu e-mail</h3>
          <p className="mt-2 text-sm text-rose-400">
            Se uma conta existir para <span className="font-medium text-rose-600">{email}</span>,
            você receberá um link para redefinir sua senha.
          </p>
        </div>
      ) : (
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
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar instruções'}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
