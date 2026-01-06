export type PostType = 'PUBLIC' | 'PRIVATE';
export type PostStatus = 'ACTIVE' | 'INACTIVE';

export interface Post {
  id: number;
  title: string;
  content: string;
  type: PostType;
  status: PostStatus;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  authorId: number;
  type: PostType;
  status: PostStatus;
}

export interface UpdatePostPayload {
  title?: string;
  content?: string;
  type?: PostType;
  status?: PostStatus;
}
