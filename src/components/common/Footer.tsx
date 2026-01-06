import { Heart, Code2 } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Code2 size={18} className="text-indigo-600" />
            <span className="text-sm">
              Feito com{' '}
              <Heart size={14} className="inline text-red-500 fill-current" />{' '}
              usando React & TypeScript
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-600">
            <span>© {currentYear} Blog Tech</span>
            <a
              href="#"
              className="hover:text-indigo-600 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Sobre
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Privacidade
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
