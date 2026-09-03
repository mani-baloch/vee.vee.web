/**
 * Converts a string into a URL-friendly, lowercase, hyphenated slug.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

/**
 * Calculates estimated reading time in minutes based on text/HTML content (avg 200 words/min).
 */
export function calculateReadingTime(contentOrHtml: string): number {
  if (!contentOrHtml) return 1;
  // Strip HTML tags
  const plainText = contentOrHtml.replace(/<[^>]*>/g, ' ');
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Strips HTML tags and generates a concise excerpt.
 */
export function generateExcerpt(contentOrHtml: string, maxLength: number = 160): string {
  if (!contentOrHtml) return '';
  const plainText = contentOrHtml
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength).trim() + '...';
}

/**
 * Formats an ISO date string for display.
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Not published';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Invalid date';
  }
}

/**
 * Formats a date with time for detailed admin logs.
 */
export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return 'Never';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Invalid date';
  }
}
