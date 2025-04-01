import { MotionProps, Transition, clamp } from "framer-motion";
import { birthday, arsenalday } from "./constants";

export function fade(
	transition: Transition = {},
	disable = false,
): MotionProps {
	if (disable) return {};

	return {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition,
	};
}

export function objectIf<T>(condition: any, object: T, def = {}) {
	return condition ? object : def;
}

export function yearsFromBirthday() {
	const msDiff = new Date().getTime() - birthday.getTime();
	return Math.floor(
		msDiff / // milliseconds
			(1000 * // seconds
				60 * // minutes
				60 * // hours
				24 * // days
				365), // years
	);
}

export function timeFromDate() {
	const now = new Date();
	let msDiff = now.getTime() - arsenalday.getTime();

	const years = Math.floor(msDiff / (1000 * 60 * 60 * 24 * 365));
	msDiff -= years * 1000 * 60 * 60 * 24 * 365;

	const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
	msDiff -= days * 1000 * 60 * 60 * 24;

	const hours = Math.floor(msDiff / (1000 * 60 * 60));
	msDiff -= hours * 1000 * 60 * 60;

	const minutes = Math.floor(msDiff / (1000 * 60));
	msDiff -= minutes * 1000 * 60;

	const seconds = Math.floor(msDiff / 1000);

	return { years, days, hours, minutes, seconds };
}

// color logic from https://css-tricks.com/snippets/javascript/lighten-darken-color/
// positive amount = lighten, negative amount = darken, range -100 to 100
export function lumenColor(color: string, amount: number) {
	const usePound = color[0] == "#";
	if (usePound) color = color.slice(1);

	const hexColor = parseInt(color, 16);
	const r = clamp(0, 255, (hexColor >> 16) + amount);
	const g = clamp(0, 255, (hexColor & 0x0000ff) + amount);
	const b = clamp(0, 255, ((hexColor >> 8) & 0x00ff) + amount);

	return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

// https://css-tricks.com/snippets/javascript/random-hex-color
export function randomColor() {
	return lumenColor(
		`#${Math.floor(Math.random() * 16777215).toString(16)}`,
		0.2,
	) as `#${string}`;
}
