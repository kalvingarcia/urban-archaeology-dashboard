import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import {createUseStyles} from 'react-jss';
import {VariableSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {v4} from 'uuid';
import Icon from '../../components/common/icon';
import Modal from '../../components/common/modal';
import Button from '../../components/common/button';
import Search from '../../components/common/search';
import {Title, Label, Subheading} from '../../components/common/typography';
import {useDatabase} from '../../components/layout';
import {combine} from '../../components/common/helpers/styles';
import Chip from '../../components/common/chip';

const useStyles = createUseStyles((theme) => ({
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
        gap: "500px",

        "& .refresh": {
            display: "flex",
            alignItems: "center",
            gap: "10px",

            "& .button": {
                top: "-5px"
            }
        },
        "& .actions": {
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            gap: "10px"
        }
    },
    table: {
        flex: "0 1 auto",
        height: "100%",
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
            justifyContent: "flex-end",
            gap: "10px"
        }
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        overflow: "hidden",

        "&.header": {
            borderBottom: `1pt solid ${theme.body + "7F"}`,
            "& *": {
                color: theme.onSecondary
            }
        },
        "&.odd": {
            backgroundColor: theme.surface
        },

        "& .productID": {
            width: "150px"
        },
        "& .productName": {
            flex: "1 0 auto"
        },
        "& .productCategory": {
            width: "250px"
        },
        "& .productVariations": {
            width: "150px"
        },
        "& .actions": {
            width: "200px"
        }
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
    },
    filters: {
        display: "flex",
        flexDirection: "column",
        width: "500px",
        height: "600px",
        padding: "20px",
        borderRadius: "16px",
        left: "calc((100% - 500px) / 2)",
        top: "calc((100% - 600px) / 2)",

        "& .filters": {
            flex: "0 1 auto",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            gap: "10px",
            overflowY: "auto"
        },
        "& .actions": {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px"
        }
    }
}));

export default function ProductList() {
    const {products, updateProducts, tags} = useDatabase();
    const navigate = useNavigate();

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const promptDelete = id => {
        setDeleteID(id);
        setDeleteOpen(true);
    }
    const deleteProduct = async () => {
        await window.api.DELETE_PRODUCT_BY_ID(deleteID);
        updateProducts();
        setDeleteOpen(false);
    }

    const styles = useStyles();

    const list = useRef();
    const heights = useRef(new Map());
    const getItemHeight = index => {
        return heights.current.get(index);
    }
    const setItemHeight = (index, element) => {
        heights.current.set(index, element?.offsetHeight);
        list.current?.resetAfterIndex(index);
    }

    function ProductEntry({index, style, data}) {
        const navigate = useNavigate();
        data = data[index];

        const row = useRef();
        useEffect(() => {
            if(row.current) setItemHeight(index, row.current);
        }, [row.current]);
        return (
            <div ref={row} className={combine(styles.row, index % 2? "odd" : "even")} style={style}>
                <Label className="productID">{data.id}</Label>
                <Label className="productName">{data.name}</Label>
                <Label className="productCategory">{data.category}</Label>
                <Label className="productVariations">{data.variationcount}</Label>
                <div className='actions'>
                    <Icon icon="visibility" button onPress={() => navigate(`/products/${data.id}`)}/>
                    <Icon icon="edit" role="secondary" button  onPress={() => navigate(`/products/${data.id}/edit`)}/>
                    <Icon icon="delete" button role="error" appearance="tonal" onPress={() => promptDelete(data.id)} />
                </div>
            </div>
        );
    }

    const [filteredProducts, setFilteredProducts] = useState(products);
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);
    
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({});
    const addFilter = (id, category) => {
        if(!filters[category]) filters[category] = [];
        setFilters({...filters, [`${category}`]: [...filters[category], id]});
    }
    const removeFilter = (id, category) => {
        const categoryFilters = filters[category].filter(filter => filter !== id);
        if(categoryFilters.length === 0) {
            delete filters[category];
            setFilters({...filters});
        } else
            setFilters({...filters,  [`${category}`]: categoryFilters});
    }

    const searchFiltered = async text => {
        if(text === "" && Object.entries(filters).length === 0)
            setFilteredProducts(products);
        else
            setFilteredProducts(await window.api.SEARCH_FILTERED_PRODUCTS(text, filters));
    }

    return (
        <section className={styles.productList}>
            <div className={styles.header}>
                <div className="refresh">
                    <Title>Products</Title>
                    <Icon className="button" icon="refresh" button appearance='text' onPress={updateProducts} />
                </div>
                <div className="actions">
                    <Search onSearch={searchFiltered} />
                    <Icon icon="manage_search" role="secondary" button appearance="tonal" onPress={() => setFilterOpen(true)} />
                    <Button icon={<Icon icon="add_circle" />} onPress={() => navigate("/products/create")}>Create</Button>
                </div>
            </div>
            <div className={combine(styles.row, "header")}>
                <Label className="productID">Product ID</Label>
                <Label className="productName">Product Name</Label>
                <Label className="productCategory">Product Category</Label>
                <Label className="productVariations">Variation Count</Label>
                <div className='actions' />
            </div>
            <div className={styles.table}>
                <AutoSizer disableWidth>
                    {({height}) => (
                        <VariableSizeList
                            ref={list}
                            width="100%"
                            height={height}
                            itemCount={filteredProducts.length}
                            itemSize={getItemHeight}
                            itemData={filteredProducts}
                        >
                            {ProductEntry}
                        </VariableSizeList>
                    )}
                </AutoSizer>
            </div>
            <Modal className={styles.prompt} open={deleteOpen} setOpen={setDeleteOpen}>
                <Subheading>Delete Product</Subheading>
                <Label>Are you sure you'd like to delete this product (this is irrevirsible)?</Label>
                <div className='actions'>
                    <Icon icon="cancel" button appearance="tonal" onPress={() => setDeleteOpen(false)} />
                    <Button icon={<Icon icon="delete_forever" />} role="error" onPress={deleteProduct}>Yes</Button>
                </div>
            </Modal>
            <Modal className={styles.filters} open={filterOpen} setOpen={setFilterOpen}>
                <Subheading>Filters</Subheading>
                <div className="filters">
                    {tags.map(({id, name, category}) => (
                        <Chip
                            key={v4()}
                            active={filters[category]?.includes(id)}
                            icon="sell"
                            label={name}
                            onPress={() => filters[category]?.includes(id)? removeFilter(id, category) : addFilter(id, category)}
                            leadingIcon 
                        />
                    ))}
                </div>
                <div className='actions'>
                    <Icon icon="remove" button appearance="tonal" onPress={() => setFilters({})} />
                    <Button icon={<Icon icon="filter_list" />} onPress={() => searchFiltered() && setFilterOpen(false)}>Apply</Button>
                </div>
            </Modal>
        </section>
    );
}