const TONES = {
  success: 'bg-success-bg text-success',
  neutral: 'bg-gray-100 text-muted',
  primary: 'bg-[#EAEFFF] text-primary',
  warning: 'bg-[#FFF4E5] text-warning',
}

export default function Badge({ tone = 'neutral', children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${TONES[tone]} ${className}`}>
      {children}
    </span>
  )
}
