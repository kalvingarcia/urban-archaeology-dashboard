import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import useRippleEffect from './hooks/ripple';
import {Label} from './typography';
import { combine } from './helpers/styles';

const useStyles = createUseStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "& .helper": {
            padding: "5px",
            width: "100%",
            height: "fit-content",
            fontSize: "15px",
            color: ({error}) => error? theme.onError : theme.body,
            transition: "color 200ms ease-in-out"
        },
        "&:focus-within .helper": {
            color: ({error}) => error? theme.onError : theme.onSecondary
        }
    },
    textField: {
        width: "100%",
        height: "55px",
        position: "relative",
        cursor: "text",
        borderRadius: "10px 10px 0 0",
        backgroundColor: ({error}) => error? theme.error + "3F" : theme.surface + "7F",
        padding: "10px 20px",
        overflow: "hidden",
        borderBottom: ({error}) => `1pt solid ${error? theme.onError + "7F" : theme.body + "7F"}`,
        transition: "background-color 300ms ease, border-bottom 200ms ease-in-out",
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
        "&::after": {
            content: "''",
            position: "absolute",
            inset: 0,
            transformOrigin: "bottom",
            transform: "scale(0)",
            opacity: 0,
            transition: "transform 100ms ease, opacity 200ms ease",
            borderBottom: ({error}) => `1pt solid ${error? theme.onError : theme.onSecondary}`
        },
        "&:focus-within::after": {
            transform: "scale(1)",
            opacity: 1,
        },
        "& .field": {
            pointerEvents: "auto",
            zIndex: 1,
            width: "100%",
            outline: "none",
            border: "none",
            position: "relative",
            bottom: "-20px",
            backgroundColor: "transparent",
            color: theme.body,
            "&::placeholder": {
                color: "transparent"
            },
            "&:focus::placeholder": {
                color: ({error}) => error? theme.onError + "7F" : theme.body + "7F"
            }
        },
        "& .label": {
            top: "30px",
            position: "absolute",
            transformOrigin: "top left",
            transform: ({filled}) => filled? "translate(0, -80%) scale(0.7)" : "translate(0, -50%)",
            opacity: 0.5,
            transition: "transform 200ms ease, opacity 200ms ease, color 200ms ease",
            color: ({error}) => error? theme.onError : theme.body
        },
        "&:focus-within .label": {
            transform: "translate(0, -80%) scale(0.7)",
            opacity: 1,
            color: ({error}) => error? theme.onError : theme.onSecondary
        },
        "&:has(input:required) .label::after": {
            content: "'*'"
        }
    }
}));

export default function TextField({className, label, helperText, value, onChange, onClick, error, ...props}) {
    const [textField, setTextField] = useState(undefined);
    const handleContainerClick = event => {
        if(textField)
            textField.focus();
        onClick?.(event);
    }

    const [text, setText] = useState(value?? "");
    useEffect(() => {
        setText(value?? "");
        setFilled(!value || value === ""? false : true);
    }, [value]);
    const [filled, setFilled] = useState(!value || value === ""? false : true);
    const handleFill = event => {
        const target = event.currentTarget;
        setFilled(true);
        if(!target.value || !target.value.trim().length)
            setFilled(false);
        setText(target.value);
        onChange?.(target.value);
    }

    const styles = useStyles({filled, error});
    return (
        <div className={styles.container}>
            <div tabIndex={-1} className={combine(styles.textField, className)} onClick={handleContainerClick}>
                <label htmlFor={label}>
                    <Label className="label">{label}</Label>
                    <input
                        ref={element => setTextField(element)}
                        className="field" 
                        id={label}
                        name={label}
                        type="text"
                        value={text}
                        onChange={handleFill}
                        {...props}
                    />
                </label>
            </div>
            {helperText && <Label className="helper">{helperText}</Label>}
        </div>
    )
}