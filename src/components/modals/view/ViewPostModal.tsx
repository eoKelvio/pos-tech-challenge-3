import { X } from 'lucide-react';
import type { Post } from '../../../types/Posts';

interface ViewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

export const ViewPostModal = ({ isOpen, onClose, post }: ViewPostModalProps) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h2>
            <div className="flex gap-2 items-center flex-wrap mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                post.type === 'PUBLIC'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {post.type === 'PUBLIC' ? 'PÚBLICO' : 'PRIVADO'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                post.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {post.status === 'ACTIVE' ? 'ATIVO' : 'INATIVO'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors ml-4">
            <X size={24} />
          </button>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">ID do Autor</p>
            <p className="text-gray-900 font-medium">{post.authorId}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">ID do Post</p>
            <p className="text-gray-900 font-medium">#{post.id}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Criado Em</p>
            <p className="text-gray-900 font-medium">
              {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Última Atualização</p>
            <p className="text-gray-900 font-medium">
              {new Date(post.updatedAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
