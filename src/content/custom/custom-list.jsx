import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles((theme) => ({}));

export default function CustomList() {
    const {id} = useParams();
    const navigate = useNavigate();

    const styles = useStyles();
    return (<></>);
}