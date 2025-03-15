// src/app/components/faq/Tag.tsx
import React from 'react'

interface TagProps {
  label: string
  color: string
}

const Tag: React.FC<TagProps> = ({ label, color }) => {
  return (
    <span
      className={`inline-block ${color} mr-2 rounded-full px-2 py-1 text-xs`}>
      {label}
    </span>
  )
}

export default Tag
