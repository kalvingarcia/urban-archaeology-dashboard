import React, {useCallback, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import TextField from './common/text-field';
import TextArea from './common/text-area';
import FinishesForm from './finishes-form';

const variationFormStyles = createUseStyles({
    variationForm: {
        height: "fit-content",
        padding: "20px",
        display: "flex",
        gap: "10px",

        "& .column1": {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",

            "& .nameID": {
                flex: "0 1 auto",
                display: "flex",
                gap: "10px",
                alignItems: "center",

                "& > *": {
                    flex: "1 1 auto"
                }
            }
        },
        "& .column2": {
            width: "100%"
        }
    }
});

export default function VariationForm({variationData, onChange}) {
    const [variation, setVariation] = useState(variationData);
    useEffect(() => {
        onChange(variation);
    }, [variation]);
    
    const styles = variationFormStyles();
    return (
        <div className={styles.variationForm}>
            <div className="column1">
                <div className="nameID">
                    <TextField label="Variation Subname" placeholder="Opal" value={variation.subname}  onChange={subname => setVariation({...variation, subname})} />
                    <TextField label="Variation Extension" placeholder="O" value={variation.extension}  onChange={extension => setVariation({...variation, extension})} />
                </div>
                <TextArea label="Variation Description" value={variation.description} />
                <FinishesForm finishesData={variation.finishes} onChange={finishes => setVariation({...variation, finishes})} />
            </div>
            <div className="column2">
                <div>
                    {/* <Switch />
                    <Switch /> */}
                </div>
                <div>
                    {variation.tags.map(tag => (
                        <div key={tag.id}>{tag.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}