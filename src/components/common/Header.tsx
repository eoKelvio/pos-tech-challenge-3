import { useNavigate } from 'react-router-dom';
import { Plus, Search, LogOut, BookOpen } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  currentUserName?: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onCreatePost?: () => void;
  onLogout?: () => void;
  showSearch?: boolean;
}

export const Header = ({
  isAuthenticated,
  currentUserName,
  searchTerm = '',
  onSearchChange,
  onCreatePost,
  onLogout,
  showSearch = true,
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg shadow-md">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Blog Tech
              </h1>
              <p className="text-sm text-slate-600">
                {isAuthenticated
                  ? `Bem-vindo, ${currentUserName || 'Usuário'}`
                  : 'Explore nossos artigos'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onCreatePost}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Novo Post</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <LogOut size={18} className="rotate-180" />
                Fazer Login
              </button>
            )}
          </div>
        </div>

        {showSearch && (
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        )}
      </div>
    </header>
  );
};
