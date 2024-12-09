import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {createUseStyles} from 'react-jss';
import Table, {Row} from './common/table';
import Button from './common/button';
import Icon from './common/icon';
import {Title, Label} from './common/typography';

const useStyles = createUseStyles({
    productList: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "20px"
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        "& .actions": {
            display: "flex",
            alignItems: "center",
            gap: "10px"
        }
    },
    table: {
        flex: "0 1 auto",
        height: "",
        width: "100%",
        overflow: "auto",
        "& .column-0:not(th), .column-2:not(th), .column-3:not(th)": {
            opacity: 0.5
        },
        "& .column-4": {
            maxWidth: "fit-content"
        },
        "& .actions": {
            width: "fit-content",
            display: "flex",
            gap: "10px"
        }
    }
});

function ProductEntry({data}) {
    const navigate = useNavigate();

    return (
        <Row>
            <Label>{data.id}</Label>
            <Label>{data.name}</Label>
            <Label>{data.category}</Label>
            <Label>{data.variationcount}</Label>
            <div className='actions'>
                <Icon icon="visibility" button onPress={() => navigate(`/products/${data.id}`)}/>
                <Icon icon="edit" role="secondary" button  onPress={() => navigate(`/products/${data.id}/edit`)}/>
                <Icon icon="delete" button  appearance="text" />
            </div>
        </Row>
    );
}

export default function ProductList() {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        (async () => {
            setProductList(await window.api.GET_ALL_PRODUCTS());
        })();
    }, []);

    const styles = useStyles();
    return (
        <section className={styles.productList}>
            <div className={styles.header}>
                <Title>Products</Title>
                <div className="actions">
                    {/* <Search /> */}
                    <Icon icon="manage_search" role="secondary" button appearance="tonal" />
                    <Button icon={<Icon icon="add_circle" />}>Create</Button>
                </div>
            </div>
            <div className={styles.table}>
                <Table headers={["ID", "Product Name", "Category", "Variation Count"]}>
                    {productList.map(product => (
                        <ProductEntry key={product.id} data={product} />
                    ))}
                </Table>
            </div>
        </section>
    );
}