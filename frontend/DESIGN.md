---
name: SyntaxLab
description: A guided coding workspace for Indonesian beginners.
colors:
  page: "#f3f5f7"
  surface: "#ffffff"
  surface-subtle: "#f8f9fb"
  ink: "#19232e"
  muted: "#687481"
  line: "#e3e7eb"
  line-strong: "#ccd3da"
  accent: "#f0c928"
  accent-ink: "#181a1b"
  nav: "#fdfdfd"
  nav-active: "#f4f5f6"
  code: "#17212c"
  code-ink: "#eaf0f5"
  good: "#18855f"
  bad: "#b9453e"
typography:
  display:
    fontFamily: "SyntaxLab Geist, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(28px, 4vw, 44px)"
    fontWeight: 760
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "SyntaxLab Geist, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(26px, 3vw, 36px)"
    fontWeight: 730
    lineHeight: 1.12
    letterSpacing: "-0.045em"
  title:
    fontFamily: "SyntaxLab Geist, Segoe UI, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 680
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  body:
    fontFamily: "SyntaxLab Geist, Segoe UI, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "SyntaxLab Geist, Segoe UI, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 650
    lineHeight: 1.4
rounded:
  xs: "4px"
  sm: "8px"
  control: "9px"
  md: "11px"
  panel: "14px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  control: "9px"
  md: "12px"
  lg: "16px"
  xl: "18px"
  section: "22px"
  page: "34px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.control}"
    padding: "0 15px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "#34414d"
    rounded: "{rounded.control}"
    padding: "0 15px"
    height: "40px"
  card-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "22px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "40px"
  nav-link-active:
    backgroundColor: "{colors.nav-active}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 11px"
    height: "40px"
---

# Design System: SyntaxLab

## Overview

**Creative North Star: "The Guided Codebench"**

SyntaxLab pairs a quiet learning interface with a hands-on code workspace. Cool, low-contrast surfaces keep lessons readable; one warm yellow accent marks the next action and active learning step. The interface favors compact, clearly labeled controls and generous separation between lesson content, practice, and navigation.

Its visual language is a restrained modern SaaS system: crisp sans-serif typography, fine borders, rounded white panels, and a dark code editor that gives runnable examples a distinct place. The desktop sidebar becomes a fixed bottom navigation on narrow screens, while multi-column learning layouts collapse into a readable single column.

**Key Characteristics:**
- Cool neutral canvas with warm yellow action cues
- Clear lesson sequence paired with editable code and preview
- Fine borders and restrained surface depth
- Indonesian-first interface with compact, direct labels

## Colors

The palette stays neutral and cool around one warm yellow accent; semantic green and red appear only for outcome feedback.

