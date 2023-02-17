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
 * Tailwind default opacity options
 */
export type Opacity =
  | "0"
  | "5"
  | "10"
  | "20"
  | "25"
  | "30"
  | "40"
  | "50"
  | "60"
  | "70"
  | "75"
  | "80"
  | "90"
  | "95"
  | "100";

/**
 * Tailwind arbitary value
 */
export type Arbitary = `[${string}]`;

/**
 * Base color palette without prefix and opacity
 */
export type Base =
  | `${Hue}-${Lightness}`
  | "white"
  | "black"
  | "transparent"
  | "current";

/**
 * Base color palette with opacity but without prefix
 */
export type BaseWithOpacity = Base | `${Base}/${Opacity}` | Arbitary;

/**
 * Tailwind color with custom prefix
 */
export type Color<Prefix extends string> = `${Prefix}-${BaseWithOpacity}`;

/**
 * Tailwind default color prefixes
 */
export type ColorPrefixes =
  | "bg"
  | "text"
  | "decoration"
  | "border"
  | "divide"
  | "outline"
  | "ring"
  | "ring-offset"
  | "shadow"
  | "accent"
  | "caret";

/**
 * Tailwind color palette
 */
export type Palette = {
  [Prefix in ColorPrefixes]: Color<Prefix>;
};
