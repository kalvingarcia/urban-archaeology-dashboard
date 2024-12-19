import React, {useState, useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import TextField from './text-field';
import Animate from './animate';
import {combine} from './helpers/styles';
import { Label } from './typography';
import Icon from './icon';

const optionStyles = createUseStyles((theme) => ({
    option: {
        position: "relative",
        padding: "15px",

        "&::after": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            opacity: 0,
            backgroundColor: theme.body
        },
        "&:hover::after": {
            opacity: 0.2
        }
    }
}));

function Option({display, value, onClick}) {
    const styles = optionStyles();
    return <div className={styles.option} onClick={() => onClick({display, value})}>{display}</div>;
}

const menuStyles = createUseStyles((theme) => ({
    menu: {
        width: "100%",
        position: "relative",
    },
    display: {
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderRadius: "2000px",
        overflow: "hidden",
        border: `1pt solid ${theme.body + "7F"}`,
        backgroundColor: theme.surface + "7F",

        "&:focus": {
            outline: "none",
        },
        "&:focus::before": {
            outline: "none",
            opacity: 0.1
        },
        "&:focus-within": {
            borderColor: theme.onSecondary
        },
        "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            opacity: 0,
            backgroundColor: theme.body
        },
        "&:hover::before": {
            opacity: 0.2
        },
    },
    arrow: {
        minWidth: "fit-content",
        minHeight: "fit-content",
        maxWidth: "fit-content",
        maxHeight: "fit-content",
        fontSize: "20px",
        padding: 0,
    },
    list: {
        width: "100%",
        height: ({height}) => `${height}px`,
        position: "absolute",
        bottom: ({flip}) => flip? "52px" : null,
        overflow: "auto",
        borderRadius: "16px",
        border: `1pt solid ${theme.body + "7F"}`,
        backgroundColor: theme.surface,
        zIndex: 2,
        transition: "height 300ms ease"
    },
    grow: {
        animation: "$grow 300ms ease-out forwards",
    },
    shrink: {
        animation: "$shrink 300ms ease-out forwards",
    },
    "@keyframes grow": {
        from: {height: 0}
    },
    "@keyframes shrink": {
        to: {height: 0}
    }
}));

export default function DropdownMenu({className, label, options, defaultOption, onChange}) {
    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState(defaultOption?.display?? "Select...");
    const handleSelect = option => {
        setDisplay(option.display);
        setOpen(false);
        onChange?.(option.value);
    }

    const [position, setPosition] = useState(undefined);
    const [height, setHeight] = useState(0);
    const [flip, setFlip] = useState(false);
    useEffect(() => {
        if (position && open) {
            const rect = position.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            const shouldFlip = spaceBelow < 200 && spaceAbove > spaceBelow;
            const maxHeight = shouldFlip ? Math.min(200, spaceAbove) : Math.min(400, spaceBelow);
            setHeight(maxHeight);
            if (flip !== shouldFlip) {
                setFlip(shouldFlip);
            }
        }
    }, [position, open, flip]);

    const [dropdown, setDropdown] = useState();
    const handleBlur = event => {
        if(event.target.value !== display) setDisplay(new String(display));
        if(event.relatedTarget !== dropdown)
            setOpen(false);
    }

    const styles = menuStyles({height, flip});
    return (
        <div id={label} className={combine(styles.menu, className)}>
            <div
                className={styles.display}
                tabIndex={0}
                onFocus={() => setOpen(true)}
                onBlur={handleBlur}
                onClick={() => setOpen(true)} 
            >
                <Label>{display}</Label>
                <Icon className={styles.arrow} icon={open? "arrow_drop_up" : "arrow_drop_down"} />
            </div>
            <div ref={setPosition}>
                <Animate show={open} classes={{enter: styles.grow, exit: styles.shrink}}>
                    <div ref={setDropdown} tabIndex={-1} className={styles.list}>
                        {options.map(option => (
                            <Option key={option.value} display={option.display} value={option.value} onClick={handleSelect} />
                        ))}
                    </div>
                </Animate>
            </div>
        </div>
    );
}
