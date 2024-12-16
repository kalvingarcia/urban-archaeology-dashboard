import React, {useState, useCallback, useContext, createContext} from 'react';
import {createUseStyles, ThemeProvider} from 'react-jss';

import materialIcons from "./icons/MaterialIcons.woff2";

const globalStyles = createUseStyles((theme) => ({
    "@font-face": {
        fontFamily: "MaterialIcons",
        src: `url(${materialIcons})`
    },
    "@global": {
        "*": {
            transition: "background-color 300ms ease-in-out"
        },
        "html, body": {
            userSelect: "none",
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            margin: 0
        },
        body: {
            backgroundColor: theme.background,
            color: theme.body,
            lineHeight: 1,
            "& *": {
                boxSizing: "border-box",
                "&::before, &::after": {
                    boxSizing: "border-box",
                    transition: "opacity 300ms ease"
                }
            }
        },
        "h1, h2, h3, h4, button, input, label": {
            lineHeight: 1
        },
        "h1, h2, h3, h4": {
            textWrap: "balance"
        },
        "a": {
            "&:not([class])": {
                textDecorationSkipInk: "auto",
                color: "currentcolor"
            }
        },
        "img, picture": {
            maxWidth: "100%",
            display: "block"
        },
        "input, button, textarea, select": {
            font: "inherit"
        },
        "textarea": {
            "&:not([rows])": {
                minHeight: "10em"
            }
        },
        ":target": {
            scrollMarginBlock: "5ex"
        },
        "#root": {
            height: "100%",
            width: "100%"
        }
    }
}));

const DarkModeContext = createContext();
export function useDarkMode() {
    return useContext(DarkModeContext);
}

// Theme Colors
const seaSalt = "#F6F6F6"; // Light Font Color or Light Background Color
const raisinBlack =  "#1C1E26"; // Dark Font Color or Dark Background Color

const platinum =  "#ECECEE"; // Light Surface Color
const onyx =  "#222534"; // Dark Surface Color

const aliceBlue =  "#D0E0E6"; // Primary Light Color
const airForce =  "#799EB3"; // Primary Mid Color
const prussianBlue =  "#113A54"; // Primary Dark Color

const alabaster =  "#E8E8DA"; // Secondary Light Color
const flax =  "#C8AD6C"; // Secondary Mid Color
const lion =  "#AB8F5C"; // Secondary Dark Color

const clot =  "#C2AEAE"; // Error Light Color
const wine =  "#4F1E2B"; // Error Dark Color

export default function Themer({darkModeDefault = true, setDarkModeCookie, children}) {
    const [darkMode, setDarkMode] = useState(darkModeDefault);
    // The toggle function which caches two versions
    const toggleDarkMode = useCallback(() => {
        setDarkMode(!darkMode);
        setDarkModeCookie?.(!darkMode);
    }, [darkMode]);

    const generateTheme = useCallback((darkMode) => {
        return {
            title: darkMode? aliceBlue : prussianBlue,
            subtitle: darkMode? flax : flax,
            heading:  darkMode? airForce : airForce,
            subheading:  darkMode? alabaster : flax,
            body:  darkMode? seaSalt : raisinBlack,
        
            lightFont: seaSalt,
            darkFont: raisinBlack,
        
            background:  darkMode? raisinBlack : seaSalt,
            surface:  darkMode? onyx : platinum,
        
            primary:  darkMode? prussianBlue : aliceBlue,
            onPrimary:  darkMode? aliceBlue : prussianBlue,
            secondary:  darkMode? lion : alabaster,
            onSecondary:  darkMode? alabaster : flax,
        
            error:  darkMode? wine : clot,
            onError:  darkMode? clot : wine
        };
    }, []);

    const theme = generateTheme(darkMode)
    globalStyles({theme});
    return (
        <ThemeProvider theme={theme}>
            <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
                {children}
            </DarkModeContext.Provider>
        </ThemeProvider>
    );
}

