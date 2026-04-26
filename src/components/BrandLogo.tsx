import { Link } from 'react-router-dom';

type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  linked?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: 'h-10',
  md: 'h-14',
  lg: 'h-20',
};

export default function BrandLogo({ size = 'md', linked = false, className = '' }: BrandLogoProps) {
  const image = (
    <img
      src="/assets/acadex-logo.png"
      alt="Acadex"
      className={`${sizeClasses[size]} w-auto object-contain ${className}`.trim()}
    />
  );

  if (!linked) {
    return image;
  }

  return <Link to="/home">{image}</Link>;
}
