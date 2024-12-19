import React, {useEffect, useState} from 'react';
import {createPortal} from "react-dom";
import {createUseStyles} from 'react-jss';
import Animate from "./animate";
import {combine} from './helpers/styles';

const useStyles = createUseStyles((theme) => ({
    modal: {
        position: "absolute",
        zIndex: 1000,
    },
    scrim: {
        position: "fixed",
        width: "100%",
        height: "100%",
        inset: 0,
        opacity: 0.75,
        backgroundColor: theme.darkFont
    },
    content: {
        position: "fixed",
        backgroundColor: ({role}) => theme[role]
    },
    fadeIn: {
        animation: `$fadeIn 300ms ease-out forwards`
    },
    fadeOut: {
        animation: `$fadeOut 300ms ease-in forwards`
    },
    slideUp: {
        animation: `$slideUp 300ms ease-in-out forwards`
    },
    slideDown: {
        animation: `$slideDown 300ms ease-in forwards`
    },
    zoomIn: {
        animation: `$zoomIn 300ms ease-in-out forwards`
    },
    zoomOut: {
        animation: `$zoomOut 300ms ease-in forwards`,
        overflow: "hidden"
    },
    lockScroll: {
        overflow: "hidden"
    },
    "@keyframes fadeIn": {
        from: {
            opacity: 0
        }
    },
    "@keyframes fadeOut": {
        to: {
            opacity: 0
        }
    },
    "@keyframes slideUp": {
        from: {
            transform: "translate(0, 1000px)"
        }
    },
    "@keyframes slideDown": {
        to: {
            transform: "translate(0, 1000px)"
        }
    },
    "@keyframes zoomIn": {
        from: {
            transform: "scale(0.95)"
        }
    },
    "@keyframes zoomOut": {
        to: {
            transform: "scale(0.95)"
        }
    }
}));

export default function Modal({className, role = "surface", open, setOpen, children, ...props}) {
    const [show, setShow] = useState(false);

    const styles = useStyles({role});

    useEffect(() => {
        if(show && !open) {
            document.getElementById("root").classList.remove(styles.zoomOut);
            document.getElementById("root").classList.add(styles.zoomIn);
            document.body.classList.remove(styles.lockScroll);
            document.documentElement.classList.remove(styles.lockScroll);
            setTimeout(() => setShow(false) ||  document.getElementById("root").classList.remove(styles.zoomIn), 300);
        } else if(!show && open) {
            document.getElementById("root").classList.add(styles.zoomOut);
            document.body.classList.add(styles.lockScroll);
            document.documentElement.classList.add(styles.lockScroll);
            setShow(true);
        }
    }, [open]);

    return show && createPortal(
        <div className={styles.modal}>
            <Animate show={open} classes={{enter: styles.fadeIn, exit: styles.fadeOut}}>
                <div className={styles.scrim} onClick={() => setOpen(false)} />
            </Animate>
            <Animate show={open} classes={{enter: combine(styles.fadeIn, styles.slideUp), exit: combine(styles.fadeOut, styles.slideDown)}}>
                <div className={combine(styles.content, className)} {...props}>
                    {children}
                </div>
            </Animate>
        </div>,
        document.body
    );
}