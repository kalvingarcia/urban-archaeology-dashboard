import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {v4} from 'uuid';
import Icon from '../../../components/common/icon';
import TextField from '../../../components/common/text-field';
import Typeahead from '../../../components/common/typeahead';
import {Subheading} from '../../../components/common/typography';
import {useDatabase} from '../../../components/layout';

const finishStyles = createUseStyles({
    finish: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
    }
})

function Finish({finishData, onChange, removeSelf}) {
    const [finish, setFinish] = useState(finishData?? {});
    const changeFinish = () => {
        onChange?.(finish);
    }
    useEffect(() => {
        changeFinish();
    }, [finish]);
    const {finishes} = useDatabase();

    const styles = finishStyles();
    return (
        <div className={styles.finish}>
            <Typeahead 
                label="Finish"
                options={finishes.map(({code, name}) => ({value: code, display: name}))}
                defaultOption={finish}
                onChange={id => {
                    const display = finishes.find(({code}) => code === id).name;
                    setFinish({...finish, id, display});
                }} 
            />
            <TextField label="Finish Price" value={finish?.value} onChange={value => setFinish({...finish, value})} />
            <Icon icon="close" button appearance='text' onPress={() => removeSelf(finish.id)} />
        </div>
    );
}

const finishesFormStyles = createUseStyles((theme) => ({
    finishesForm: {
        width: "100%",
        height: "fit-content"
    },
    heading: {
        display: "flex",
        alignItems: "center",
        gap: "20px",

        
        "& .subtitle": {
            color: ({error}) => error? theme.onError : theme.onPrimary
        },
        "& .add": {
            top: "-12px"
        }
    },
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    }
}));

export default function FinishesForm({finishesData, onChange, error = false}) {
    const [finishes, setFinishes] = useState(finishesData?? []);
    const changeFinishes = () => {
        onChange?.(finishes);
    }
    useEffect(() => {
        changeFinishes();
    }, [finishes]);

    const handleFinishChange = (finish, position) => {
        finishes[position] = finish;
        setFinishes([...finishes]);
    }

    const addFinish = () => {
        setFinishes([...finishes, {}]);
    }
    const removeFinish = id => {
        setFinishes(finishes.filter(finish => finish.id !== id));
    }
    const styles = finishesFormStyles({error});
    return (
        <div className={styles.finishesForm}>
            <div className={styles.heading}>
                <Subheading className="subtitle">Finishes*</Subheading>
                <Icon className="add" icon="add" button role={error? "error" : "primary"} onPress={addFinish} />
            </div>
            <div className={styles.container}>
                {finishes.map((finish, index) => (
                    <Finish key={finish.id?? index} finishData={finish} onChange={finish => handleFinishChange(finish, index)} removeSelf={removeFinish} />
                ))}
            </div>
        </div>
    );
}