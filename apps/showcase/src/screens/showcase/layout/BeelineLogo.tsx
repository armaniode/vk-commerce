// Лого билайна — только шарик. Реальный SVG-файл из public/.

export function BeelineLogo({ size = 40 }: { size?: number }) {
  return (
    <img
      src="/logo%20beeline.svg"
      alt="билайн"
      width={size}
      height={size}
      className="block"
    />
  );
}
