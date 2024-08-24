//
//  string.ts
//  common
//
//  Created by d-exclaimation on 24 Aug 2024
//

/**
 * Capitalize the first letter of a string
 * @param str The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize the first letter of each word in a phrase
 * @param word The phrase to capitalize
 * @returns The capitalized phrase
 */
export function capitalizePhrase(word: string): string {
  return word.split(" ").map(capitalize).join(" ");
}

/**
 * Trim and clean a string by removing all spaces, tabs, and newlines
 * @param src The source string to clean
 * @returns The cleaned string
 */
export function cleanTrim(src: string): string {
  return src
    .toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("\n", "")
    .replaceAll("\t", "");
}

/**
 * Check if a string includes a query with fuzzy matching
 * @param src The source string to check
 * @param query The query to check
 * @returns Whether the source string includes the query
 */
export function fuzzyIncludes(
  src: string | null | undefined,
  query: string
): boolean {
  return src ? cleanTrim(src).includes(cleanTrim(query)) : false;
}

/**
 * Check if a string starts with a query with fuzzy matching
 * @param src The source string to check
 * @param query The query to check
 * @returns Whether the source string starts with the query
 */
export function fuzzyStartsWith(
  src: string | null | undefined,
  query: string
): boolean {
  return src ? cleanTrim(src).startsWith(cleanTrim(query)) : false;
}

/**
 * Create a set of n-grams from a word
 * @param word The word to create n-grams from
 * @param n The size of the n-grams
 * @returns A set of n-grams
 */
export function ngrams(word: string, n: number = 2): Set<string> {
  const ngrams = new Set<string>();
  for (let i = 0; i < word.length - 1; i++) {
    ngrams.add(word.slice(i, i + n));
  }
  return ngrams;
}

/**
 * Calculate the similarity between two words using n-grams
 * @param word1 The first word
 * @param word2 The second word
 * @param n The size of the n-grams
 * @returns The similarity between the two words
 */
export function ngramSimilarity(
  word1: string,
  word2: string,
  n: number = 2
): number {
  const ngrams1 = ngrams(word1, n);
  const ngrams2 = ngrams(word2, n);

  const intersection = new Set([...ngrams1].filter((x) => ngrams2.has(x)));
  return intersection.size / Math.max(ngrams1.size, ngrams2.size);
}
