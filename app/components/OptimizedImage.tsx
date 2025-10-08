import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
  alt: string
  priority?: boolean
  className?: string
  sizes?: string
}

export default function OptimizedImage({
  src,
  fallbackSrc,
  alt,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Générer le srcSet pour les images responsives si elles existent
  const generateSrcSet = (baseSrc: string) => {
    const basePath = baseSrc.replace(/\.(webp|png|jpg|jpeg)$/i, '')
    const extension = baseSrc.match(/\.(webp|png|jpg|jpeg)$/i)?.[0] || '.webp'

    return [
      `${basePath}-sm${extension} 640w`,
      `${basePath}-md${extension} 768w`,
      `${basePath}-lg${extension} 1024w`,
      `${basePath}-xl${extension} 1280w`,
      `${basePath}-2xl${extension} 1920w`,
    ].join(', ')
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        priority={priority}
        sizes={sizes}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...props}
      />
    </div>
  )
}
