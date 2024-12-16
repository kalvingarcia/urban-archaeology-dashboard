import React, { useCallback, useEffect, useState } from 'react';
import {createUseStyles} from 'react-jss';
import DropdownMenu from './common/dropdown-menu';
import TextField from './common/text-field';
import {Label} from './common/typography';

const specificationStyles = createUseStyles({
    specification: {
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "flex-start",

        "& :nth-child(2)": {
            flex: "0 1 fit-content"
        }
    },
    specifications: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    }
});

function Specification({label, specificationData, onChange}) {
    const [specification, setSpecification] = useState(specificationData);
    const changeSpecification = useCallback(() => {
        onChange?.(specification);
    }, [specification, onChange]);
    useEffect(() => {
        changeSpecification();
    }, [specification]);

    const units = [
        {value: "inches", display: "inches"},
        {value: "feet", display: "feet"},
        {value: "pounds", display: "pounds"},
    ];

    const styles = specificationStyles();
    return(
        <div className={styles.specification}>
            <TextField label={label} value={specification?.measurement} onChange={measurement => setSpecification({...specification, measurement})} />
            <DropdownMenu options={units} defaultOption={units.find(({value}) => value === specification?.unit)} label="unit" onChange={unit => setSpecification({...specification, unit})} />
        </div>
    );
}

export default function SpecificationsForm({specificationsData, onChange}) {
    const [specifications, setSpecifications] = useState(specificationsData?? {});
    const changeSpecifications = useCallback(() => {
        onChange?.(specifications);
    }, [specifications, onChange]);
    useEffect(() => {
        changeSpecifications();
    }, [specifications]);

    const styles = specificationStyles();
    return (
        <div className={styles.specifications}>
            <Label>Specifications</Label>
            <Specification label="Width" specificationData={specifications.width} onChange={width => setSpecifications({...specifications, width})} />
            <Specification label="Projecttion" specificationData={specifications.projection} onChange={projection => setSpecifications({...specifications, projection})} />
            <Specification label="Height" specificationData={specifications.height} onChange={height => setSpecifications({...specifications, height})} />
            <Specification label="Weight" specificationData={specifications.weight} onChange={weight => setSpecifications({...specifications, weight})} />
        </div>
    )
}