import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {v4} from 'uuid';
import Icon from '../../../components/common/icon';
import TextArea from '../../../components/common/text-area';
import {Label} from '../../../components/common/typography';

const bulbStyles = createUseStyles({
    bulb: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
    }
})

function Bulb({bulbData, onChange, removeSelf}) {
    const [bulb, setBulb] = useState(bulbData?? {});
    const changeBulb = () => {
        onChange?.(bulb);
    }
    useEffect(() => {
        if(!bulb.key)
            setBulb({...bulb, key: v4()});
        changeBulb();
    }, [bulb]);

    const styles = bulbStyles();
    return (
        <div className={styles.bulb}>
            <TextArea label="Bulb Information" placeholder="Standard (A19) Medium Base (E26) 10W LED (100W Equivalent)" value={bulb.info} onChange={info => setBulb({...bulb, info})} />
            <Icon icon="close" button appearance='text' onPress={() => removeSelf(bulb)} />
        </div>
    );
}

const bulbsFormStyles = createUseStyles({
    bulbsForm: {
        width: "100%",
        height: "fit-content"
    },
    heading: {
        display: "flex",
        alignItems: "center",
        gap: "20px",

        "& .add": {
            minWidth: "25px",
            minHeight: "25px",
            maxWidth: "25px",
            maxHeight: "25px",
            padding: "5px",
            top: "-2px"
        }
    },
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    }
})

export default function BulbForm({bulbsData, onChange}) {
    const [bulbs, setBulbs] = useState(bulbsData?? []);
    const changeBulbs = () => {
        onChange?.(bulbs);
    }
    useEffect(() => {
        changeBulbs();
    }, [bulbs]);

    const handleBulbChange = (bulb, position) => {
        bulbs[position] = bulb;
        setBulbs([...bulbs]);
    }

    const addBulb = () => {
        setBulbs([...bulbs, {}]);
    }
    const removeBulb = ({key}) => {
        setBulbs(bulbs.filter(bulb => bulb.key !== key));
    }

    const styles = bulbsFormStyles();
    return (
        <div className={styles.bulbsForm}>
            <div className={styles.heading}>
                <Label>Bulbs</Label>
                <Icon className="add" icon="add" button onPress={addBulb} />
            </div>
            <div className={styles.container}>
                {bulbs.map((bulb, index) => (
                    <Bulb key={bulb.key?? index} bulbData={bulb} onChange={bulb => handleBulbChange(bulb, index)} removeSelf={removeBulb} />
                ))}
            </div>
        </div>
    );
}