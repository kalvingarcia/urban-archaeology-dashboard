import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import {createUseStyles} from 'react-jss';
import Tabs, {Tab} from '../../components/common/tabs';
import Icon from '../../components/common/icon';
import {Title, Label, Body} from '../../components/common/typography';

const useStyles = createUseStyles((theme) => ({
    view: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",

        "& .label": {
            color: theme.onSecondary,
            display: "inline-block"
        }
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
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "10px"
    },
    tabs: {
        flex: "0 1 100%"
    },
    tab: {
        padding: "20px",
        overflowY: "auto"
    }
}));

export default function Product() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(undefined)
    useEffect(() => {
        (async () => {
            setProduct(await window.api.GET_PRODUCT_BY_ID(id));
        })();
    }, []);

    const styles = useStyles();
    return (product?
        <section className={styles.view}>
            <div className={styles.heading}>
                <div className="title">
                    <Icon icon="arrow_back" role="secondary" button onPress={() => navigate(-1)}/>
                    <Title>Product View</Title>
                </div>
                <div className="productInfo">
                    <div className="nameID">
                        <Body><Label className="label">Product Name:</Label> {product.name}</Body>
                        <Body><Label className="label">Product ID:</Label> {product.id}</Body>
                    </div>
                    <Body><Label className="label">Product Description:</Label> {product.description}</Body>
                </div>
            </div>
            <Tabs className={styles.tabs}>
                {product.variations.map(variation => (
                    <Tab className={styles.tab} name={variation.subname} button={<Icon icon="more_vert" button />}>
                        <div>
                            <div>
                                <Label>{variation.subname}</Label>
                                <Label>{variation.extension}</Label>
                            </div>
                            <Body>{variation.description}</Body>
                            <div>
                                {variation.finishes.map(finish => (
                                    <div>
                                        <Label>{finish.id}</Label>
                                        <Label>{finish.display}</Label>
                                        <Label>{finish.value}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div>
                                {variation.tags.map(tag => (
                                    <div>{tag.name}</div>
                                ))}
                            </div>
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </section>
        :
        undefined
    );
}