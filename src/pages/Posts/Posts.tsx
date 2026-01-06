import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { usePosts } from '../../hooks/usePosts';
import { useAuth } from '../../hooks/useAuth';
import type { Post } from '../../types/Posts';
import { CreatePostModal } from '../../components/modals/create/CreatePostModal';
import { UpdatePostModal } from '../../components/modals/update/UpdatePostModal';
import { ViewPostModal } from '../../components/modals/view/ViewPostModal';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';

export const Posts = () => {
  const navigate = useNavigate();
  const { fetchAllPosts, fetchActivePosts, deletePost } = usePosts();
  const { fetchMe } = useAuth();

  const token = localStorage.getItem('access_token');
  const isAuthenticated = !!token;

  const allPostsQuery = fetchAllPosts();
  const activePostsQuery = fetchActivePosts();
  const meQuery = fetchMe();

  const { data: allPosts } = allPostsQuery;
  const { data: activePosts } = activePostsQuery;
  const { data: currentUser } = meQuery;

  const posts = isAuthenticated ? allPosts : activePosts;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este post? Apenas posts inativos podem ser deletados.')) {
      try {
        await deletePost(id);
      } catch (error) {
        console.error('Erro ao deletar post:', error);
        alert('Falha ao deletar post. Certifique-se de que o post está inativo.');
      }
    }
  };

  const handleView = (post: Post) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  const handleUpdate = (post: Post) => {
    setSelectedPost(post);
    setIsUpdateModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/auth');
  };

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Header
        isAuthenticated={isAuthenticated}
        currentUserName={currentUser?.name}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreatePost={() => setIsCreateModalOpen(true)}
        onLogout={handleLogout}
        showSearch={true}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h2>
                      <div className="flex gap-2 items-center flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.type === 'PUBLIC'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {post.type === 'PUBLIC' ? 'PÚBLICO' : 'PRIVADO'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          {post.status === 'ACTIVE' ? 'ATIVO' : 'INATIVO'}
                        </span>
                        <span className="text-sm text-slate-500">
                          {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    {isAuthenticated && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleView(post)}
                          className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Visualizar"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleUpdate(post)}
                          className="p-2.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Deletar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap line-clamp-3">
                    {post.content}
                  </p>

                  {post.content.length > 200 && (
                    <button
                      onClick={() => handleView(post)}
                      className="mt-3 text-indigo-600 hover:text-indigo-700 text-sm font-semibold inline-flex items-center gap-1"
                    >
                      Ler mais →
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <p className="text-slate-500 text-lg mb-2">
              {searchTerm ? 'Nenhum post encontrado com sua busca.' : 'Nenhum post disponível ainda.'}
            </p>
            {isAuthenticated && !searchTerm && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md font-medium"
              >
                Crie Seu Primeiro Post
              </button>
            )}
          </div>
        )}
      </main>

      <Footer />

      {isAuthenticated && (
        <>
          <CreatePostModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            authorId={currentUser?.id || 1}
          />

          <UpdatePostModal
            isOpen={isUpdateModalOpen}
            onClose={() => {
              setIsUpdateModalOpen(false);
              setSelectedPost(null);
            }}
            post={selectedPost}
          />
        </>
      )}

      <ViewPostModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
      />
    </div>
  );
};

export default Posts;
