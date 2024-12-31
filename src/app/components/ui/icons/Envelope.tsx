export const Envelope = () => {
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
        strokeWidth="2"
      />
      <g transform="translate(11, 13)">
        <rect
          x="10"
          y="20"
          width="60"
          height="40"
          fill="#FFFFFF"
          stroke="#001F54"
          strokeWidth="1.5"
        />
        <polygon
          points="10,20 40,5 70,20"
          fill="#FFFFFF"
          stroke="#001F54"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="20"
          x2="40"
          y2="45"
          stroke="#001F54"
          strokeWidth="1"
        />
        <line
          x1="70"
          y1="20"
          x2="40"
          y2="45"
          stroke="#001F54"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
}
