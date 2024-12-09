import React from 'react';
import {createUseStyles} from 'react-jss';
import {useContainerContext} from './helpers/containers';
import {combine, capitalize} from './helpers/styles';

const typographyStyles = createUseStyles((theme) => ({
    display: {
        display: "block",
        position: "relative",
        fontSize: "60px",
        color: ({container}) => container === "surface"? theme.body : theme[`on${capitalize(container)}`]
    },
    title: {
        display: "block",
        position: "relative",
        fontSize: "40px",
        color: ({container}) => container === "surface"? theme.body : theme[`on${capitalize(container)}`]
    },
    subtitle: {
        display: "block",
        position: "relative",
        fontSize: "30px",
        color: ({container}) => container === "surface"? theme.body : theme[`on${capitalize(container)}`]
    },
    heading: {
        display: "block",
        position: "relative",
        fontSize: "30px",
        color: ({container}) => container === "surface"? theme.body : theme[`on${capitalize(container)}`]
    },
    subheading: {
        display: "block",
        position: "relative",
        fontSize: "24px",
        color: ({container}) => container === "surface"? theme.body : theme[`on${capitalize(container)}`]
    },
    body: {
        display: "block",
        position: "relative",
        fontSize: "20px",
        lineHeight: 1.5,
        color: ({container}) => container === "surface"? theme.body : theme[`on${capitalize(container)}`]
    }
}));

export function Display({className, children}) {
    const container = useContainerContext();
    const styles = typographyStyles({container});
    return <h1 className={combine(styles.display, className)}>{children}</h1>
}

export function Title({className, children}) {
    const container = useContainerContext();
    const styles = typographyStyles({container});
    return <h2 className={combine(styles.title, className)}>{children}</h2>
}

export function Subtitle({className, children}) {
    const container = useContainerContext();
    const styles = typographyStyles({container});
    return <h3 className={combine(styles.subtitle, className)}>{children}</h3>
}

export function Heading({className, children}) {
    const container = useContainerContext();
    const styles = typographyStyles({container});
    return <h4 className={combine(styles.heading, className)}>{children}</h4>
}

export function Subheading({className, children}) {
    const container = useContainerContext();
    const styles = typographyStyles({container});
    return <h5 className={combine(styles.subheading, className)}>{children}</h5>
}

export function Body({className, children}) {
    const container = useContainerContext();
    const styles = typographyStyles({container});
    return <p className={combine(styles.body, className)}>{children}</p>
}

export function Label({className, children}) {
    const container = useContainerContext();
    const styles = typographyStyles({container});
    return <span className={combine(styles.body, className)}>{children}</span>
}