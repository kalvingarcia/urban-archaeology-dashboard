import React, {cloneElement} from 'react';
import {createUseStyles} from 'react-jss';
import useRippleEffect from './hooks/ripple';
import {capitalize, combine} from './helpers/styles';
import {useContainerContext} from './helpers/containers';

const useStyles = createUseStyles((theme) => ({
    button: ({role, appearance, rippleClass}) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        position: "relative",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 2000px)",
        borderRadius: "2000px",
        color: theme[appearance === "filled"? role : `on${capitalize(role)}`],

        border: appearance === "outlined"? `1pt solid ${theme[`on${capitalize(role)}`]}` : "none",
        minWidth: "fit-content",
        minHeight: "fit-content",
        maxWidth: "fit-content",
        maxHeight: "fit-content",
        padding: "16px 20px",

        backgroundColor: appearance === "outlined" || appearance === "text"? "transparent" : theme[appearance === "filled"?  `on${capitalize(role)}` : role],
        "&::after": {
            content: "''",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            backgroundColor: appearance === "text" || appearance === "outlined"? theme[`on${capitalize(role)}`] : theme[appearance === "filled"? role : `on${capitalize(role)}`],
            opacity: 0,
            transition: "opacity 300ms ease-in-out"
        },
        "&:hover::after": {
            opacity: 0.2
        },
        [`& .${rippleClass}`]: {
            backgroundColor: appearance === "text" || appearance === "outlined"? theme[`on${capitalize(role)}`] : theme[appearance === "filled"? role : `on${capitalize(role)}`]
        },
        "& .buttonIcon": {
            top: "-3px",
            color: theme[appearance === "filled"? role : `on${capitalize(role)}`]
        }
    })
}));

export default function Button({className, role = "primary", appearance = "filled", icon, onPress, children}) {
    const container = useContainerContext();
    if(appearance === "text") role = container === "surface"? "primary" : container;
    const [rippleClass, rippleExpand, rippleFade] = useRippleEffect();
    const styles = useStyles({role, appearance, rippleClass});
    return (
        <button className={combine(styles.button, className)} onMouseDown={rippleExpand} onMouseUp={rippleFade} onClick={onPress}>
            {icon && cloneElement(icon, {className: "buttonIcon", __isInButton: true})}
            {children}
        </button>
    )
}