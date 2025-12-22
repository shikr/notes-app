import { tv, type VariantProps } from 'tailwind-variants'

const spinner = tv({
  base: 'h-5 w-5 animate-spin rounded-full border-4 border-t-current border-b-indigo-500 border-l-gray-600/60 border-r-gray-600/60',
  variants: {
    size: {
      sm: 'h-5 w-5 border-4',
      md: 'h-7 w-7 border-5',
      lg: 'h-10 w-10 border-6'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export type SpinnerProps = VariantProps<typeof spinner> &
  React.HTMLAttributes<HTMLDivElement>

export function Spinner({ size, className, ...props }: SpinnerProps) {
  return <div className={spinner({ size, className })} {...props} />
}
