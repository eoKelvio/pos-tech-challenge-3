import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreatePost } from '../../../hooks/usePosts';
import type { CreatePostPayload, PostType, PostStatus } from '../../../types/Posts';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorId: number;
}

export const CreatePostModal = ({ isOpen, onClose, authorId }: CreatePostModalProps) => {
  const createMutation = useCreatePost();

  const [formData, setFormData] = useState<CreatePostPayload>({
    title: '',
    content: '',
    authorId: authorId,
    type: 'PUBLIC',
    status: 'ACTIVE',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMutation.mutateAsync(formData);
      handleClose();
    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      authorId: authorId,
      type: 'PUBLIC',
      status: 'ACTIVE',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Criar Novo Post</h2>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="Digite o título do post..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Conteúdo
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
              placeholder="Escreva o conteúdo do seu post..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Visibilidade
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as PostType })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              >
                <option value="PUBLIC">Público</option>
                <option value="PRIVATE">Privado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as PostStatus })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              >
                <option value="ACTIVE">Ativo</option>
                <option value="INACTIVE">Inativo</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-600 text-white rounded-lg hover:from-red-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all shadow-md"
            >
              {createMutation.isPending ? 'Criando...' : 'Criar Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
