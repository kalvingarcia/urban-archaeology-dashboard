import React, {useState, useCallback, useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import TextField from './text-field';
import Animate from './animate';
import {combine} from './helpers/styles';

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
    overlay: {
        width: "100%",
        height: "100%",
        position: "fixed",
        inset: 0,
    },
    list: {
        width: "100%",
        height: ({height}) => `${height}px`,
        position: "absolute",
        bottom: ({flip}) => flip? "55px" : null,
        overflow: "auto",
        borderRadius: ({flip}) => flip? "16px" : "0 0 16px 16px",
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

export default function Typeahead({className, label, options, defaultOption, onChange}) {
    const [available, setAvailable] = useState(options);
    useEffect(() => {
        setAvailable(options);
    }, [options]);

    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState(defaultOption?.display?? "");
    const [filter, setFilter] = useState("");
    const handleTypeahead = useCallback(text => {
        setFilter(text);
    }, []);
    const handleSelect = useCallback(option => {
        setDisplay(option.display);
        setOpen(false);
        onChange?.(option.value);
    }, [onChange]);

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
    const handleBlur = useCallback(event => {
        if(event.target.value !== display) setDisplay(new String(display));
        if(event.relatedTarget !== dropdown)
            setOpen(false);
    }, [display, dropdown]);

    const styles = menuStyles({height, flip});
    return (
        <div id={label} className={combine(styles.menu, className)}>
            <TextField 
                label={label} 
                value={display} 
                onFocus={() => setOpen(true)} 
                onBlur={handleBlur}
                onChange={handleTypeahead} 
                onClick={() => setOpen(true)} 
            />
            <div ref={setPosition}>
                <Animate show={open} classes={{enter: styles.grow, exit: styles.shrink}}>
                    <div ref={setDropdown} tabIndex={-1} className={styles.list}>
                        {available?.filter(option => option.display.toLowerCase().includes(filter.toLowerCase())).map(option => (
                            <Option key={option.value} display={option.display} value={option.value} onClick={handleSelect} />
                        ))}
                    </div>
                </Animate>
            </div>
        </div>
    );
}
