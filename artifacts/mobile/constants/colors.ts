/**
 * Semantic design tokens for the نظافة (Nadhafa) cleaning app.
 *
 * Premium Saudi startup aesthetic — Uber/Careem quality.
 * Primary: green gradient #16C47F → #00D26A
 * Accent / CTA secondary: blue gradient #2F80ED → #4AA3FF
 */

const colors = {
  light: {
    background: "#F7F9FC",
    foreground: "#1F2A37",
    card: "#FFFFFF",

    // Green primary (cleaning brand)
    primary: "#16C47F",
    primaryDark: "#0EA968",
    primaryLight: "#D7F5E8",
    primaryGradientStart: "#16C47F",
    primaryGradientEnd: "#00D26A",

    // Blue accent (used for CTAs like payment, hero promo banners)
    accent: "#2F80ED",
    accentDark: "#1366D6",
    accentLight: "#DBEAFE",
    accentGradientStart: "#2F80ED",
    accentGradientEnd: "#4AA3FF",

    secondary: "#F1F5FB",
    muted: "#F5F7FB",
    mutedForeground: "#6B7280",
    border: "#EEF1F6",
    borderSoft: "#F1F4F9",

    success: "#16C47F",
    successLight: "#D7F5E8",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    danger: "#EF4444",
    dangerLight: "#FEE2E2",

    accentPurple: "#8B5CF6",
    accentPurpleLight: "#EDE9FE",
    accentPink: "#EC4899",
    accentPinkLight: "#FCE7F3",
    accentOrange: "#FB923C",
    accentOrangeLight: "#FFEDD5",

    star: "#F59E0B",
  },
  dark: {
    background: "#0F1521",
    foreground: "#FFFFFF",
    card: "#1A2332",

    primary: "#16C47F",
    primaryDark: "#0EA968",
    primaryLight: "#063D26",
    primaryGradientStart: "#16C47F",
    primaryGradientEnd: "#00D26A",

    accent: "#4AA3FF",
    accentDark: "#2F80ED",
    accentLight: "#1E3A8A",
    accentGradientStart: "#2F80ED",
    accentGradientEnd: "#4AA3FF",

    secondary: "#1F2A3D",
    muted: "#1F2A3D",
    mutedForeground: "#94A3B8",
    border: "#2A3448",
    borderSoft: "#1F2A3D",

    success: "#16C47F",
    successLight: "#063D26",
    warning: "#F59E0B",
    warningLight: "#3A2A06",
    danger: "#EF4444",
    dangerLight: "#3A1414",

    accentPurple: "#8B5CF6",
    accentPurpleLight: "#2A1F4A",
    accentPink: "#EC4899",
    accentPinkLight: "#3A1A2C",
    accentOrange: "#FB923C",
    accentOrangeLight: "#3A2410",

    star: "#F59E0B",
  },
  radius: 24,
};

export default colors;
