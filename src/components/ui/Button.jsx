const VARIANTS = {
  primary:
    'bg-primary-gradient text-white shadow-[inset_0px_4px_8.4px_0px_rgba(38,137,242,0.42)] hover:brightness-105',
  secondary:
    'bg-[#E8E8E8] text-text-secondary hover:bg-[#dedede]',
  outline:
    'bg-white border border-border-input text-text-secondary hover:bg-gray-50',
  ghost: 'bg-transparent text-text-secondary hover:bg-gray-100',
  danger: 'bg-danger text-white hover:brightness-105',
}

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-[23px] py-[10px] text-sm',
  lg: 'px-8 py-3 text-base',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-[5px] font-medium tracking-[0.4px] transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  )
}
