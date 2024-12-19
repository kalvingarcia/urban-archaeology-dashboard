import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {v4} from 'uuid';
import Icon from './common/icon';
import DropdownMenu from './common/dropdown-menu';
import TextField from './common/text-field';
import {Label} from './common/typography';

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
        changeBulb();
    }, [bulb]);

    const styles = bulbStyles();
    return (
        <div className={styles.bulb}>
            <TextField label="Bulb Shape" placeholder="Standard (A19)" value={bulb.shape} onChange={shape => setBulb({...bulb, shape})} />
            <TextField label="Base" placeholder="Medium (E26)" value={bulb.base} onChange={base => setBulb({...bulb, base})} />
            <TextField label="Wattage" placeholder="100" value={bulb.wattage} onChange={wattage => setBulb({...bulb, wattage})} />
            <TextField label="Quantity" value={bulb.quantity} onChange={quantity => setBulb({...bulb, quantity})} />
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
    const removeBulb = ({shape, base}) => {
        setBulbs(bulbs.filter(bulb => bulb.shape !== shape || bulb.base !== base));
    }

    const styles = bulbsFormStyles();
    return (
        <div className={styles.bulbsForm}>
            <div className={styles.heading}>
                <Label>Bulb</Label>
                <Icon className="add" icon="add" button onPress={addBulb} />
            </div>
            <div className={styles.container}>
                {bulbs.map((bulb, index) => (
                    <Bulb key={bulb.shape || bulb.base? `${bulb.shape}:${bulb.base}` : index} bulbData={bulb} onChange={bulb => handleBulbChange(bulb, index)} removeSelf={removeBulb} />
                ))}
            </div>
        </div>
    );
}