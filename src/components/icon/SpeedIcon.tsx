import { speedDisplayMap } from '../DropDownSpeed/index';

type SpeedIconProps = {
  speed: number;
};

const SpeedIcon: React.FC<SpeedIconProps> = ({ speed }) => {
  const displaySpeed = speedDisplayMap[speed] || `1x`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="speed-icon"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2"
        ></path>
        <path
          strokeDasharray="4 3"
          strokeLinecap="round"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2"
        ></path>
      </g>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="#f9f8f8"
        fontSize="8"
        dy=".3em"
      >
        {displaySpeed}
      </text>
    </svg>
  );
};

export default SpeedIcon;
