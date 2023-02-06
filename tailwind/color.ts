//
//  color.ts
//  common
//
//  Created by d-exclaimation on 06 Feb 2023
//

/**
 * Tailwind default lightness options
 */
export type Lightness =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

/**
 * Tailwind default hue options
 */
export type Hue =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

/**
 * Tailwind base color palette (without prefix)
 */
export type BaseColor =
  | `${Hue}-${Lightness}`
  | "white"
  | "black"
  | "transparent";

/**
 * Tailwind text color palette
 */
export type TextColor = `text-${BaseColor}`;

/**
 * Tailwind background color palette
 */
export type BgColor = `bg-${BaseColor}`;

/**
 * Tailwind decoration color palette
 */
export type DecorationColor = `decoration-${BaseColor}`;

/**
 * Tailwind color palette with custom prefix
 */
export type Color<Prefix extends string> = `${Prefix}-${BaseColor}`;

/**
 * Tailwind color palette with extended hue
 */
export type ExtendHue<
  T extends `${string}-${BaseColor}`,
  Options extends string
> = T extends `${infer Prefix}-${BaseColor}`
  ? `${Prefix}-${Hue | Options}-${Lightness}`
  : T;

/**
 * Tailwind color palette with extended color (without lightness)
 */
export type ExtendBase<
  T extends `${string}-${BaseColor}`,
  Options extends string
> = T extends `${infer Prefix}-${BaseColor}`
  ? `${Prefix}-${BaseColor | Options}`
  : T;
