import type { CSSProperties } from "react";

export type IconName =
  | "search"
  | "movie"
  | "bookmark"
  | "bookmark-outline"
  | "chevron-left"
  | "chevron-right"
  | "arrow-right"
  | "close"
  | "star"
  | "star-outline"
  | "person"
  | "edit"
  | "mail"
  | "lock";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

function Icon({ name, size = 24, className = "" }: IconProps) {
  const style = {
    "--icon": `url(/icons/${name}.svg)`,
    width: size,
    height: size,
  } as CSSProperties;

  return <span aria-hidden className={`icon ${className}`} style={style} />;
}

export default Icon;
