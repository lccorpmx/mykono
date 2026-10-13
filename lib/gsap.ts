"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

ScrollTrigger.config({ ignoreMobileResize: true });

/** Media query used everywhere to gate non-essential motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Seconds (from navigation start) at which the preloader curtain has
 * finished lifting. Kept in sync with the CSS animation in globals.css.
 */
export const INTRO_AT = 1.45;

export { gsap, ScrollTrigger, useGSAP };
