import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {v4} from 'uuid';
import FinishesForm from './finishes-form';
import TextField from '../../../components/common/text-field';
import TextArea from '../../../components/common/text-area';
import Switch from '../../../components/common/switch';
import TagForm from './tag-form';
import OverviewForm from './overview-form';

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
            },
        },
        "& .column2": {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",

            "& .filterables": {
                display: "flex",
                "& .switches": {
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }
            }
        }
    }
});

export default function VariationForm({variationData, onChange, errors}) {
    const [variation, setVariation] = useState(variationData?? {});
    const changeVariation = () => {
        onChange?.(variation);
    }
    useEffect(() => {
        if(!variation.id)
            setVariation({...variation, id: v4()});
        changeVariation();
    }, [variation]);
    
    const styles = variationFormStyles();
    return (
        <div className={styles.variationForm}>
            <div className="column1">
                <div className="nameID">
                    <TextField label="Variation Subname" placeholder="Opal" value={variation.subname}  onChange={subname => setVariation({...variation, subname})} />
                    <TextField label="Variation Extension" placeholder="O" value={variation.extension}  onChange={extension => setVariation({...variation, extension})} />
                </div>
                <TextArea label="Variation Description" value={variation.description} onChange={description => setVariation({...variation, description})} />
                <FinishesForm finishesData={variation.finishes} onChange={finishes => setVariation({...variation, finishes})} error={errors?.finishes} />
            </div>
            <div className="column2">
                <div className="filterables">
                    <div className="switches">
                        <Switch label="Featured" value={variation.featured} onChange={featured => setVariation({...variation, featured})} />
                        <Switch label="Display" value={variation.display} onChange={display => setVariation({...variation, display})} />
                    </div>
                    <TagForm tagData={variation.tags} onChange={tags => setVariation({...variation, tags})} error={errors?.tags} />
                </div>
                <OverviewForm overviewData={variation.overview} onChange={overview => setVariation({...variation, overview})} />
            </div>
        </div>
    );
}