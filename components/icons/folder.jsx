import React from 'react'

export default function Folder({ size = 48, fill = '#444444', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" {...props}>
      <g fill={fill}>
        <path d="M20 8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4H24l-4-4z"></path>
      </g>
    </svg>
  )
}
