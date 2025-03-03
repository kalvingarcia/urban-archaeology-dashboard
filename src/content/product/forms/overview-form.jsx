import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Label, Subheading} from '../../../components/common/typography';
import DropdownMenu from '../../../components/common/dropdown-menu';
import TextArea from '../../../components/common/text-area';
import SpecificationsForm from './specification-form';
import BulbForm from './bulb-form';

const useStyles = createUseStyles((theme) => ({
    heading: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    type: {
        flex: "0 1 50%",
        position: "relative",
        top: "-10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",

        "& *": {
            fontSize: "14px"
        }
    },
    overviews: {
        width: "100%",
        height: "100%",
        padding: "20px",
        borderRadius: "16px",
        border: `1pt solid ${theme.body + "7F"}`,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: theme.surface + "7F"
    }
}));

export default function OverviewForm({overviewData, onChange}) {
    const [overview, setOverview] = useState(overviewData?? {});
    const changeOverview = () => {
        onChange?.(overview);
    }
    useEffect(() => {
        changeOverview();
    }, [overview]);

    const overviewTypes = [
        {value: "lighting", display: "Lighting"},
        {value: "mirror/cabinet", display: "Mirror & Cabinet"},
        {value: "bathroom", display: "Bathroom"},
        {value: "furnishing", display: "Furnishing"},
        {value: "display", display: "Display"},
        {value: "washstand", display: "Washstand"},
        {value: "hardware", display: "Hardware"}
    ];
    const ulClasses = [
        {value: "dry", display: "Dry Environments"},
        {value: "damp", display: "Damp Environments"},
        {value: "wet", display: "Wet Environments"},
        {value: "none", display: "Not Classified"}
    ]
    const styles = useStyles();
    return (
        <div>
            <div className={styles.heading}>
                <Subheading>Overview</Subheading>
                <div className={styles.type}>
                    <Label>Type</Label>
                    <DropdownMenu
                        label="type"
                        options={overviewTypes}
                        defaultOption={overviewTypes.find(({value}) => value === overview.type)}
                        onChange={type => {
                            if(overview.type !== type) setOverview({type});
                        }}
                    />
                </div>
            </div>
            {overview.type && 
                <div className={styles.overviews}>
                    {["lighting", "mirror/cabinet", "bathroom", "furnishing"].includes(overview.type) &&
                        <SpecificationsForm specificationsData={overview.specifications} onChange={specifications => setOverview({...overview, specifications})} />
                    }
                    {overview.type === "lighting" &&
                        <div>
                            <Label>UL Classification</Label>
                            <DropdownMenu label="ul" options={ulClasses} defaultOption={ulClasses.find(({value}) => value === overview.ul)} onChange={ul => setOverview({...overview, ul})} />
                        </div>
                    }
                    {overview.type === "lighting" &&
                        <BulbForm bulbsData={overview.bulbs} onChange={bulbs => setOverview({...overview, bulbs})}/>
                    }
                    {/* {overview.type === "washstand" &&
                        <div>
                            <Label>Options</Label>
                        </div>
                    } */}
                    <TextArea 
                        label="Notes" 
                        helperText="Any other information that is required for the item."
                        value={overview.notes}
                        onChange={notes => setOverview({...overview, notes})}
                    />
                </div>
            }
        </div>
    );
}