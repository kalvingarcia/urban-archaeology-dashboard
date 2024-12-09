import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router';
import {createUseStyles} from 'react-jss';
import {Outlet} from 'react-router';
import Themer from './common/themer';
import Icon from './common/icon';
import UrbanIcon from "./urban-icon";
import NavigationRail from './common/navigation-rail';
import {useDarkMode} from './common/themer';

function NavigationLinks() {
    const location = useLocation();
    const [active, setActive] = useState('/');
    useEffect(() => {
        const path = location.pathname;
        switch(true) {
            case path.includes("products"):
                setActive("products");
                break;
            case path.includes("salvage"):
                setActive("salvage");
                break;
            case path.includes("custom"):
                setActive("custom");
                break;
            case path.includes("tags"):
                setActive("tags");
                break;
            default:
                setActive(undefined);
        }
    }, [location]);

    const navigate = useNavigate();

    return (
        <div className="links">
            <UrbanIcon className="homepage" icon="urbarch_logo" button appearance='text' onPress={() => navigate('/')} />
            <UrbanIcon icon="lighting" button appearance={active === "products"? "filled" : "text"} onPress={() => navigate('/products')} />
            <UrbanIcon icon="architecture" button appearance={active === "salvage"? "filled" : "text"} onPress={() => navigate('/salvage')} />
            <UrbanIcon icon="mirrors" button appearance={active === "custom"? "filled" : "text"} onPress={() => navigate('/custom')} />
            <Icon icon="sell" button appearance={active === "tags"? "filled" : "text"} onPress={() => navigate('/tags')} />
        </div>
    );
}

function Settings() {
    const {darkMode, toggleDarkMode} = useDarkMode();
    return (
        <div className="settings">
            <Icon 
                icon={darkMode? "dark_mode" : "light_mode"} 
                role={darkMode? "primary" : "secondary"}
                button
                appearance="outlined"
                onPress={toggleDarkMode}
            />
            <Icon icon="settings" button appearance='tonal'/>
        </div>
    )
}

const useStyles = createUseStyles((theme) => ({
    layout: {
        display: "flex",
        fontFamily: "Univers",
        fontWeight: "400",

        "& .navigation": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

            "& .links": {
                display: "flex",
                flexDirection: "column",
                gap: "10px",

                "& .homepage": {
                    fontSize: "48px"
                }
            },

            "& .settings": {
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }
        }
    },
    main: {
        flex: "0 1 auto",
        width: "100%",
        height: "100%",
    }
}));

export default function Layout() {
    const styles = useStyles();
    return (
        <Themer className={styles.layout}>
            <NavigationRail className="navigation">
                <NavigationLinks />
                <Settings />
            </NavigationRail>
            <main className={styles.main}>
                <Outlet />
            </main>
        </Themer>
    );
}