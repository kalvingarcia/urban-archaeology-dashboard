import {Children, cloneElement, useEffect, useRef, useState} from "react";
import {combine} from "./helpers/styles";

const ENTER_EXIT_ERROR_MESSAGE = "Both enter and exit props need to be defined";
const DEFAULT_ANIMATION_DURATION = 300;

export default function Animate({show = false, classes, duration = DEFAULT_ANIMATION_DURATION, __DELAY = 0, children}) {
    const {enter, exit} = classes;
    // Testing that enter and exit are defined.
    if(!exit) throw new Error(ENTER_EXIT_ERROR_MESSAGE); // Throwing an error to inform that enter or exit or both are undefined.

    const [_, setState] = useState("inactive");
    const [render, setRender] = useState(enter === undefined); // Defines whether to render the child or not.
    const queue = useRef([]);
    useEffect(() => {
        // Testing the cases of show and hide (mount and unmount).
        if(show && !render) {
            setState("enter");
            setTimeout(() => setRender(true) || queue.current.push(enter), __DELAY);
            setTimeout(() => queue.current.shift(), duration + __DELAY); // After the animation duration is over, we reset the child.
        } else if(!show && render) {
            setState("exit");
            queue.current.push(exit);
            setTimeout(() => setRender(false) || queue.current.shift(), duration); // After the animation, we unmount and reset the child.
        }
    }, [show, render, duration]);

    const child = Children.only(children); // Assert that the child is an only child.
    return render && cloneElement(child, {className: combine(child.props.className, ...queue.current)});
}