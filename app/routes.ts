import { layout, type RouteConfig, route } from '@react-router/dev/routes'

export default [
  layout('./routes/app-layout.tsx', [
    route('/', 'routes/home/home.tsx', [route('/note', './routes/note/note.create.tsx')]),

    layout('./routes/auth/auth.tsx', [
      route('/login', 'routes/auth/auth.login.tsx'),
      route('/register', 'routes/auth/auth.register.tsx')
    ])
  ])
] satisfies RouteConfig
