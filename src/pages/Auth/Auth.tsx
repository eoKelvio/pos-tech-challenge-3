import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, BookOpen } from 'lucide-react';
import { useSignUp, useSignIn } from '../../hooks/useAuth';
import type { SignUpPayload, SignInPayload } from '../../types/Users';
import { Footer } from '../../components/common/Footer';

const Auth = () => {
  const navigate = useNavigate();
  const signUpMutation = useSignUp();
  const signInMutation = useSignIn();

  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const [signUpData, setSignUpData] = useState<SignUpPayload>({
    name: '',
    email: '',
    password: '',
  });

  const [signInData, setSignInData] = useState<SignInPayload>({
    email: '',
    password: '',
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      setError('Preencha todos os campos');
      return;
    }

    if (signUpData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      await signUpMutation.mutateAsync(signUpData);
      alert('Conta criada com sucesso! Faça login.');
      setIsSignUp(false);
      setSignUpData({ name: '', email: '', password: '' });
      setError('');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string[] | string } } };
      const message = Array.isArray(error.response?.data?.message)
        ? error.response.data.message[0]
        : error.response?.data?.message || 'Falha ao criar conta';
      setError(message);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signInData.email || !signInData.password) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      await signInMutation.mutateAsync(signInData);
      setTimeout(() => {
        navigate('/posts');
      }, 100);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <BookOpen className="text-white" size={32} />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Blog Tech
              </h1>
            </div>
            <p className="text-slate-600">
              {isSignUp ? 'Crie sua conta e comece a escrever' : 'Entre para continuar'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => {
                  setIsSignUp(false);
                  setError('');
                }}
                className={`flex-1 py-4 text-center font-semibold transition-all ${
                  !isSignUp
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  setIsSignUp(true);
                  setError('');
                }}
                className={`flex-1 py-4 text-center font-semibold transition-all ${
                  isSignUp
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Cadastrar
              </button>
            </div>

            {/* Form */}
            <div className="p-8">
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-sm mb-6">
                  {error}
                </div>
              )}

              {isSignUp ? (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        value={signUpData.name}
                        onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                        placeholder="João Silva"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        placeholder="joao@exemplo.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        placeholder="Pelo menos 6 caracteres"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={signUpMutation.isPending}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg mt-6"
                  >
                    {signUpMutation.isPending ? 'Criando Conta...' : 'Criar Conta'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        placeholder="joao@exemplo.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        placeholder="Digite sua senha"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={signInMutation.isPending}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg mt-6"
                  >
                    {signInMutation.isPending ? 'Entrando...' : 'Entrar'}
                  </button>
                </form>
              )}

              {/* Public Access */}
              <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-600 mb-3">ou</p>
                <button
                  onClick={() => navigate('/posts')}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors"
                >
                  Ver Posts Públicos →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
