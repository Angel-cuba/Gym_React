import React from "react";

interface IconProps {
  active?: boolean;
}

const colors = (active?: boolean) => ({
  body: active ? "rgba(255,255,255,0.18)" : "#ddd8d0",
  muscle: active ? "rgba(255,255,255,0.92)" : "#56766b",
  accent: active ? "rgba(255,255,255,0.5)" : "#c0bab2",
});

const All = ({ active }: IconProps) => {
  const { body, muscle } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="9" r="7" fill={muscle} />
      <rect x="27" y="15" width="6" height="5" rx="2" fill={muscle} />
      <path
        d="M13 21 C11 26 10 36 11 47 L14 57 L30 59 L46 57 L49 47 C50 36 49 26 47 21 C43 18 37 16 30 16 C23 16 17 18 13 21Z"
        fill={muscle}
        opacity="0.85"
      />
      <path d="M13 21 L7 43 L12 44 L17 25" fill={muscle} opacity="0.75" />
      <path d="M47 21 L53 43 L48 44 L43 25" fill={muscle} opacity="0.75" />
      <path d="M14 57 L12 79 L22 79 L24 57" fill={muscle} opacity="0.75" />
      <path d="M46 57 L48 79 L38 79 L36 57" fill={muscle} opacity="0.75" />
    </svg>
  );
};

const Back = ({ active }: IconProps) => {
  const { body, muscle, accent } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="9" r="7" fill={body} />
      <rect x="27" y="15" width="6" height="5" rx="2" fill={body} />
      <path
        d="M13 21 C11 26 10 36 11 47 L14 57 L30 59 L46 57 L49 47 C50 36 49 26 47 21 C43 18 37 16 30 16 C23 16 17 18 13 21Z"
        fill={body}
      />
      <path
        d="M13 21 C17 18 23 16 30 16 C37 16 43 18 47 21 L42 25 L30 23 L18 25Z"
        fill={muscle}
        opacity="0.9"
      />
      <path
        d="M13 21 C11 26 10 36 11 47 L14 57 L24 59 L24 40 C22 33 18 27 13 21Z"
        fill={muscle}
        opacity="0.85"
      />
      <path
        d="M47 21 C49 26 50 36 49 47 L46 57 L36 59 L36 40 C38 33 42 27 47 21Z"
        fill={muscle}
        opacity="0.85"
      />
      <line x1="30" y1="22" x2="30" y2="57" stroke={accent} strokeWidth="1.5" strokeDasharray="3,3" />
      <path d="M14 57 L12 79 L22 79 L24 57" fill={body} />
      <path d="M46 57 L48 79 L38 79 L36 57" fill={body} />
    </svg>
  );
};

const Cardio = ({ active }: IconProps) => {
  const { body, muscle, accent } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 62 C28 60 14 50 10 39 C7 31 10 22 18 20 C22 19 26 21 30 25 C34 21 38 19 42 20 C50 22 53 31 50 39 C46 50 32 60 30 62Z"
        fill={muscle}
        opacity="0.88"
      />
      <path
        d="M6 46 L13 46 L17 38 L22 54 L26 42 L30 50 L34 44 L38 46 L54 46"
        stroke={active ? "rgba(255,255,255,0.7)" : "#a83a24"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

const Chest = ({ active }: IconProps) => {
  const { body, muscle } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="9" r="7" fill={body} />
      <rect x="27" y="15" width="6" height="5" rx="2" fill={body} />
      <path
        d="M13 21 C11 26 10 36 11 47 L14 57 L30 59 L46 57 L49 47 C50 36 49 26 47 21 C43 18 37 16 30 16 C23 16 17 18 13 21Z"
        fill={body}
      />
      <path
        d="M30 23 C25 23 14 25 13 37 C12 43 15 48 20 48 C25 48 28 43 30 38 C32 43 35 48 40 48 C45 48 48 43 47 37 C46 25 35 23 30 23Z"
        fill={muscle}
        opacity="0.85"
      />
      <path d="M14 57 L12 79 L22 79 L24 57" fill={body} />
      <path d="M46 57 L48 79 L38 79 L36 57" fill={body} />
    </svg>
  );
};

const LowerArms = ({ active }: IconProps) => {
  const { body, muscle } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6 C18 6 15 9 15 13 L15 32 C15 36 18 39 22 39 L38 39 C42 39 45 36 45 32 L45 13 C45 9 42 6 38 6Z" fill={body} />
      <path d="M18 38 C16 42 15 48 15 52 L15 68 C15 72 18 75 22 75 L38 75 C42 75 45 72 45 68 L45 52 C45 48 44 42 42 38Z" fill={muscle} opacity="0.85" />
      <line x1="15" y1="38" x2="45" y2="38" stroke={body} strokeWidth="1.5" />
    </svg>
  );
};

const LowerLegs = ({ active }: IconProps) => {
  const { body, muscle } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6 L12 42 C12 46 15 48 18 48 L27 48 C30 48 30 48 30 48 C30 48 30 48 33 48 L42 48 C45 48 48 46 48 42 L48 6Z" fill={body} />
      <path d="M12 42 C12 46 15 48 18 48 L27 48 L27 72 C27 76 24 78 21 78 L15 78 C13 78 12 76 12 72Z" fill={muscle} opacity="0.85" />
      <path d="M48 42 C48 46 45 48 42 48 L33 48 L33 72 C33 76 36 78 39 78 L45 78 C47 78 48 76 48 72Z" fill={muscle} opacity="0.85" />
    </svg>
  );
};

