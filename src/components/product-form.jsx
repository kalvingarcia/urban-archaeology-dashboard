import React, {useCallback, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import {createUseStyles} from 'react-jss';
import Tabs, {Tab} from './common/tabs';
import Button from './common/button';
import Icon from './common/icon';
import {Title, Label, Body} from './common/typography';
import TextField from './common/text-field';
import TextArea from './common/text-area';
import VariationForm from './variation-form';

const productFormStyles = createUseStyles((theme) => ({
    view: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%"
    },
    heading: {
        padding: "20px",

        "& .title": {
            display: "flex",
            gap: "10px",
            alignItems: "center",

            "& :first-child": {
                top: "-5px"
            }
        },
        "& .productInfo": {
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
        }
    },
    actions: {
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "10px",
        backgroundColor: "transparent"
    },
    tabs: {
        flex: "0 1 100%"
    },
    tab: {
        width: "100%",
        height: "100%",
        overflowY: "auto"
    }
}));

export default function ProductForm() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(undefined)
    useEffect(() => {
        (async () => {
            if(id) setProduct(await window.api.GET_PRODUCT_BY_ID(id));
        })();
    }, []);

    const addVariationForm = useCallback(() => {

    }, [product]);
    const handleVariationForm = useCallback(variation => {
        const variations = product.variations;
        const position = variations.findIndex(({id}) => id === variation.id);
        variations[position] = variation;

        setProduct({...product, variations});
    }, [product]);

    const styles = productFormStyles();
    return (product?
        <section className={styles.view}>
            <div className={styles.heading}>
                <div className="title">
                    <Icon icon="arrow_back" role="secondary" button onPress={() => navigate(-1)}/>
                    <Title>Product View</Title>
                </div>
                <div className="productInfo">
                    <div className="nameID">
                        <TextField label="Product Name" placeholder="Loft Light" value={product.name} onChange={name => setProduct({...product, name})}/>
                        <TextField label="Product ID" placeholder="UA0034-IS" value={product.id} />
                    </div>
                    <TextArea label="Product Description" value={product.description} />
                </div>
            </div>
            <Tabs className={styles.tabs}>
                {product.variations.map(variation => (
                    <Tab key={variation.id} className={styles.tab} name={variation.subname} button={<Icon icon="close" button />}>
                        <VariationForm variationData={variation} onChange={handleVariationForm} />
                    </Tab>
                ))}
            </Tabs>
            <div className={styles.actions}>
                <Icon icon="delete" button role="secondary" appearance='tonal' />
                <Button icon={<Icon icon="save" />}>Save</Button>
            </div>
        </section>
        :
        undefined
    );
}