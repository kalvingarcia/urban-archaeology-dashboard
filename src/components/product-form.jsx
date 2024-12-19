import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import {createUseStyles} from 'react-jss';
import Tabs, {Tab} from './common/tabs';
import Button from './common/button';
import Icon from './common/icon';
import {Title, Subheading, Label} from './common/typography';
import TextField from './common/text-field';
import TextArea from './common/text-area';
import VariationForm from './variation-form';
import Modal from './common/modal';
import {useDatabase}  from './layout';

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
        backgroundColor: "transparent",
        zIndex: 2
    },
    tabs: {
        flex: "0 1 100%"
    },
    tab: {
        width: "100%",
        height: "100%",
        overflowY: "auto"
    },
    prompt: {
        width: "500px",
        height: "250px",
        padding: "20px",
        borderRadius: "16px",
        left: "calc((100% - 500px) / 2)",
        top: "calc((100% - 250px) / 2)",

        "& .actions": {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px"
        }
    }
}));

export default function ProductForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {updateProducts} = useDatabase();

    const [product, setProduct] = useState({})
    useEffect(() => {
        (async () => {
            if(id) setProduct(await window.api.GET_PRODUCT_BY_ID(id));
        })();
    }, [id]);

    const addVariationForm = () => {
        if(!product.variations) product.variations = [];
        setProduct({...product, variations: [...product.variations, {}]});
    }
    const removeVariationForm = position => {
        const variations = product.variations.filter((_, index) => index !== position);
        setProduct({...product, variations});
    }

    const handleVariationForm = (variation, position) => {
        const variations = product.variations;
        variations[position] = variation;
        setProduct({...product, variations});
    }
    
    const [errors, setErrors] = useState({});
    const saveProduct = async (quit = false) => {
        if(id) {
            console.log(`Saving Product to ID: ${id} with data ${product.id}`);
            const {id: newID, name, variations} = product;
            const errors = {
                id: newID? false : true,
                name: name? false : true,
                variations: []
            }
            variations?.forEach(({finishes, tags}) => {
                errors.variations.push({
                    finishes: finishes?.length > 0? false : true,
                    tags: tags?.length > 0 && tags?.some(({category}) => category === "Class")? false : true
                });
            });
            const errors_variations = errors.variations.length > 0? errors.variations.reduce((error, {finishes, tags}) => error || finishes || tags, false) : true;

            if(!(errors.id || errors.name || errors_variations)) {
                await window.api.UPDATE_PRODUCT_BY_ID(id, product);
                setErrors({});

                console.log(quit)
                if(quit)
                    navigate("/products");

                updateProducts();
            } else
                setErrors(errors);
        } else {
            console.log(`Creating Product on ID: ${product.id}`);
            const {id, name, variations} = product;
            const errors = {
                id: id? false : true,
                name: name? false : true,
                variations: []
            }
            variations?.forEach(({finishes, tags}) => {
                errors.variations.push({
                    finishes: finishes?.length > 0? false : true,
                    tags: tags?.length > 0 && tags?.some(({category}) => category === "Class")? false : true
                });
            });
            const errors_variations = errors.variations.length > 0? errors.variations.reduce((error, {finishes, tags}) => error || finishes || tags, false) : true;

            if(!(errors.id || errors.name || errors_variations)) {
                await window.api.CREATE_NEW_PRODUCT(product);
                setErrors({});

                if(quit)
                    navigate("/products");

                updateProducts();
            } else {
                setErrors(errors);
            }
        }
    }

    const [open, setOpen] = useState(false);
    const deleteProduct = async () => {
        await window.api.DELETE_PRODUCT_BY_ID(id);
        setOpen(false);
        updateProducts();
        navigate("/products");
    }

    const styles = productFormStyles();
    return (
        <section className={styles.view}>
            <div className={styles.heading}>
                <div className="title">
                    <Icon icon="arrow_back" role="secondary" button onPress={() => navigate(-1)}/>
                    <Title>Product View</Title>
                </div>
                <div className="productInfo">
                    <div className="nameID">
                        <TextField label="Product Name" required placeholder="Loft Light" value={product.name} onChange={name => setProduct({...product, name})} error={errors.name} />
                        <TextField label="Product ID" required placeholder="UA0034-IS" value={product.id} onChange={id => setProduct({...product, id})} error={errors.id} />
                    </div>
                    <TextArea label="Product Description" value={product.description} onChange={description => setProduct({...product, description})} />
                </div>
            </div>
            <Tabs className={styles.tabs} add={addVariationForm}>
                {product.variations?.map((variation, index) => (
                    <Tab key={variation.id?? index} className={styles.tab} name={variation.subname && variation.subname !== ""? variation.subname : "Default"} button={<Icon icon="close" button onPress={() => removeVariationForm(index)} />}>
                        <VariationForm variationData={variation} onChange={variation => handleVariationForm(variation, index)} errors={errors.variations?.[index]} />
                    </Tab>
                ))}
            </Tabs>
            <div className={styles.actions}>
                {id && <Icon icon="delete" button role="error" appearance='tonal' onPress={() => setOpen(true)} />}
                <Icon icon="save" button role="secondary" appearance="tonal" onPress={() => saveProduct()} />
                <Button icon={<Icon icon="send" />} onPress={() => saveProduct(true)}>Complete</Button>
            </div>
            <Modal className={styles.prompt} open={open} setOpen={setOpen}>
                <Subheading>Delete Product</Subheading>
                <Label>Are you sure you'd like to delete this product (this is irrevirsible)?</Label>
                <div className='actions'>
                    <Icon icon="cancel" button appearance="tonal" onPress={() => setOpen(false)} />
                    <Button icon={<Icon icon="delete" />} role="error" onPress={deleteProduct}>Yes</Button>
                </div>
            </Modal>
        </section>
    );
}