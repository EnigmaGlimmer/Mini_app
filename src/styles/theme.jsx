import React from "react";
import {
	alpha,
	createTheme as createMuiTheme,
	darken,
	lighten,
	responsiveFontSizes,
} from "@mui/material";

export const Colors = {
  primary: '#613DC1',
  primary_200: '#EFEEF4',
  primary_300: '#A5B4FC',
  primary_400: "#7E76A5",
  primary_500: '#4E548E',
  primary_600: '#5E548E',
  primary_700: '#4338CA',
  primary_800: '#3730A3',
  primary_900: '#312E81',
  secondary: '#1C192B',
  disabled: '9F86C0',
  tertiary: '#242124',
  light_gray: '#cccccc',
  gray: '#83829A',
  gray2: '#C1C0C8',
  white: '#FFFFFF',
  black: '#000000',
  red: '#ff0000',
  lightWhite: '#FAFAFC',
  purple: '#7C61C3',
  aliceblue: '#f0f8ff',

  netural_50: '#FAFAFA',
  neutral_100: '#F5F5F5',
  neutral_200: '#E5E5E5',
  neutral_300: '#D4D4D4',
  neutral_400: '#A3A3A3',
  neutral_500: '#737373',
  netural_600: '#525252',
  netural_800: '#262626',
  neutral_900: '#171717',

  plush_100: '#EBEBED',
  plush_200: '#D8D7DB',
  plush_300: '#B1AEB6',
  plush_400: '#898692',
  plush_500: '#625D6D',
  plush_600: '#3B3549',
  plush_800: '#23202C',
  plush_900: '#18151D',
  plush_1000: '#0C0B0F',

  success_500: '#22C55E',
  success_600: '#16A34A',

  warning_50: '#FFFBEB',
  warning_100: '#FEF3C7',
  warning_200: '#FDE68A',
  warning_300: '#FCD34D',
  warning_400: '#FBBF24',
  warning_500: '#F59E0B',
  warning_700: '#B45309',
  warning_800: '#92400E',

  line: '#7C61C4',
  facebook_blue: '#1877F2',
  googleButton: 'rgba(0, 0, 0, 0.54)',

  radiant_dawn_100: '#FDFCFA',
  destructive_200: '#FECACA',
  destructive_900: '#7F1D1D',
};

export const lightPlush = {
	100: Colors.plush_100,
	200: Colors.plush_200,
	300: Colors.plush_300,
	400: Colors.plush_400,
	500: Colors.plush_500,
	600: Colors.plush_600,
	800: Colors.plush_800,
	900: Colors.plush_900,
	1000: Colors.plush_1000,
};

export const lightNeutral = {
	50: Colors.netural_50,
	100: Colors.neutral_100,
	200: Colors.neutral_200,
	300: Colors.neutral_300,
	400: Colors.neutral_400,
	500: Colors.neutral_500,
	600: Colors.netural_600,
	800: Colors.netural_800,
	900: Colors.neutral_900,
};

export const lightTertiary = {
	contrast: "#ffffff",
	dark: darken(Colors.tertiary, 0.3),
	light: lighten(Colors.tertiary, 0.3),
	main: Colors.tertiary,
};


export const lightPrimary = {
	contrast: "#ffffff",
	dark: Colors.primary_700,
	light: Colors.primary_200,
	main: Colors.primary_500,
};

export const lightSecondary = {
	contrast: "#ffffff",
	dark: darken(Colors.secondary, 0.3),
	light: '#D9D9D9',
	main: Colors.secondary,
};

export const lightText = {
	primary: Colors.tertiary,
	secondary: "#cccccc",
	contrast: "#ffffff",
};

export const lightBackground = {
	default: "#ffffff",
	paper: "#ffffff",
};

export const lightError = {
	contrast: "#ffffff",
	dark: "#a53531",
	light: "#ef6f6b",
	main: "#ec4c47",
};

