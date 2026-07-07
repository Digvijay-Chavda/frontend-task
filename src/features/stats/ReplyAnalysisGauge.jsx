const RADIUS = 100
const BAR_LENGTH_FILLED = 32
const BAR_LENGTH_EMPTY = 32

export default function ReplyAnalysisGauge({ percent, label, breakdown }) {
  const bars = 20
  const filledBars = Math.round((percent / 100) * bars)

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[150px] w-[300px] items-end justify-center">
        {Array.from({ length: bars }).map((_, i) => {
          const angle = -90 + (i / (bars - 1)) * 180
          const isFilled = i < filledBars
          return (
            <span
              key={i}
              className={`absolute bottom-0 left-1/2 w-[9px] origin-bottom rounded-full ${isFilled ? 'bg-primary-gradient' : 'bg-gray-200'
                }`}
              style={{
                transform: `rotate(${angle}deg) translateY(-${RADIUS}px)`,
                height: isFilled ? `${BAR_LENGTH_FILLED}px` : `${BAR_LENGTH_EMPTY}px`,
              }}
            />
          )
        })}
        <div className="absolute bottom-0 flex flex-col items-center">
          <span className="text-2xl font-semibold text-dark">{percent}%</span>
          <span className="text-xs text-muted">{label}</span>
        </div>
      </div>

      <div className="mt-2 flex w-full items-center justify-between text-xs">
        <span className="font-medium text-muted">Status</span>
        <span className="font-medium text-muted">Results</span>
      </div>
      <div className="mt-2 flex w-full flex-col gap-2">
        {breakdown.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-text-secondary">
              <span className="size-2 rounded-full" style={{ background: item.color }} />
              {item.label}
            </span>
            <span className="text-text-secondary">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
