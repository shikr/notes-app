import { cn, cx, tv, type VariantProps } from 'tailwind-variants'
import { useRipple } from '../hooks/useRipple'
import { Ripple } from './ripple'
import { Spinner, type SpinnerProps } from './spinner'

const button = tv({
  base: 'inline-block p-1 transition-all',
  variants: {
    color: {
      primary: 'bg-indigo-100 ring-indigo-200/30 hover:opacity-70',
      secondary:
        'bg-black/40 ring-gray-200/30 ring-1 hover:ring-gray-300/30 hover:opacity-70',
      danger: 'bg-red-500/80 ring-red-200/30 hover:opacity-70'
    },
    variant: {
      solid: 'text-gray-800',
      light: 'bg-transparent'
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    }
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'light',
      className: 'text-white hover:bg-indigo-200/20 hover:ring-1'
    },
    { color: 'secondary', variant: 'solid', className: 'text-white' },
    {
      color: 'secondary',
      variant: 'light',
      className: 'ring-0 hover:ring-1 hover:bg-black/40'
    },
    { color: 'danger', variant: 'solid', className: 'text-white' },
    {
      color: 'danger',
      variant: 'light',
      className: 'ring-red-700/60 hover:ring-1 hover:bg-red-500/30 hover:opacity-100'
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    radius: 'sm'
  }
})

export type ButtonProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T
    disableRipple?: boolean
    isIconOnly?: boolean
    isLoading?: boolean
    spinnerSize?: SpinnerProps['size']
    children: React.ReactNode
  } & VariantProps<typeof button>

export function Button<T extends React.ElementType = 'button'>({
  as,
  children,
  disabled,
  className,
  color,
  variant,
  radius,
  onClick,
  disableRipple,
  isIconOnly,
  isLoading,
  spinnerSize,
  ...props
}: ButtonProps<T>) {
  const { onCreateRipple, onClearRipple, ripples } = useRipple()
  const Component = as || 'button'
  const isDisabled = isLoading === true || disabled === true

  return (
    <Component
      disabled={isDisabled}
      onClick={(...e) => {
        if (disableRipple !== true) onCreateRipple(e[0])
        if (onClick) onClick(...e)
      }}
      className={button({
        color,
        variant,
        radius,
        className: cn(
          className,
          'relative overflow-hidden flex items-center justify-center gap-1',
          cx(isDisabled && 'cursor-not-allowed opacity-50 hover:opacity-50')
        )
      })}
      {...props}
    >
      {isLoading === true && <Spinner size={spinnerSize} />}
      {isLoading === true && isIconOnly === true ? null : (
        <span className="relative z-10">{children}</span>
      )}
      {disableRipple !== true && <Ripple ripples={ripples} clearRipple={onClearRipple} />}
    </Component>
  )
}
