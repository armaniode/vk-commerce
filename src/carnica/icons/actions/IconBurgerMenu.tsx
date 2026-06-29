import type { SVGProps } from 'react';

export function IconBurgerMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3.9 6.8H19.9C20.4 6.8 20.8 6.4 20.8 5.9C20.8 5.4 20.4 5 19.9 5H3.9C3.4 5 3 5.4 3 5.9C3 6.4 3.4 6.8 3.9 6.8Z" fill="currentColor"/>
      <path d="M19.9 11H3.9C3.4 11 3 11.4 3 11.9C3 12.4 3.4 12.8 3.9 12.8H19.9C20.4 12.8 20.8 12.4 20.8 11.9C20.8 11.4 20.4 11 19.9 11Z" fill="currentColor"/>
      <path d="M19.9 17H3.9C3.4 17 3 17.4 3 17.9C3 18.4 3.4 18.8 3.9 18.8H19.9C20.4 18.8 20.8 18.4 20.8 17.9C20.8 17.4 20.4 17 19.9 17Z" fill="currentColor"/>
    </svg>
  );
}
