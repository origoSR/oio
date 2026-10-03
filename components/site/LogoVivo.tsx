import Image from 'next/image'

export function LogoVivo() {
  return (
    <Image
      src="/logo-anillo.webp"
      alt=""
      width={660}
      height={660}
      className="w-[120px] h-[120px] lg:w-[200px] lg:h-[200px]"
      style={{ filter: 'drop-shadow(0 24px 48px rgb(0 0 0 / 0.16))' }}
      priority
      unoptimized
    />
  )
}
