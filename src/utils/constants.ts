import { Theme } from "@/stores/theme-store";

export const birthday = new Date("July 03, 2002");
export const arsenalday = new Date("April 25, 2005");

export const portfolioSource =
	"https://github.com/kmvolv/folio-site";

export const contact = {
	linkedin: "https://www.linkedin.com/in/rohail-alam/",
	email: "rohail03@iastate.edu",
};

export const enum LayoutIds {
	Title1 = "title1",
	Title2 = "title2",
	Shapes = "shapes",
	Line = "line",
	Button = "button",
}

export const darkTheme = {
	type: "dark",
	background: "#000000",
	text: "#fbfbfb",
} as const;

export const lightTheme = {
	type: "light",
	background: "#fbfbfb",
	text: "#121212",
} as const;

export const defaultTheme: Theme = { ...darkTheme, accent: "#6b86f9" };
