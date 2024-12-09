import React, {useCallback, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import useRippleEffect from './hooks/ripple';
import {Label} from './typography';
import { combine } from './helpers/styles';

const useStyles = createUseStyles((theme) => ({
    container: {
        width: "100%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        "& > *": {
            flex: "0 0 fit-content"
        },
        "& .helper": {
            padding: "5px",
            width: "100%",
            height: "fit-content",
            fontSize: "15px",
            color: theme.body,
            transition: "color 200ms ease-in-out"
        },
        "&:focus-within .helper": {
            color: theme.onSecondary
        }
    },
    textArea: {
        width: "100%",
        position: "relative",
        cursor: "text",
        borderRadius: "10px 10px 0 0",
        backgroundColor: theme.surface + "7F",
        padding: "10px 20px",
        overflow: "hidden",
        borderBottom: `1pt solid ${theme.body + "7F"}`,
        transition: "border-bottom 200ms ease-in-out",
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
        "&:focus-within::before": {
            opacity: 0.1
        },
        "&::after": {
            content: "''",
            position: "absolute",
            inset: 0,
            transformOrigin: "bottom",
            transform: "scale(0)",
            opacity: 0,
            transition: "transform 100ms ease, opacity 200ms ease",
            borderBottom: `1pt solid ${theme.onSecondary}`
        },
        "&:focus-within::after": {
            transform: "scale(1)",
            opacity: 1,
        },
        "& .area": {
            pointerEvents: "auto",
            zIndex: 1,
            width: "100%",
            marginTop: "10px",
            minHeight: "70px",
            maxHeight: "196px",
            resize: "none",
            outline: "none",
            border: "none",
            position: "relative",
            bottom: "-10px",
            backgroundColor: "transparent",
            color: theme.body,
            "&::placeholder": {
                color: "transparent"
            },
            "&:focus::placeholder": {
                color: theme.body + "7F"
            }
        },
        "& .label": {
            top: "30px",
            position: "absolute",
            transformOrigin: "top left",
            transform: ({filled}) => filled? "translate(0, -80%) scale(0.7)" : "translate(0, -50%)",
            opacity: 0.5,
            transition: "transform 200ms ease, opacity 200ms ease, color 200ms ease",
            color: theme.body
        },
        "&:focus-within .label": {
            transform: "translate(0, -80%) scale(0.7)",
            opacity: 1,
            color: theme.onSecondary
        },
        "&:has(input:required) .label::after": {
            content: "'*'"
        }
    }
}));

export default function TextArea({className, label, helperText, onChange, value, ...props}) {
    const [textArea, setTextArea] = useState(undefined);
    const handleContainerClick = useCallback(() => {
        if(textArea)
            textArea.focus();
    }, [textArea]);

    const [filled, setFilled] = useState(!value || value === ""? false : true);
    const handleFill = useCallback(event => {
        const target = event.currentTarget;
        setFilled(true);
        if(!target.value || !target.value.trim().length)
            setFilled(false);
        onChange?.(event);
    }, []);

    const styles = useStyles({filled});
    return (
        <div className={styles.container}>
            <div tabIndex={-1} className={combine(styles.textArea, className)} onClick={handleContainerClick}>
                <label htmlFor={label}>
                    <Label className="label">{label}</Label>
                    <textarea
                        ref={element => setTextArea(element)}
                        className="area" 
                        rows={3}
                        id={label}
                        name={label}
                        defaultValue={value}
                        onChange={handleFill}
                        {...props}
                    />
                </label>
            </div>
            {helperText? <Label className="helper">{helperText}</Label> : ""}
        </div>
    )
}