import React, {useState, useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import Search from './common/search';
import Chip from './common/chip';
import {Subheading} from './common/typography';
import {useDatabase} from './layout';

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
    const changeTags = () => {
        onChange?.(tags);
    }
    useEffect(() => {
        changeTags();
    }, [tags]);
    const {tags: allTags} = useDatabase();

    const addTag = tag => {
        if(!tags.find(({id}) => tag.id ===id))
            setTags([...tags, tag]);
    }
    const removeTag = id => {
        setTags(tags.filter(tag => tag.id !== id));
    }

    const styles = useStyles({error});
    return (
        <div className={styles.tagForm}>
            <div className={styles.heading}>
                <Subheading className={styles.label}>Tags*</Subheading>
                <Search 
                    label="Search"
                    options={allTags.map(({id, name}) => ({value: id, display: name}))}
                    onSelect={id => {
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