export const lightWarning = {
	contrast: "#ffffff",
	dark: Colors.warning_700,
	light: Colors.warning_200,
	main: Colors.warning_500,
};

export const lightInfo = {
	contrast: "#ffffff",
	dark: "#0b4e8d",
	light: "#3f8cd4",
	main: "#1070CA",
};

export const lightSuccess = {
	contrast: "#ffffff",
	dark: "#1b774d",
	light: Colors.success_600,
	main: Colors.success_500,
};

const { breakpoints } = createMuiTheme();

const baseThemeOptions = {
	components: {
		MuiAutocomplete: {
			styleOverrides: {
				noOptions: {
					fontSize: 14,
					letterSpacing: 0.15,
					lineHeight: 1.6,
				},
				option: {
					fontSize: 14,
					letterSpacing: 0.15,
					lineHeight: 1.6,
				},
				paper: {
					boxShadow: "none",
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					fontSize: 14,
					fontWeight: 600,
					letterSpacing: 0,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				sizeLarge: {
					fontSize: 20,
					padding: 10,
					fontWeight: 700
				},
				sizeMedium: {
					fontSize: 16,
					padding: "12px 20px",
				},
				sizeSmall: {
					fontSize: 13,
					padding: "8px 16px",
				},
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiButtonGroup: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiCardActions: {
			styleOverrides: {
				root: {
					paddingBottom: 16,
					paddingLeft: 24,
					paddingRight: 24,
					paddingTop: 16,
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					paddingBottom: 20,
					paddingLeft: 24,
					paddingRight: 24,
					paddingTop: 20,
				},
			},
		},
		MuiCardHeader: {
			styleOverrides: {
				root: {
					paddingBottom: 16,
					paddingLeft: 24,
					paddingRight: 24,
					paddingTop: 16,
				},
				subheader: {
					fontSize: 14,
				},
				title: {
					fontSize: 16,
				},
			},
		},
		MuiCheckbox: {
			defaultProps: {
				checkedIcon: (
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="18" height="18" rx="4" fill="currentColor" />
						<rect x="2" y="2" width="14" height="14" rx="2" fill="currentColor" />
						<path
							d="M13.6666 6.0835L7.24992 12.5002L4.33325 9.5835"
							stroke="white"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				),
				indeterminateIcon: (
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14 0H4C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H14C16.2091 18 18 16.2091 18 14V4C18 1.79086 16.2091 0 14 0Z"
							fill="currentColor"
						/>
						<path
							d="M13.6666 9H5"
							stroke="white"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				),
			},
			styleOverrides: {
				root: {
					transition: "color 250ms",
					":hover, &.Mui-checked:hover, &.MuiCheckbox-indeterminate:hover": {
						backgroundColor: "transparent",
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				avatar: {
					borderRadius: 6,
				},
				root: {
					borderRadius: 6,
					fontWeight: 400,
					letterSpacing: 0,
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: {
					height: "100%",
					overflowY: "auto",
					overflowX: "hidden",
				},
				body: {
					height: "100%",
				},
				"& #root": {
					height: "100%",
				},
				"& #nprogress .bar": {
					zIndex: 2000,
				},
			},
		},
		MuiDialogActions: {
			styleOverrides: {
				root: {
					paddingBottom: 32,
					paddingLeft: 32,
					paddingRight: 32,
					paddingTop: 24,
					"&>:not(:first-of-type)": {
						marginLeft: 16,
					},
				},
			},
		},
		MuiDialogContent: {
			styleOverrides: {
				root: {
					paddingBottom: 8,
					paddingLeft: 32,
					paddingRight: 32,
					paddingTop: 8,
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					fontSize: 24,
					fontWeight: 600,
					paddingBottom: 24,
					paddingLeft: 32,
					paddingRight: 32,
					paddingTop: 32,
				},
			},
		},
		MuiFormControlLabel: {
			styleOverrides: {
				label: {
					fontSize: 14,
					letterSpacing: 0.15,
					lineHeight: 1.43,
				},
			},
		},
		MuiIcon: {
			styleOverrides: {
				fontSizeLarge: {
					fontSize: 32,
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					borderRadius: 6,
					padding: 8,
				},
				sizeSmall: {
					padding: 4,
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				button: {
					"&:before": {
						borderRadius: "0px 2px 2px 0px",
						bottom: 0,
						content: '""',
						left: 0,
						position: "absolute",
						top: 0,
						transform: "scaleX(0)",
						transformOrigin: "left center",
						transition: "transform 0.25s",
						width: 2,
					},
					"&:active:before": {
						transform: "scaleX(1)",
					},
				},
				dense: {
					paddingBottom: 6,
					paddingLeft: 16,
					paddingRight: 16,
					paddingTop: 6,
				},
			},
		},
		MuiListItemText: {
			defaultProps: {
				primaryTypographyProps: {
					variant: "body2",
				},
			},
		},
		MuiListSubheader: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent",
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					fontSize: 14,
					fontWeight: 400,
					letterSpacing: 0.15,
					lineHeight: 1.43,
				},
			},
		},
		MuiRadio: {
			styleOverrides: {
				root: {
					transition: "color 250ms",
					":hover, &.Mui-checked:hover": {
						backgroundColor: "transparent",
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				filled: {
					"&:focus": {
						backgroundColor: "transparent",
					},
				},
			},
		},
		MuiSkeleton: {
			styleOverrides: {
				root: {
					borderRadius: 4,
				},
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				fontSizeLarge: {
					fontSize: 32,
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				root: {
					borderRadius: 48,
					height: 24,
					marginBottom: 8,
					marginLeft: 8,
					marginRight: 8,
					marginTop: 8,
					padding: 0,
					width: 44,
				},
				switchBase: {
					padding: 4,
					"&:hover": {
						backgroundColor: "transparent",
					},
					"&.Mui-checked+.MuiSwitch-track": {
						opacity: 1,
					},
					"&.Mui-disabled": {
						"&+.MuiSwitch-track": {
							opacity: 1,
						},
					},
					"&.Mui-checked.Mui-disabled+.MuiSwitch-track": {
						opacity: 0.5,
					},
				},
				track: {
					opacity: 1,
				},
				thumb: {
					height: 16,
					width: 16,
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					fontSize: 14,
					fontWeight: 400,
					letterSpacing: 0.15,
					lineHeight: 1.71,
					[breakpoints.up("sm")]: {
						marginLeft: 16,
						marginRight: 16,
						minWidth: "fit-content",
						paddingLeft: 0,
						paddingRight: 0,
						"&:first-of-type": {
							marginLeft: 0,
						},
					},
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					".MuiTableCell-root": {
						fontSize: 11,
						fontWeight: 600,
						textTransform: "uppercase",
					},
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					":last-of-type .MuiTableCell-root": {
						borderWidth: 0,
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: Colors.neutral_200
				},
			}
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					"&:-webkit-autofill": {
						"-webkit-box-shadow": "0 0 0 100px #ffffff inset !important",
						"-webkit-text-fill-color": "inherit !important",
						"caret-color": "inherit !important"
					}
				}
			}
		}
	},
	shape: {
		borderRadius: 6,
	},
	typography: {
		fontFamily: "'Geomanist', sans-serif",
		h1: {
			fontSize: 48,
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h2: {
			fontSize: 36,
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h3: {
			fontSize: 32,
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h4: {
			fontSize: 24,
			fontWeight: 700,
			lineHeight: 1.5,
		},
		h5: {
			fontSize: 20,
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h6: {
			fontSize: 16,
			fontWeight: 600,
			lineHeight: 1.5,
		},
		body1: {},
		body2: {
			lineHeight: 1.6,
		},
		subtitle0: {
			fontSize: 20,
			fontWeight: 500,
			lineHeight: 1.5,
		},
		subtitle1: {
			fontSize: 16,
			fontWeight: 500,
		},
		subtitle2: {
			fontSize: 14,
			fontWeight: 500,
			lineHeight: "20px",
		},
		subtitle3: {
			fontSize: 12,
			fontWeight: 400,
			lineHeight: "16px"
		},
		label: {
			fontStyle: "normal",
			fontWeight: 400,
			fontSize: 12,
			lineHeight: 1.25,
		},
		label2: {
			fontSize: 16,
			fontWeight: 600,
			lineHeight: 0.5,
		},
		caption: {
			fontWeight: 400,
			lineHeight: 1.6,
		},
		overline: {
			fontSize: 12,
			fontWeight: 600,
			letterSpacing: 1,
			lineHeight: 2.46,
		},
		button: {
			fontWeight: 500,
			textTransform: "none",
		},
	},
};

const lightThemeOptions = {
	components: {
		MuiAutocomplete: {
			styleOverrides: {
				paper: {
					borderWidth: 1,
					borderStyle: "solid",
					borderColor: Colors.neutral_400,
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					backgroundColor: Colors.neutral_200,
					color: lightText.secondary,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					":focus": {
						boxShadow: `${alpha(lightPrimary.main, 0.25)} 0 0 0 0.2rem`,
					},
					"&.MuiButton-containedTertiary": {
						color: "#ffffff"
					}
				},
			},
		},
		MuiCheckbox: {
			defaultProps: {
				icon: (
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="18" height="18" rx="4" fill="currentColor" />
						<rect x="2" y="2" width="14" height="14" rx="2" fill={lightBackground.paper} />
					</svg>
				),
			},
			styleOverrides: {
				root: {
					color: lightText.secondary,
					":hover:not(.Mui-checked)": {
						color: lightText.primary,
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				avatar: {
					color: Colors.neutral_700,
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				button: {
					"&:before": {
						backgroundColor: lightPrimary.main,
					},
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					border: `1px solid ${Colors.neutral_300}`,
				},
			},
		},
		MuiRadio: {
			defaultProps: {
				checkedIcon: (
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="18" height="18" rx="9" fill="currentColor" />
						<rect x="2" y="2" width="14" height="14" rx="7" fill="currentColor" />
						<rect x="5" y="5" width="8" height="8" rx="4" fill={lightBackground.paper} />
					</svg>
				),
				icon: (
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="18" height="18" rx="9" fill="currentColor" />
						<rect x="2" y="2" width="14" height="14" rx="7" fill={lightBackground.paper} />
					</svg>
				),
			},
			styleOverrides: {
				root: {
					color: lightText.secondary,
					":hover:not(.Mui-checked)": {
						color: lightText.primary,
					},
				},
			},
		},
		MuiSkeleton: {
			styleOverrides: {
				root: {
					backgroundColor: Colors.neutral_100,
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				root: {
					":focus-within": {
						boxShadow: `${alpha(lightPrimary.main, 0.25)} 0 0 0 0.2rem`,
					},
				},
				switchBase: {
					"&.Mui-checked+.MuiSwitch-track": {
						backgroundColor: lightSuccess.main,
					},
					"&.Mui-disabled": {
						"&+.MuiSwitch-track": {
							backgroundColor: alpha(lightText.primary, 0.08),
						},
						".MuiSwitch-thumb": {
							backgroundColor: alpha(lightText.primary, 0.26),
						},
					},
					"&.Mui-checked.Mui-disabled+.MuiSwitch-track": {
						backgroundColor: lightSuccess.main,
					},
				},
				track: {
					backgroundColor: Colors.neutral_500,
				},
				thumb: {
					backgroundColor: "#ffffff",
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderBottom: `1px solid ${Colors.neutral_200}`,
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: Colors.neutral_100,
					borderBottom: `1px solid ${Colors.neutral_200}`,
					".MuiTableCell-root": {
						color: lightText.secondary,
					},
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					"&.MuiTableRow-hover:hover": {
						backgroundColor: Colors.neutral_100,
					},
				},
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					borderColor: Colors.neutral_300,
					"& .MuiSvgIcon-root": {
						color: alpha(lightText.primary, 0.38),
					},
				},
			},
		},
	},
	palette: {
		action: {
			active: alpha(lightText.secondary, 0.86),
			disabled: alpha(lightText.primary, 0.26),
			disabledBackground: alpha(lightText.primary, 0.08),
			focus: alpha(lightText.primary, 0.12),
			hover: alpha(lightText.primary, 0.06),
			selected: alpha(lightText.primary, 0.08),
		},
		background: {
			default: lightBackground.default,
			paper: lightBackground.paper,
		},
		divider: Colors.neutral_200,
		error: {
			contrastText: lightError.contrast,
			dark: lightError.dark,
			light: lightError.light,
			main: lightError.main,
		},
		info: {
			contrastText: lightInfo.contrast,
			dark: lightInfo.dark,
			light: lightInfo.light,
			main: lightInfo.main,
		},
		mode: "light",
		primary: {
			contrastText: lightPrimary.contrast,
			dark: lightPrimary.dark,
			light: lightPrimary.light,
			main: lightPrimary.main,
			200: Colors.primary_200,
			300: Colors.primary_300,
			400: Colors.primary_400,
			500: Colors.primary_500,
			600: Colors.primary_600,
			700: Colors.primary_700,
			800: Colors.primary_800,
			900: Colors.primary_900,
		},
		secondary: {
			contrastText: lightSecondary.contrast,
			dark: lightSecondary.dark,
			light: lightSecondary.light,
			main: lightSecondary.main,
		},
		success: {
			contrastText: lightSuccess.contrast,
			dark: lightSuccess.dark,
			light: lightSuccess.light,
			main: lightSuccess.main,
		},
		text: {
			disabled: alpha(lightText.primary, 0.38),
			primary: lightText.primary,
			secondary: lightText.secondary,
			contrast: lightText.contrast,
		},
		warning: {
			contrastText: lightWarning.contrast,
			dark: lightWarning.dark,
			light: lightWarning.light,
			main: lightWarning.main,
		},
		neutral: lightNeutral,
		tertiary: lightTertiary,
		plush: lightPlush,
	},
	shadows: [
		"none",
		"0px 1px 2px rgba(9, 30, 66, 0.2)",
		"0px 1px 3px rgba(9, 30, 66, 0.12)",
		"0px 2px 4px rgba(9, 30, 66, 0.08)",
		"0px 3px 5px rgba(9, 30, 66, 0.08)",
		"0px 3px 5px -1px rgba(9, 30, 66, 0.08)",
		"0px 5px 7px rgba(9, 30, 66, 0.08)",
		"0px 6px 8px rgba(9, 30, 66, 0.08)",
		"0px 8px 12px rgba(9, 30, 66, 0.08)",
		"0px 9px 14px rgba(9, 30, 66, 0.08)",
		"0px 10px 16px rgba(9, 30, 66, 0.08)",
		"0px 11px 18px rgba(9, 30, 66, 0.08)",
		"0px 12px 20px rgba(9, 30, 66, 0.08)",
		"0px 13px 22px rgba(9, 30, 66, 0.08)",
		"0px 14px 24px rgba(9, 30, 66, 0.08)",
		"0px 15px 26px rgba(9, 30, 66, 0.08)",
		"0px 18px 28px rgba(9, 30, 66, 0.08)",
		"0px 20px 30px rgba(9, 30, 66, 0.08)",
		"0px 22px 32px rgba(9, 30, 66, 0.08)",
		"0px 24px 34px rgba(9, 30, 66, 0.08)",
		"0px 26px 36px rgba(9, 30, 66, 0.08)",
		"0px 28px 38px rgba(9, 30, 66, 0.08)",
		"0px 30px 40px rgba(9, 30, 66, 0.08)",
		"0px 32px 42px rgba(9, 30, 66, 0.08)",
		"0px 36px 46px rgba(9, 30, 66, 0.12)",
	],
};


const getBrandTheme = () => {
	const primaryMain = lightPrimary.main;
	// const backgroundMain = app.secondary_color || lightPrimary.main;

	return {
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						":focus": {
							boxShadow: `${alpha(primaryMain, 0.25)} 0 0 0 0.2rem`,
						},
					},
					containedPrimary: {
						"&:hover": {
							backgroundColor: `${darken(primaryMain, 0.25)}`,
						},
					},
				},
			},
			MuiSkeleton: {
				styleOverrides: {
					root: {
						backgroundColor: Colors.neutral_100,
					},
				},
			},
			MuiSwitch: {
				styleOverrides: {
					root: {
						":focus-within": {
							boxShadow: `${alpha(primaryMain, 0.25)} 0 0 0 0.2rem`,
						},
					},
					switchBase: {
						"&.Mui-checked+.MuiSwitch-track": {
							backgroundColor: primaryMain,
						},
						"&.Mui-disabled": {
							"&+.MuiSwitch-track": {
								backgroundColor: alpha(lightText.primary, 0.08),
							},
							".MuiSwitch-thumb": {
								backgroundColor: alpha(lightText.primary, 0.26),
							},
						},
						"&.Mui-checked.Mui-disabled+.MuiSwitch-track": {
							backgroundColor: primaryMain,
						},
					},
					track: {
						backgroundColor: Colors.neutral_500,
					},
					thumb: {
						backgroundColor: "#ffffff",
					},
				},
			},
		},
		palette: {
			action: {
				active: alpha(lightText.secondary, 0.86),
				disabled: alpha(lightText.primary, 0.26),
				disabledBackground: alpha(lightText.primary, 0.08),
				focus: alpha(lightText.primary, 0.12),
				hover: alpha(lightText.primary, 0.06),
				selected: alpha(lightText.primary, 0.08),
			},
			background: {
				default: lightBackground.default,
				paper: lightBackground.paper,
				app: primaryMain,
			},
			divider: Colors.neutral_200,
			error: {
				contrastText: lightError.contrast,
				dark: lightError.dark,
				light: lightError.light,
				main: lightError.main,
			},
			info: {
				contrastText: lightInfo.contrast,
				dark: lightInfo.dark,
				light: lightInfo.light,
				main: lightInfo.main,
			},
			mode: "app",
			primary: {
				contrastText: lightPrimary.contrast,
				dark: darken(primaryMain, 0.25),
				light: lighten(primaryMain, 0, 25),
				main: primaryMain,
			},
			secondary: {
				contrastText: lightSecondary.contrast,
				dark: lightSecondary.dark,
				light: lightSecondary.light,
				main: lightSecondary.main,
			},
			success: {
				contrastText: lightSuccess.contrast,
				dark: lightSuccess.dark,
				light: lightSuccess.light,
				main: lightSuccess.main,
			},
			text: {
				disabled: alpha(lightText.primary, 0.38),
				primary: lightText.primary,
				secondary: lightText.secondary,
				contrast: lightText.contrast,
			},
			warning: {
				contrastText: lightWarning.contrast,
				dark: lightWarning.dark,
				light: lightWarning.light,
				main: lightWarning.main,
			},
			neutral: lightNeutral,
		},
	};
};

export const createCustomTheme = (config = {}) => {
	let themeOptions = lightThemeOptions;
	let brandThemeptions = getBrandTheme();

	if (!themeOptions) {
		console.warn(new Error(`The theme ${config.theme} is not valid`));
		themeOptions = lightThemeOptions;
	}

	const theme = responsiveFontSizes(
		createMuiTheme(
			{ ...baseThemeOptions },
			{ ...themeOptions },
			{ ...brandThemeptions },
			{
				direction: config.direction,
			}
		)
	);

	return theme;
};
