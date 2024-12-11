import React, {} from 'react';
import {createUseStyles} from 'react-jss';
import {Label} from './typography';
import Icon from './icon';
import { combine } from './helpers/styles';

const useStyles = createUseStyles((theme) => ({
    chip: {
        minWidth: "fit-content",
        minHeight: "fit-content",
        maxWidth: "fit-content",
        maxHeight: "fit-content",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        padding: "5px 10px",
        borderRadius: "5px",
        border: `1pt solid ${theme.onPrimary + "7F"}`,

        "&::after": {
            content: "''",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            opacity: 0,
            backgroundColor: theme.onPrimary
        },
        "&:hover::after": {
            opacity: 0.2
        },
        "&:active::after": {
            opacity: 0.1
        }
    },
    icon: {
        minWidth: "20px",
        minHeight: "20px",
        maxWidth: "20px",
        maxHeight: "20px",
        fontSize: "16px",
        padding: "0px",
        top: "-1px",
    },
    label: {
        margin: 0,
        fontSize: "12px",
    }
}));

export default function Chip({className, label, icon, onPress, leadingIcon = false}) {
    const styles = useStyles();
    return (
        <div className={combine(styles.chip, className)} onClick={onPress}>
            {leadingIcon && icon && <Icon className={styles.icon} icon={icon} />}
            <Label className={styles.label}>{label}</Label>
            {!leadingIcon && icon && <Icon className={styles.icon} icon={icon} />}
        </div>
    );
}