import PropTypes from 'prop-types'

function Loader({ label = 'Loading…', size = 'md', tone = 'muted' }) {
  const sizeClasses =
    size === 'sm'
      ? 'h-4 w-4'
      : size === 'lg'
        ? 'h-7 w-7'
        : 'h-5 w-5'

  const toneClasses =
    tone === 'onDark'
      ? 'text-slate-200'
      : tone === 'onPrimary'
        ? 'text-white'
        : 'text-slate-600'

  const spinnerBorder = tone === 'onPrimary' ? 'border-white/30 border-t-white' : 'border-slate-200 border-t-emerald-600'

  return (
    <div className={`inline-flex items-center gap-2 ${toneClasses}`}>
      <span
        aria-hidden="true"
        className={`${sizeClasses} animate-spin rounded-full border-2 ${spinnerBorder}`}
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}

Loader.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  tone: PropTypes.oneOf(['muted', 'onPrimary', 'onDark']),
}

export default Loader
