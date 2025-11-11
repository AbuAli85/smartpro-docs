import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage Component
 * 
 * Features:
 * - Lazy loading by default
 * - Blur placeholder while loading
 * - Proper alt text enforcement
 * - Responsive images with srcset
 * - Priority loading for above-the-fold images
 * - Fade-in animation on load
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className: externalClassName,
  priority = false,
  onLoad,
  objectFit = 'cover',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If priority, load immediately
    if (priority) return;

    // Set up Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport for better perceived performance
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', externalClassName)}
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {/* Blur placeholder while loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse" />
      )}

      {/* Actual image - only load when in view or priority */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          {...props}
          className={cn(
            'transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            objectFit === 'scale-down' && 'object-scale-down',
            'w-full h-full',
            externalClassName
          )}
        />
      )}
    </div>
  );
}

/**
 * ResponsiveImage Component
 * 
 * For images that need different sizes on different devices
 */
interface ResponsiveImageProps extends OptimizedImageProps {
  srcSet?: string;
  sizes?: string;
}

export function ResponsiveImage({
  src,
  srcSet,
  sizes,
  ...props
}: ResponsiveImageProps) {
  return (
    <OptimizedImage
      src={src}
      {...props}
      {...(srcSet && { srcSet })}
      {...(sizes && { sizes })}
    />
  );
}

/**
 * Avatar Component
 * Optimized for user avatars/profile pictures
 */
interface AvatarImageProps extends Omit<OptimizedImageProps, 'objectFit'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackText?: string;
}

export function AvatarImage({
  size = 'md',
  fallbackText,
  className,
  ...props
}: AvatarImageProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={cn('rounded-full overflow-hidden', sizeClasses[size], className)}>
      <OptimizedImage
        {...props}
        objectFit="cover"
        className="w-full h-full"
      />
    </div>
  );
}

/**
 * HeroImage Component
 * Optimized for large hero section images
 */
interface HeroImageProps extends OptimizedImageProps {
  overlay?: boolean;
  overlayOpacity?: number;
}

export function HeroImage({
  overlay = false,
  overlayOpacity = 0.5,
  className,
  ...props
}: HeroImageProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <OptimizedImage
        {...props}
        priority
        objectFit="cover"
        className="w-full h-full"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}

/**
 * CardImage Component
 * Optimized for card thumbnails
 */
interface CardImageProps extends OptimizedImageProps {
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
}

export function CardImage({
  aspectRatio = '16/9',
  className,
  ...props
}: CardImageProps) {
  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-lg', className)}
      style={{ aspectRatio }}
    >
      <OptimizedImage
        {...props}
        objectFit="cover"
        className="w-full h-full"
      />
    </div>
  );
}

