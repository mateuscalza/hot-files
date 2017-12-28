import React from 'react'

export default function Folder({ size = 48, fill = '#444444', ...props }) {
  return (
    <svg width={size} height={size} viewBox='0 0 48 48' {...props}>
      <g fill={fill}>
        <path d='M12 4C9.79 4 8.02 5.79 8.02 8L8 40c0 2.21 1.77 4 3.98 4H36c2.21 0 4-1.79 4-4V16L28 4H12zm14 14V7l11 11H26z' />
      </g>
    </svg>
  )
}
