import React from 'react';
import {createUseStyles} from 'react-jss';
import Icon from './common/icon';
import {combine} from './common/helpers/styles';

const useStyles = createUseStyles({
    urban: {
        fontFamily: "UrbanIcons",
        fontSize: ({isInButon}) => isInButon? "24px" : "40px"
    }
});

export default function UrbanIcon({className, __isInButton, ...props}) {
    const styles = useStyles({isInButon: __isInButton});
    return (
        <Icon className={combine(styles.urban, className)} {...props} />
    )
}