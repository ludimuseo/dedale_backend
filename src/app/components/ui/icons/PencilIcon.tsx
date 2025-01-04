export const PencilIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="#FFFFFF"
        stroke="#001F54"
        strokeWidth="3"
      />
      <g transform="translate(25, 25) rotate(130, 35, 25)">
        <rect
          x="25"
          y="25"
          width="40"
          height="10"
          fill="#FFFFFF"
          stroke="#001F54"
          strokeWidth="3"
        />
        <polygon
          points="65,25 75,30 65,35"
          fill="#fffff"
          stroke="#001F54"
          strokeWidth="3"
        />
        <polygon points="75,30 78,31 75,32" fill="#001F54" />
        <rect
          x="15"
          y="25"
          width="10"
          height="10"
          fill="#FFFFFF"
          stroke="#001F54"
          strokeWidth="3"
        />
      </g>
    </svg>
  )
}
