import React from 'react';
import {createUseStyles} from 'react-jss';
import useRippleEffect from './hooks/ripple';
import {capitalize, combine} from './helpers/styles';
import {useContainerContext} from './helpers/containers';

const useStyles = createUseStyles((theme) => ({
    icon: ({role, button, appearance, isInButton, rippleClass}) => ({
        fontFamily: "MaterialIcons",
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: isInButton? "20px" : "24px",
        lineHeight: 1,
        textTransform: "none",
        letterSpacing: "normal",
        wordWrap: "normal",
        whiteSpace: "nowrap",
        direction: "ltr",

        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        MosOsxFontSmoothing: "grayscale",
        fontFeatureSettings: "'liga'",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 100%)",
        borderRadius: "100%",
        color: theme[button && appearance === "filled"? role : `on${capitalize(role)}`],

        border: button && appearance === "outlined"? `1pt solid ${theme[`on${capitalize(role)}`]}` : "none",
        minWidth: isInButton? "fit-content" : "48px",
        minHeight: isInButton? "fit-content" : "48px",
        maxWidth: isInButton? "fit-content" : "48px",
        maxHeight: isInButton? "fit-content" : "48px",
        padding: button? "10px" : 0,

        backgroundColor: !button || appearance === "outlined" || appearance === "text"? "transparent" : theme[appearance === "filled"?  `on${capitalize(role)}` : role],
        "&::after": button? {
            content: "''",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            backgroundColor: appearance === "text" || appearance === "outlined"? theme[`on${capitalize(role)}`] : theme[appearance === "filled"? role : `on${capitalize(role)}`],
            opacity: 0,
            transition: "opacity 300ms ease-in-out"
        } : null,
        "&:hover::after": button? {
            opacity: 0.2
        } : null,
        [`& .${rippleClass}`]: button? {
            backgroundColor: appearance === "text" || appearance === "outlined"? theme[`on${capitalize(role)}`] : theme[appearance === "filled"? role : `on${capitalize(role)}`]
        } : null
    })
}));

export default function Icon({className, icon, role = "primary", button, appearance = "filled", onPress, __isInButton, ...props}) {
    const container = useContainerContext();
    if(appearance === "text") role = container === "surface"? "primary" : container;
    const [rippleClass, rippleExpand, rippleFade] = useRippleEffect();
    const styles = useStyles({role, button, appearance, isInButton: __isInButton, rippleClass});
    return (
        <i 
            className={combine(styles.icon, className)}
            onMouseDown={button? rippleExpand : undefined}
            onMouseUp={button? rippleFade : undefined}
            onClick={button? onPress : undefined}
            {...props}
        >
            {icon}
        </i>
    )
}