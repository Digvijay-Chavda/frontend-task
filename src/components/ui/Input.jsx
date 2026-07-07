export default function Input({ label, hint, className = '', containerClassName = '', ...props }) {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && <label className="text-md font-medium text-dark">{label}</label>}
      <input
        className={`h-[42px] w-full rounded-md border border-border-input px-3 text-sm text-text-secondary placeholder:text-[#9692A4] outline-none focus:border-primary focus:ring-1 focus:ring-primary ${className}`}
        {...props}
      />
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  )
}
