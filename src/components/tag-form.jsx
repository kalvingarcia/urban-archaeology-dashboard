import React, {useState, useEffect, useCallback} from 'react';
import {createUseStyles} from 'react-jss';
import Typeahead from './common/typeahead';
import Chip from './common/chip';
import {Subheading} from './common/typography';
import {useTags} from './hooks/api-cache';

const useStyles = createUseStyles((theme) => ({
    tagForm: {
        width: "100%",
        height: "fit-content",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        borderRadius: "16px",
        backgroundColor: ({error}) => error? theme.onError + "5F" : theme.onPrimary + "1F"
    },
    label: {
        marginBottom: "10px",
        color: ({error}) => error? theme.onError : theme.onPrimary
    },
    tagList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px"
    }
}));

export default function TagForm({tagData, onChange, error = false}) {
    const [tags, setTags] = useState(tagData?? []);
    const changeTags = useCallback(() => {
        onChange?.(tags);
    }, [tags, onChange]);
    useEffect(() => {
        changeTags();
    }, [tags]);
    const {tags: allTags} = useTags();

    const addTag = useCallback(tag => {
        if(!tags.find(({id}) => tag.id ===id))
            setTags([...tags, tag]);
    }, [tags]);
    const removeTag = useCallback(id => {
        setTags(tags.filter(tag => tag.id !== id));
    }, [tags]);

    console.log(error);

    const styles = useStyles({error});
    return (
        <div className={styles.tagForm}>
            <div className={styles.heading}>
                <Subheading className={styles.label}>Tags*</Subheading>
                <Typeahead 
                    label="Search"
                    options={allTags.map(({id, name}) => ({value: id, display: name}))}
                    onChange={id => {
                        const {name, category} = allTags.find(tag => tag.id === id);
                        addTag({id, name, category});
                    }}
                />
            </div>
            <div className={styles.tagList}>
                {tags.map(tag => (
                    <Chip key={tag.id} label={tag.name} icon="close" onPress={() => removeTag(tag.id)} />
                ))}
            </div>
        </div>
    )
}