const Neck = ({ active }: IconProps) => {
  const { body, muscle } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="16" r="13" fill={body} />
      <path d="M22 28 C20 30 18 34 18 38 L18 50 L22 52 L30 54 L38 52 L42 50 L42 38 C42 34 40 30 38 28Z" fill={muscle} opacity="0.9" />
      <path d="M18 50 C16 54 14 62 15 70 L20 75 L30 77 L40 75 L45 70 C46 62 44 54 42 50Z" fill={body} />
      <path d="M26 28 L26 52 C26 52 28 54 30 54 C32 54 34 52 34 52 L34 28" fill={muscle} opacity="0.3" />
    </svg>
  );
};

const Shoulders = ({ active }: IconProps) => {
  const { body, muscle } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="9" r="7" fill={body} />
      <rect x="27" y="15" width="6" height="5" rx="2" fill={body} />
      <path
        d="M17 21 C20 23 24 25 30 25 C36 25 40 23 43 21 L46 42 L48 57 L30 59 L12 57 L14 42Z"
        fill={body}
      />
      <ellipse cx="11" cy="28" rx="7" ry="9" fill={muscle} opacity="0.88" />
      <ellipse cx="49" cy="28" rx="7" ry="9" fill={muscle} opacity="0.88" />
      <path
        d="M13 21 C17 18 23 16 30 16 C37 16 43 18 47 21 L43 23 L30 21 L17 23Z"
        fill={muscle}
        opacity="0.6"
      />
      <path d="M14 42 L12 57 L22 59 L22 44" fill={body} opacity="0.5" />
      <path d="M46 42 L48 57 L38 59 L38 44" fill={body} opacity="0.5" />
    </svg>
  );
};

const UpperArms = ({ active }: IconProps) => {
  const { body, muscle } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6 C18 6 15 9 15 13 L15 44 C15 48 18 51 22 51 L38 51 C42 51 45 48 45 44 L45 13 C45 9 42 6 38 6Z" fill={muscle} opacity="0.85" />
      <path d="M18 50 C16 54 15 60 15 64 L15 72 C15 76 18 78 22 78 L38 78 C42 78 45 76 45 72 L45 64 C45 60 44 54 42 50Z" fill={body} />
      <line x1="15" y1="50" x2="45" y2="50" stroke={active ? "rgba(255,255,255,0.3)" : "#c0bab2"} strokeWidth="1.5" />
    </svg>
  );
};

const UpperLegs = ({ active }: IconProps) => {
  const { body, muscle } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6 L8 12 C8 18 10 22 14 24 L24 26 L28 28 L28 46 C28 46 26 50 24 52 L24 56 L36 56 L36 52 C34 50 32 46 32 46 L32 28 L36 26 L46 24 C50 22 52 18 52 12 L52 6Z" fill={body} />
      <path d="M8 12 C8 18 10 22 14 24 L24 26 L28 28 L28 46 C28 48 26 50 25 52 L12 52 C10 48 8 42 8 36Z" fill={muscle} opacity="0.85" />
      <path d="M52 12 C52 18 50 22 46 24 L36 26 L32 28 L32 46 C32 48 34 50 35 52 L48 52 C50 48 52 42 52 36Z" fill={muscle} opacity="0.85" />
    </svg>
  );
};

const Waist = ({ active }: IconProps) => {
  const { body, muscle, accent } = colors(active);
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="9" r="7" fill={body} />
      <rect x="27" y="15" width="6" height="5" rx="2" fill={body} />
      <path
        d="M14 21 C12 26 11 32 11 38 L12 57 L30 59 L48 57 L49 38 C49 32 48 26 46 21 C42 18 36 16 30 16 C24 16 18 18 14 21Z"
        fill={body}
      />
      <rect x="19" y="30" width="22" height="7" rx="3" fill={muscle} opacity="0.85" />
      <rect x="19" y="40" width="22" height="7" rx="3" fill={muscle} opacity="0.85" />
      <rect x="19" y="50" width="22" height="6" rx="3" fill={muscle} opacity="0.75" />
      <line x1="30" y1="30" x2="30" y2="56" stroke={accent} strokeWidth="1.5" />
    </svg>
  );
};

export const MuscleIcon = ({
  name,
  active = false,
}: {
  name: string;
  active?: boolean;
}) => {
  const map: Record<string, JSX.Element> = {
    all: <All active={active} />,
    back: <Back active={active} />,
    cardio: <Cardio active={active} />,
    chest: <Chest active={active} />,
    "lower arms": <LowerArms active={active} />,
    "lower legs": <LowerLegs active={active} />,
    neck: <Neck active={active} />,
    shoulders: <Shoulders active={active} />,
    "upper arms": <UpperArms active={active} />,
    "upper legs": <UpperLegs active={active} />,
    waist: <Waist active={active} />,
  };

  return map[name.toLowerCase()] ?? <All active={active} />;
};
