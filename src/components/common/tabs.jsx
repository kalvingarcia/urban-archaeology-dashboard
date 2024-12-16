import React, {Children, useState, cloneElement} from 'react';
import {createUseStyles} from 'react-jss';
import Icon from './icon';
import {Label} from './typography';
import {combine} from './helpers/styles';
import useRippleEffect from './hooks/ripple';

const headerStyles = createUseStyles((theme) => ({
    header: ({rippleClass}) => ({
        height: "100%",
        minWidth: "fit-content",
        maxWidth: "fit-content",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        borderRadius: "16px 16px 0 0",
        overflow: "hidden",
        clipPath: "inset(0 0 -1px 0 round 16px 16px 0 0)",

        "&.active": {
            backgroundColor: theme.primary,
            color: theme.onPrimary,

            "& .action": {
                minHeight: "30px",
                maxHeight: "30px",
                minWidth: "30px",
                maxWidth: "30px",
                backgroundColor: "transparent",
                color: theme.onPrimary,

                "&::after": {
                    backgroundColor: theme.onPrimary
                }
            }
        },
        [`&.active .${rippleClass}`]: {
            backgroundColor: theme.onPrimary
        },
        "&:not(.active)::after": {
            content: "''",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            backgroundColor: theme.body,
            opacity: 0,
            transition: "opacity 300ms ease-in-out"
        },
        "&:not(.active):hover::after": {
            opacity: 0.2
        },
        [`&:not(.active) .${rippleClass}`]: {
            backgroundColor: theme.body
        }
    })
}));

function TabHeader({onPress, button, active, children}) {
    const [rippleClass, rippleExpand, rippleFade] = useRippleEffect();
    const styles = headerStyles({rippleClass})
    return (
        <div 
            className={combine(styles.header, active? "active" : undefined)}
            onMouseDown={!active? rippleExpand : undefined}
            onMouseUp={!active? rippleFade : undefined}
            onClick={onPress}
        >
            <Label>{children}</Label>
            {active && button? cloneElement(button, {className: combine("action", button.props.className)}) : undefined}
        </div>
    );
}

const tabsStyles = createUseStyles((theme) => ({
    tabs: {
        height: "100%",
        overflow: "hidden",
        "& .headers": {
            display: "flex",
            paddingTop: "5px",
            gap: "5px",
            alignItems: "center",
            width: "100%",
            height: "50px",
            overflow: "hidden",
            overflowX: "auto",
            backgroundColor: theme.surface
        },
        "& .tab": {
            width: "100%",
            height: "calc(100% - 50px)",
            backgroundColor: theme.primary
        }
    }
}));

export function Tab({className, children}) {
    return (
        <div className={combine("tab", className)}>
            {children}
        </div>
    );
}

export default function Tabs({className, add, children}) {
    const [currentTab, setCurrentTab] = useState(0);
    const tabs = Children.toArray(children);

    const styles = tabsStyles();
    return (
        <div className={combine(styles.tabs, className)}>
            <div className="headers">
                {tabs.map((tab, index) => (
                    <TabHeader key={index} onPress={() => setCurrentTab(index)} button={tab.props.button} active={index === currentTab}>
                        {tab.props.name}
                    </TabHeader>
                ))}
                {add && <Icon icon="add_circle" button appearance="text" onPress={add} />}
            </div>
            {tabs[currentTab]}
        </div>
    )
}