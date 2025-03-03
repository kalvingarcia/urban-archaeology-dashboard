import React from 'react';
import {createUseStyles} from 'react-jss';
import {Label, Subtitle, Title} from '../components/common/typography';
import useClock from '../components/common/hooks/clock';

const useStyles = createUseStyles({
    home: {
        padding: "20px",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",

        "& .title": {
            display: "flex",
            justifyContent: "space-between"
        },
        "& .quickActions": {
            flex: "0 1 100%",
            height: "100%",
            width: "100%"
        }
    }
});

export default function Welcome() {
    const currentTime = useClock();
    const styles = useStyles();
    return (
        <section className={styles.home}>
            <div>
                <div className='title'>
                    <Title>Welcome to UrbanDash!</Title>
                    <Label>{currentTime.toLocaleTimeString()}</Label>
                </div>
                <Label>The dashboard for the Urban Archaeology website database...</Label>
            </div>
            <div className='quickActions'>
                <Subtitle>Quick Actions</Subtitle>
                <div>
                    
                </div>
            </div>
        </section>
    );
}