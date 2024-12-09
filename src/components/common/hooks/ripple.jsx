import {useCallback} from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    ripple: {
        position: "fixed",
        pointerEvents: "none",
        borderRadius: "50%",
        opacity: 0.3,
        transform: "scale(0)",
        animation: "$ripple-effect 1800ms forwards",
        "&.fade": {
            animation: "$ripple-effect 1200ms forwards, $fade-effect 600ms forwards"
        }
    },
    "@keyframes ripple-effect": {
        to: {
            transform: "scale(4)"
        }
    },
    "@keyframes fade-effect": {
        to: {
            opacity: 0
        }
    }
});

export default function useRippleEffect() {
    const rippleClass = useStyles().ripple;

    const rippleExpand = useCallback(event => {
        const target = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(target.clientWidth, target.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - radius}px`;
        circle.style.top = `${event.clientY - radius}px`;
        circle.classList.add(rippleClass);

        // const ripple = target.getElementsByClassName(rippleClass)[0];
        // if(ripple) ripple.remove();

        target.appendChild(circle);
        event.stopPropagation();
    }, []);

    const rippleFade = useCallback(event => {
        const target = event.currentTarget;

        // const ripple = target.getElementsByClassName(rippleClass)[0];
        // if(ripple) {
        //     ripple.classList.add("fade");
        //     setTimeout(() => ripple?.remove(), 600);
        // }
        [...target.getElementsByClassName(rippleClass)].map(ripple => {
            ripple.classList.add("fade");
            setTimeout(() => ripple?.remove(), 600);
        });

        event.stopPropagation();
    }, []);

    return [rippleClass, rippleExpand, rippleFade];
}