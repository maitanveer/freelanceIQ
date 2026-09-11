import Image from "next/image";

export function BrandLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={`relative inline-block overflow-hidden bg-white ${className}`}>
      <Image
        src="/branding/freelanceiq-logo.png"
        alt="FreelanceIQ"
        fill
        priority={priority}
        sizes="(max-width: 640px) 180px, 260px"
        className="object-cover object-center"
      />
    </span>
  );
}
