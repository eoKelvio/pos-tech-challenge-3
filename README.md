# Simple Blog Platform

A clean and modern blog platform built with React, TypeScript, and Tailwind CSS. Features authentication, post management, and a beautiful responsive design.

## Features

### Authentication
- **Sign Up**: Create a new account with name, email, and password
- **Sign In**: Login with email and password
- **JWT Authentication**: Secure token-based authentication
- **Auto Refresh**: Automatic token refresh mechanism

### Post Management
- **Create Posts**: Authenticated users can create new blog posts
- **Edit Posts**: Update your existing posts
- **Delete Posts**: Remove inactive posts
- **View Posts**: Read full post details
- **Search**: Real-time search by title or content
- **Post Types**: PUBLIC or PRIVATE posts
- **Post Status**: ACTIVE or INACTIVE

### Public Access
- View active public posts without authentication
- Beautiful blog-style layout
- Responsive design for all devices

## Project Structure

```
src/
├── api/
│   └── api.ts                    # Axios instance with JWT interceptors
├── hooks/
│   ├── useAuth.ts                # Authentication hooks (signup, signin, me)
│   └── usePosts.ts               # Posts CRUD hooks
├── types/
│   └── posts.ts                  # TypeScript interfaces
├── components/
│   └── modals/
│       ├── create/
│       │   └── CreatePostModal.tsx
│       ├── update/
│       │   └── UpdatePostModal.tsx
│       └── view/
│           └── ViewPostModal.tsx
├── pages/
│   ├── Auth/
│   │   └── Auth.tsx              # Login & Register page
│   └── Posts/
│       └── Posts.tsx             # Main blog page
└── routes/
    └── Routes.tsx                # App routing
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/signin` - Login and get JWT token
- `GET /auth/me` - Get current user info (authenticated)

### Posts
- `GET /posts` - Get active public posts (public)
- `GET /posts/all` - Get all posts (authenticated)
- `GET /posts/search?title=` - Search posts by title
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create new post (authenticated)
- `PUT /posts/:id` - Update post (authenticated)
- `DELETE /posts/:id` - Delete post (authenticated, inactive only)

## Tech Stack

- **React 19.1.1** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Vite 7.1.7** - Build tool
- **React Query 5.90.2** - Server state management
- **React Router DOM 7.9.4** - Routing
- **Axios 1.12.2** - HTTP client
- **Tailwind CSS 4.1.14** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd pos-tech-challenge-3
```

2. Install dependencies
```bash
npm install
```

3. Configure API URL
The API base URL is configured in `src/api/api.ts`:
```typescript
baseURL: 'http://127.0.0.1:8000'
```

4. Start development server
```bash
npm run dev
```

5. Open your browser
Navigate to `http://localhost:5173`

## Usage

### For Public Users
1. Go to the home page (`/`)
2. Click "View Public Posts" to see active public posts
3. Or register an account to create posts

### For Authenticated Users
1. Sign up with name, email, and password
2. Sign in with your credentials
3. Create, edit, and manage your posts
4. Search and filter posts
5. Toggle post visibility (PUBLIC/PRIVATE)
6. Toggle post status (ACTIVE/INACTIVE)

## Design

### Auth Page
- Clean gradient background (blue to purple)
- Toggle between Sign In and Sign Up
- Form validation
- Error handling
- Public posts access button

### Posts Page
- Blog-style card layout
- Sticky header with search
- Post cards with title, content preview, badges
- Action buttons (View, Edit, Delete)
- Responsive grid layout
- Empty states
- Loading states

### Modals
- Create Post: Form to create new posts
- Update Post: Edit existing post details
- View Post: Read full post with formatted details

## API Integration

The app uses React Query for efficient server state management:

- **Automatic caching**: Reduces unnecessary API calls
- **Background refetching**: Keeps data fresh
- **Optimistic updates**: Instant UI feedback
- **Error handling**: Graceful error states
- **Loading states**: Better UX

## Color Scheme

- **Primary**: Blue (#2563EB) to Purple (#9333EA) gradient
- **Background**: Light gray gradient (#F9FAFB to #F3F4F6)
- **Cards**: White with subtle shadows
- **Text**: Gray scale (900, 700, 600, 500)
- **Status Badges**:
  - PUBLIC: Blue (#3B82F6)
  - PRIVATE: Purple (#A855F7)
  - ACTIVE: Green (#10B981)
  - INACTIVE: Red (#EF4444)

## Development

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Type checking
```bash
npm run type-check
```

## License

MIT
