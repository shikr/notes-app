import { Form } from 'react-router'
import { Button } from '~/common/components/button'
import { Input } from '~/common/components/input'

interface AuthFormProps {
  label: string
  errors?: {
    name?: string
    password?: string
  }
}

export function AuthForm({ label, errors }: AuthFormProps) {
  return (
    <Form method="post" className="flex flex-col gap-6">
      <div className="space-y-4">
        <Input
          type="text"
          name="user"
          placeholder="Username"
          aria-label="username"
          errorMessage={errors?.name}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="password"
          errorMessage={errors?.password}
          required
        />
      </div>
      <div className="flex justify-center">
        <Button type="submit" className="px-4" radius="lg">
          {label}
        </Button>
      </div>
    </Form>
  )
}
