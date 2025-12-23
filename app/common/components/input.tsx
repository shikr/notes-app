import { cn, tv } from 'tailwind-variants'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
}

const input = tv({
  base: 'relative flex items-center  p-2 rounded-xl overflow-hidden before:absolute before:w-full before:scale-x-0 before:origin-center before:h-1 before:left-0 before:bottom-0 before:transition-all focus-within:before:scale-x-100 focus-within:rounded-none transition-all',
  variants: {
    error: {
      true: 'bg-red-500/15 before:bg-red-500',
      false: 'bg-indigo-900/60 before:bg-indigo-600'
    }
  }
})

export function Input({ className, errorMessage, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <div className={input({ error: Boolean(errorMessage) })}>
        <input className={cn(className, 'outline-none')} {...props} />
      </div>

      {errorMessage && (
        <p className="text-xs text-red-500 pointer-events-none">{errorMessage}</p>
      )}
    </div>
  )
}
