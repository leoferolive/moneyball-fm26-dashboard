interface InfoIconProps {
  description: string
}

export function InfoIcon({ description }: InfoIconProps) {
  return (
    <span className="info-icon" tabIndex={0} role="note" aria-label={description}>
      i
      <span className="info-icon-tooltip" role="tooltip">{description}</span>
    </span>
  )
}
