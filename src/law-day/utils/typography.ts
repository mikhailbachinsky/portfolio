/**
 * Typographic utility for Russian typesetting:
 * Binds words, prepositions, conjunctions, and short particles (1-3 characters)
 * to the following word using non-breaking spaces (\u00A0) to eliminate hanging words.
 * Also prevents em-dashes from hanging at the start of a line.
 */
export function formatTypography(text: string): string {
  if (!text) return '';

  let formatted = text;
  let prev = '';

  // Prevent em-dash and en-dash from jumping to the beginning of the line
  formatted = formatted.replace(/\s+([—–])\s+/gu, '\u00A0$1 ');

  // Run iteratively until all adjacent 1-3 letter words are bound with non-breaking spaces
  while (prev !== formatted) {
    prev = formatted;
    // Binds 1-3 letter words/numbers/abbreviations to the following word
    formatted = formatted.replace(
      /(^|[\s\u00A0(«"„])([а-яА-ЯёЁa-zA-Z0-9№]{1,3})\s+/gu,
      '$1$2\u00A0'
    );
    // Binds hyphenated prepositions (из-за, из-под)
    formatted = formatted.replace(
      /(^|[\s\u00A0(«"„])(из-за|из-под)\s+/gu,
      '$1$2\u00A0'
    );
  }

  return formatted;
}

/**
 * Deeply formats all strings in an object or array with non-breaking spaces
 */
export function deepFormatTypography<T>(data: T): T {
  if (typeof data === 'string') {
    return formatTypography(data) as unknown as T;
  }
  if (Array.isArray(data)) {
    return data.map((item) => deepFormatTypography(item)) as unknown as T;
  }
  if (data !== null && typeof data === 'object') {
    const formattedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      formattedObj[key] = deepFormatTypography(value);
    }
    return formattedObj as unknown as T;
  }
  return data;
}
