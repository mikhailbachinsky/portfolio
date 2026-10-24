/**
 * Russian typography formatter that replaces spaces after 1-3 letter prepositions,
 * conjunctions, and particles with non-breaking spaces (\u00A0), and binds em-dashes.
 */

// List of Russian 1-3 letter prepositions, conjunctions, particles and common short words
const SHORT_WORDS_REGEX = /(^|[\s(«"„])([а-яёА-ЯЁa-zA-Z0-9]{1,3})\s+/gu;

export function typograph(text: string): string {
  if (!text) return '';

  return text
    // Replace space after 1-3 character words with non-breaking space
    // Run twice to catch adjacent short words (e.g. "и в", "не было")
    .replace(SHORT_WORDS_REGEX, '$1$2\u00A0')
    .replace(SHORT_WORDS_REGEX, '$1$2\u00A0')
    // Non-breaking space before em-dash
    .replace(/\s+—/g, '\u00A0—')
    // Non-breaking space after opening quote/parenthesis if any
    .replace(/([«(])\s+/g, '$1')
    // Non-breaking space before closing quote/parenthesis if any
    .replace(/\s+([»)])/g, '$1')
    // Non-breaking space before particles like "бы", "ли", "же"
    .replace(/\s+(бы|ли|же)\b/gi, '\u00A0$1');
}
