import Image from "next/image"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/grandmind-logo.png"
      alt="GrantMind Logo"
      width={120}
      height={120}
      className={className}
      priority
    />
  );
};
