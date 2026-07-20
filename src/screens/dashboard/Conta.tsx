import { useState, type FormEvent } from 'react';
import { User as UserIcon, Mail, Lock, LogOut, CheckCircle2 } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../lib/auth';

export default function Conta() {
  const { user, updateProfile, changePassword, signOut } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [savedProfile, setSavedProfile] = useState(false);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdOk, setPwdOk] = useState(false);

  const saveProfile = (e: FormEvent) => {
    e.preventDefault();
    updateProfile(name);
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 2500);
  };

  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPwdError('');
    setPwdOk(false);
    if (next !== confirm) {
      setPwdError('As senhas não coincidem.');
      return;
    }
    if (next.length < 6) {
      setPwdError('A nova senha deve ter ao menos 6 caracteres.');
      return;
    }
    await changePassword(current, next);
    setPwdOk(true);
    setCurrent('');
    setNext('');
    setConfirm('');
    setTimeout(() => setPwdOk(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile */}
      <section className="meell-card p-6 sm:p-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-lilac-100 grid place-items-center text-rose-500">
            <UserIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-rose-700">Meu perfil</h2>
            <p className="text-xs text-rose-400">Atualize seus dados de acesso.</p>
          </div>
        </div>
        <form onSubmit={saveProfile} className="space-y-5">
          <Input
            name="name"
            label="Nome"
            icon={<UserIcon className="w-4 h-4" />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            icon={<Mail className="w-4 h-4" />}
            value={user?.email ?? ''}
            disabled
            hint="O e-mail não pode ser alterado."
          />
          <div className="flex items-center gap-3">
            <Button type="submit">Salvar alterações</Button>
            {savedProfile && (
              <span className="inline-flex items-center gap-1.5 text-sm text-rose-600 animate-pop-in">
                <CheckCircle2 className="w-4 h-4" /> Perfil atualizado!
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Change password */}
      <section className="meell-card p-6 sm:p-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lilac-100 to-sky-100 grid place-items-center text-lilac-500">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-rose-700">Alterar senha</h2>
            <p className="text-xs text-rose-400">Mantenha sua conta segura.</p>
          </div>
        </div>
        <form onSubmit={savePassword} className="space-y-5">
          <Input
            name="current"
            type="password"
            label="Senha atual"
            icon={<Lock className="w-4 h-4" />}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
          <Input
            name="next"
            type="password"
            label="Nova senha"
            icon={<Lock className="w-4 h-4" />}
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
          />
          <Input
            name="confirm"
            type="password"
            label="Confirmar nova senha"
            icon={<Lock className="w-4 h-4" />}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {pwdError && (
            <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
              {pwdError}
            </p>
          )}
          {pwdOk && (
            <p className="inline-flex items-center gap-1.5 text-sm text-rose-600 animate-pop-in">
              <CheckCircle2 className="w-4 h-4" /> Senha alterada com sucesso!
            </p>
          )}
          <Button type="submit" variant="outline">
            Alterar senha
          </Button>
        </form>
      </section>

      {/* Danger */}
      <section className="meell-card p-6 sm:p-8 animate-fade-up">
        <h2 className="font-display text-lg font-bold text-rose-700 mb-1">Sair da conta</h2>
        <p className="text-sm text-rose-400 mb-4">
          Encerre sua sessão neste dispositivo. Você poderá entrar novamente quando quiser.
        </p>
        <Button variant="outline" onClick={signOut} className="text-rose-600 border-rose-200">
          <LogOut className="w-4 h-4" />
          Sair da conta
        </Button>
      </section>
    </div>
  );
}
