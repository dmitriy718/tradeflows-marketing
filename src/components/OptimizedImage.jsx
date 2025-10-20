import { useState, useEffect, useRef } from 'react'
import './OptimizedImage.css'

/**
 * OptimizedImage Component
 * - Lazy loading with Intersection Observer
 * - Blur-up placeholder effect
 * - Automatic WebP format with PNG fallback
 * - Responsive images with srcset
 * - Loading state management
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'blur',
  priority = false,
  sizes,
  onLoad,
  onError,
  useWebP = true // Enable WebP by default
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observerRef.current?.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    )

    observerRef.current.observe(imgRef.current)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [priority])

  // Generate WebP source path from PNG path
  const getWebPSrc = (baseSrc) => {
    if (!baseSrc || !useWebP) return null
    return baseSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  }

  // Generate srcset for responsive images (currently disabled, can be enabled for multiple sizes)
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return undefined
    // For now, just return the base source
    // In future, could generate multiple sizes: 640w, 750w, 1080w, etc.
    return undefined
  }

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true)
    onLoad?.(e)
  }

  // Handle image error
  const handleError = (e) => {
    setHasError(true)
    onError?.(e)
  }

  // Placeholder styles
  const placeholderStyle = {
    backgroundColor: placeholder === 'blur' ? '#f3f4f6' : 'transparent',
    filter: placeholder === 'blur' && !isLoaded ? 'blur(10px)' : 'none',
    transform: placeholder === 'blur' && !isLoaded ? 'scale(1.1)' : 'scale(1)'
  }

  return (
    <div
      ref={imgRef}
      className={`optimized-image-wrapper ${className} ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : undefined
      }}
    >
      {hasError ? (
        <div className="image-error">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#cbd5e0" strokeWidth="2"/>
            <path d="M24 16v12m0 4h.01" stroke="#cbd5e0" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Failed to load image</span>
        </div>
      ) : (
        <>
          {/* Placeholder */}
          {!isLoaded && placeholder === 'blur' && (
            <div className="image-placeholder" style={placeholderStyle} />
          )}

          {/* Actual image - only load when in view */}
          {isInView && (
            useWebP && getWebPSrc(src) ? (
              <picture>
                <source
                  type="image/webp"
                  srcSet={getWebPSrc(src)}
                  sizes={sizes}
                />
                <img
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  loading={priority ? 'eager' : 'lazy'}
                  decoding={priority ? 'sync' : 'async'}
                  onLoad={handleLoad}
                  onError={handleError}
                  className={`optimized-image ${isLoaded ? 'visible' : 'hidden'}`}
                  style={placeholderStyle}
                />
              </picture>
            ) : (
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                decoding={priority ? 'sync' : 'async'}
                sizes={sizes}
                srcSet={generateSrcSet(src)}
                onLoad={handleLoad}
                onError={handleError}
                className={`optimized-image ${isLoaded ? 'visible' : 'hidden'}`}
                style={placeholderStyle}
              />
            )
          )}

          {/* Loading indicator */}
          {!isLoaded && !hasError && (
            <div className="image-loading">
              <div className="loading-spinner"></div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
