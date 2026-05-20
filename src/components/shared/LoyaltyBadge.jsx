const TIER_STYLES = {
  member: {
    background: 'white',
    color: '#3363AC',
    border: '1px solid #3363AC',
  },
  silver: {
    background: '#8B9BAA',
    color: 'white',
  },
  gold: {
    background: '#B8973E',
    color: 'white',
  },
  diamond: {
    background: '#3D4F5C',
    color: 'white',
  },
  'diamond-reserve': {
    background: '#111111',
    color: 'white',
  },
}

function labelForTier(tier) {
  return String(tier || 'non-member')
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function LoyaltyBadge({ tier = 'non-member' }) {
  const label = labelForTier(tier)

  if (tier === 'non-member') {
    return (
      <span
        style={{
          color: '#6b7280',
          fontSize: 9,
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    )
  }

  const style = TIER_STYLES[tier] ?? TIER_STYLES.member

  return (
    <span
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 3,
        fontSize: 9,
        fontWeight: 700,
        lineHeight: 1.2,
        padding: '1px 5px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
