import React, { useCallback, useEffect, useState } from 'react';
import {createUseStyles} from 'react-jss';
import {Label} from './typography'
import useRippleEffect from './hooks/ripple';

const useStyles = createUseStyles((theme) => ({
    switch: {
        width: "100%",
        height: "fit-content",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px"
    },
    slider: {
        position: "relative",
        width: "60px",
        height: "34px",
        backgroundColor: theme.onPrimary,
        opacity: ({on}) => on? 1 : 0.5,
        borderRadius: "2000px",
        transition: "opacity 300ms ease-in-out",
    },
    thumb: {
        position: "absolute",
        height: "26px",
        width: "26px",
        left: "4px",
        bottom: "4px",
        borderRadius: "2000px",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 2000px)",
        backgroundColor: theme.surface,
        transform: ({on}) => on? "translateX(26px)" : "none",
        transition: "transform 300ms ease-in-out"
    },
    label: {

    }
}));

export default function Switch({label, value = false, onChange}) {
    const [on, setOn] = useState(value);
    useEffect(() => {
        setOn(value);
    }, [value]);

    const toggle = useCallback(() => {
        setOn(!on);
        onChange?.(!on);
    }, [on, onChange]);

    const [rippleClass, rippleExpand, rippleFade] = useRippleEffect();

    const styles = useStyles({on, rippleClass});
    return (
        <div className={styles.switch}>
            <div className={styles.slider} onClick={() => toggle()}>
                <div className={styles.thumb} />
            </div>
            {label && <Label className={styles.label}>{label}</Label>}
        </div>
    );
}