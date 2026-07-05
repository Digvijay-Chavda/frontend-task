export default function Card({ className = '', children, title, action }) {
  return (
    <div className={`rounded-lg border border-[#EBE9F1] bg-white p-4 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between">
          {title && <h3 className="text-[15px] font-semibold text-dark">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
