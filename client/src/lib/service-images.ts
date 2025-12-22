/**
 * Service Image Utilities
 * Generates image URLs for services based on category and title
 * Adapted from business-services-hub
 */

export function getServiceCardImageUrl(
  category?: string,
  title?: string,
  coverImageUrl?: string | null,
  width: number = 400,
  height: number = 225
): string {
  // If cover image is provided, use it
  if (coverImageUrl) {
    return coverImageUrl
  }

  // Generate placeholder image based on category
  const categoryMap: Record<string, string> = {
    'Digital Marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    'Legal Services': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
    'Accounting': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
    'IT Services': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    'Design & Branding': 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    'Consulting': 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    'Translation': 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
    'HR Services': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'Content Creation': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  }

  const defaultImage = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7'
  
  let imageUrl = defaultImage
  if (category && categoryMap[category]) {
    imageUrl = categoryMap[category]
  }

  // Add size parameters to Unsplash URLs
  try {
    const url = new URL(imageUrl)
    url.searchParams.set('w', width.toString())
    url.searchParams.set('h', height.toString())
    url.searchParams.set('fit', 'crop')
    url.searchParams.set('crop', 'center')
    url.searchParams.set('q', '80')
    url.searchParams.set('auto', 'format')
    return url.toString()
  } catch (error) {
    console.warn('Failed to construct image URL:', error)
    return `${imageUrl}?w=${width}&h=${height}&fit=crop&crop=center&q=80&auto=format`
  }
}

