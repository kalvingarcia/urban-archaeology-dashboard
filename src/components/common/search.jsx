import React, {useState, useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import Icon from './icon';
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
    textField: {
        width: "100%",
        height: "fit-content",
        paddingLeft: ({options}) => options? 0 : "20px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "text",
        borderRadius: "2000px",
        backgroundColor: ({error}) => error? theme.error + "3F" : theme.surface + "7F",
        overflow: "hidden",
        border: ({error}) => `1pt solid ${error? theme.onError + "7F" : theme.body + "7F"}`,
        transition: "background-color 300ms ease, border 200ms ease-in-out",
        "&:focus-within": {
            borderColor: ({error}) => error? theme.onError : theme.onSecondary
        },
        "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            opacity: 0,
            backgroundColor: ({error}) => error? theme.onError : theme.body
        },
        "&:hover::before": {
            opacity: 0.2
        },
        "&:focus-within::before": {
            opacity: 0.1
        },
        "& label": {
            flex: "1 1 auto"
        },
        "& .field": {
            pointerEvents: "auto",
            zIndex: 1,
            width: "100%",
            outline: "none",
            border: "none",
            position: "relative",
            bottom: "-2px",
            backgroundColor: "transparent",
            color: theme.body,
            "&::placeholder": {
                color: ({error}) => error? theme.onError + "7F" : theme.body + "7F"
            }
        }
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

export default function Search({className, label, options, onSearch, onSelect, ...props}) {
    // TYPEAHEAD SEARCH CODE
    const [available, setAvailable] = useState(options);
    useEffect(() => {
        setAvailable(options);
    }, [options]);

    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const handleTypeahead = text => {
        setFilter(text);
    }
    const handleSelect = option => {
        setOpen(false);
        onSelect?.(option.value);
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
        if(options && event.relatedTarget !== dropdown)
            setOpen(false);
    }

    // SEARCH BOX CODE
    const [textField, setTextField] = useState(undefined);
    const handleContainerClick = event => {
        if(textField)
            textField.focus();
        if(options) setOpen(true);
    }

    const [text, setText] = useState("");
    const onChange = event => {
        const target = event.currentTarget;
        setText(target.value);
        if(options) handleTypeahead(target.value);
    }

    const handleSearch = () => {
        onSearch?.(text);
    }

    const styles = menuStyles({height, flip, options});
    return (
        <div className={combine(styles.menu, className)}>
            <div tabIndex={-1} className={combine(styles.textField, className)} onClick={handleContainerClick}>
                {options && <Icon icon="search" />}
                <label htmlFor={label}>
                    <input
                        ref={element => setTextField(element)}
                        className="field" 
                        id={label}
                        name={label}
                        type="text"
                        value={text}
                        onBlur={handleBlur}
                        onChange={onChange}
                        placeholder='Search'
                        {...props}
                    />
                </label>
                {!options && <Icon icon="search" button appearance="text" onPress={handleSearch} />}
            </div>
            <div ref={setPosition}>
                {options && 
                    <Animate show={open} classes={{enter: styles.grow, exit: styles.shrink}}>
                        <div ref={setDropdown} tabIndex={-1} className={styles.list}>
                            {available?.filter(option => option.display.toLowerCase().includes(filter.toLowerCase())).map(option => (
                                <Option key={option.value} display={option.display} value={option.value} onClick={handleSelect} />
                            ))}
                        </div>
                    </Animate>
                }
            </div>
        </div>
    );
}
