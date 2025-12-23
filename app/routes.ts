import { index, layout, type RouteConfig, route } from '@react-router/dev/routes'

export default [
  layout('./routes/app-layout.tsx', [
    index('routes/home/home.tsx'),

    layout('./routes/auth/auth.tsx', [
      route('/login', 'routes/auth/auth.login.tsx'),
      route('/register', 'routes/auth/auth.register.tsx')
    ])
  ])
] satisfies RouteConfig
