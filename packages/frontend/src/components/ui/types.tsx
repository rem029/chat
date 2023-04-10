export const uiColors: Record<UIColors, string> = {
	primary: "cyan-800",
	secondary: "white",
};

export type UIColors = "primary" | "secondary";

export interface UICommonInterface {
	fontSize?: "text-xs" | "text-sm" | "text-lg" | "text-xl";
	fontColor?: UIColors;
	bgColor?: UIColors;
	borderColor?: UIColors;
}
