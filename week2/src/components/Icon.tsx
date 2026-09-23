interface IconProps {
  /** public/icons 안의 파일 이름 (확장자 제외) */
  name: string;
  className?: string;
}

/**
 * public/icons의 단색 SVG를 마스크로 사용해 currentColor로 색을 입힌다.
 * 아이콘 파일은 모두 검정 단색이라, 색은 부모의 text-* 로 지정한다.
 */
export function Icon({ name, className = "" }: IconProps) {
  const maskImage = `url(/icons/${name}.svg)`;

  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] ${className}`}
      style={{ maskImage, WebkitMaskImage: maskImage }}
    />
  );
}
