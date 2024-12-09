import React from 'react';
import {createUseStyles} from 'react-jss';
import { ContainerContextProvider } from './helpers/containers';

const useStyles = createUseStyles((theme) => ({
    rail: {
        height: "100%",
        width: "70px",
        padding: "10px",
        paddingTop: "30px",
        overflow: "hidden",
        backgroundColor: theme.surface,

        "& > *": {
            height: "100%",
            width: "100%"
        }
    }
}));

export default function NavigationRail({className, children}) {
    const styles = useStyles();
    return (
        <ContainerContextProvider container="primary">
            <header className={styles.rail}>
                <div className={className}>
                    {children}
                </div>
            </header>
        </ContainerContextProvider>
    );
}