### Primary
- **Syntax Yellow** (#f0c928): Primary actions, active route markers, lesson step badges, and selected learning states.

### Neutral
- **Mist Canvas** (#f3f5f7): The page background behind white learning surfaces.
- **White Surface** (#ffffff): Panels, inputs, preview frames, and secondary controls.
- **Soft Surface** (#f8f9fb): Subtle grouping and quiet background regions.
- **Ink** (#19232e): Main headings and high-priority interface text.
- **Muted Slate** (#687481): Descriptions, secondary labels, and supporting text.
- **Hairline** (#e3e7eb): Panel boundaries, separators, and list dividers.
- **Strong Hairline** (#ccd3da): Form outlines and emphasized borders.
- **Code Slate** (#17212c) and **Code Paper** (#eaf0f5): Editor background and code text.

### Named Rules
**The One Accent Rule.** Keep yellow attached to primary actions and active learning cues; let neutral surfaces carry the rest of the interface.

## Typography

**Display Font:** SyntaxLab Geist (with Segoe UI, Arial, sans-serif fallbacks)  
**Body Font:** SyntaxLab Geist (with Segoe UI, Arial, sans-serif fallbacks)  
**Label/Mono Font:** Cascadia Code (with SFMono-Regular, Consolas, monospace fallbacks)

**Character:** A compact, practical sans-serif voice with controlled headline tracking keeps the interface efficient without making lesson copy feel cramped. Monospace is reserved for code and code-adjacent details.

### Hierarchy
- **Display** (760, responsive 28–44px, 1.05): Main product hero headline.
- **Headline** (730, responsive 26–36px, 1.12): Page titles.
- **Title** (680, 20px, 1.25): Lesson and panel headings.
- **Body** (400, 14px, 1.55): Interface text; lesson reading copy uses 1.75 line height and a 72ch maximum.
- **Label** (650, 11px, 1.4): Compact tags and metadata.

### Named Rules
**The Reading Measure Rule.** Keep long lesson text within the established 72ch measure and preserve its more open line spacing.

## Layout

The desktop shell uses a 244px sticky sidebar, a 64px top bar, and a centered page region capped at 1420px. Page content uses responsive side padding from 20px to 54px and a 34px top inset. Main content uses 18px grid gutters and 16px stack spacing. At 1100px the sidebar narrows; at 820px navigation moves to a fixed bottom bar and multi-column content collapses; at 520px route steps become vertical and page gutters tighten to 17px.

## Elevation & Depth

Depth is primarily tonal and structural: white surfaces sit on a cool gray canvas, fine borders define edges, and the editor uses a darker surface. Shadows remain subtle and local, separating panels slightly and giving primary buttons a small resting edge.

### Shadow Vocabulary
- **Panel edge** (`0 1px 2px rgba(20,31,42,.025)`): Minimal separation for white panels.
- **Primary button edge** (`0 2px 0 rgba(50,45,13,.08)`): Quiet grounding under the main action.

## Shapes

Controls and navigation use compact rounded corners, commonly 9px; cards use a 14px radius, while route bands and editors use 11px. Pills are fully rounded. Borders are thin and cool gray. The route band clips its segmented steps at the outer corners, and the active step receives a subtle inset border.

## Components

### Buttons
- **Shape:** Compact rounded rectangle (9px).
- **Primary:** Yellow background with dark text; 40px high with 15px horizontal padding.
- **Hover / Focus:** Primary shifts to a lighter yellow and lifts 1px; keyboard focus uses a visible blue outline with offset.
- **Secondary / Ghost:** White fill and defined border for secondary actions; text buttons remain unboxed.

### Chips
- **Style:** Small neutral capsule with a fine border and muted text; category and lesson metadata use the same compact form.
- **State:** Yellow-tinted chips mark current or recommended steps; success and error pills use semantic green and red treatments.

### Cards / Containers
- **Corner Style:** 14px panels; nested editor and route surfaces use 11px.
- **Background:** White on the cool page canvas, with subtle secondary surfaces where needed.
- **Shadow Strategy:** Minimal panel edge shadow; borders do most of the separation.
- **Border:** One-pixel neutral line.
- **Internal Padding:** Common panel padding is 22px, reducing to 16px on narrow screens.

### Inputs / Fields
- **Style:** White field with a 1px stronger neutral border, 9px corners, and 10px by 12px padding.
- **Focus:** Border shifts to a warm yellow and a 2px outline marks focus.
- **Error / Disabled:** Disabled buttons reduce opacity; errors use pale red fill, dark red text, and a border.

### Navigation
- **Style:** Sticky white desktop sidebar with grouped labels and 40px links. The active link uses a subtle neutral fill and a narrow yellow leading marker.
- **Mobile:** Fixed bottom bar with evenly distributed icon-and-label links; active state moves the yellow marker above the item.

### Code Lab
Editable code sits in a dark, bordered editor with a compact toolbar; its adjacent preview uses a white frame and browser-like header. On smaller screens the editor and preview stack vertically. Examples can be run, copied, reset, and opened in the Playground.

## Do's and Don'ts

### Do:
- **Do** use the warm accent for primary actions and active learning cues.
- **Do** keep lesson copy readable within the established 72ch measure.
- **Do** preserve the editor's dark surface against the light learning canvas.
- **Do** let multi-column learning content stack on narrow screens.

### Don't:
- **Don't** turn every navigation item or card into an accent-colored element.
- **Don't** place long-form lesson copy at the compact interface line height.
- **Don't** flatten code examples into the same surface treatment as ordinary prose.
