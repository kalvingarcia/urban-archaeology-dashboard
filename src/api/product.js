import Database from "./common/database";

export async function GET_ALL_PRODUCTS(search = "", filters = {}) {
    return await Database`
        ${search != "" ?
            Database`
                WITH search_filtered AS (
                    SELECT DISTINCT product.id AS id, variation.extension AS extension
                    FROM product INNER JOIN variation ON product.id = variation.productID
                    WHERE product.index @@ to_tsquery(${search + ':*'}) OR variation.index @@ to_tsquery(${search + ':*'})
                ),
            `
            :
            Database``
        }
        ${Object.entries(filters).length !== 0?
            Database`
                ${search === ""? Database`WITH` : Database``} tag_filtered AS (
                    ${Database.unsafe(Object.entries(filters).map(([_, value]) => (`
                        SELECT DISTINCT variation.productID AS id, variation.extension AS extension
                        FROM variation INNER JOIN variation_tag ON variation.id = variation_tag.variationID
                        WHERE variation_tag.tagID = ANY ARRAY[${value.map(id => `${id}`).join(",")}]
                    `)).join(" INTERSECT "))}
                ),
            `
            :
            Database``
        }
        ${search === "" && Object.entries(filters).length === 0? Database`WITH` : Database``} categories AS (
            SELECT DISTINCT variation.productID AS id, variation.extension AS extension, tag.name AS category
            FROM variation INNER JOIN variation_tag ON variation_tag.variationID = variation.id
                INNER JOIN tag ON variation_tag.tagID = tag.id
            WHERE tag.category = 'Class'
        )
        SELECT product.id AS id, name, category, COUNT(DISTINCT variation.extension) AS variationCount
        FROM product INNER JOIN variation ON variation.productID = product.id
            INNER JOIN categories ON product.id = categories.id AND variation.extension = categories.extension
            ${search !== ""? Database`INNER JOIN search_filtered ON search_filtered.id = product.id AND search_filtered.extension = variation.extension` : Database``}
            ${Object.entries(filters).length !== 0? Database`INNER JOIN tag_filtered ON tag_filtered.id = product.id AND tag_filtered.extension = variation.extension` : Database``}
        WHERE variation.display = TRUE
        GROUP BY product.id, name, category
    `
}

export async function GET_PRODUCT_BY_ID(id) {
    return (await Database`
        WITH variations AS (
            SELECT id, extension, subname, description, display, featured, (
                SELECT COALESCE(json_agg(json_build_object(
                    'id', finish.code,
                    'display', finish.name,
                    'value', variation_finish.price
                )), '[]') FROM finish INNER JOIN variation_finish ON variation_finish.finishCode = finish.code
                WHERE variation_finish.variationID = variation.id
            ) AS finishes, overview, (
                SELECT COALESCE(json_agg(json_build_object(
                    'id', CAST(tag.id AS TEXT),
                    'name', tag.name,
                    'category', tag.category
                )), '[]') FROM tag INNER JOIN variation_tag ON variation_tag.tagID = tag.id
                WHERE variation_tag.variationID = variation.id
            ) AS tags
            FROM variation WHERE variation.productID = ${id} AND variation.display = TRUE
        )
        SELECT id, name, description, (
            SELECT COALESCE(json_agg(json_build_object(
                'id', CAST(variations.id AS TEXT),
                'extension', variations.extension,
                'subname', variations.subname,
                'description', variations.description,
                'display', variations.display,
                'featured', variations.featured,
                'finishes', variations.finishes,
                'overview', variations.overview,
                'tags', variations.tags
            )), '[]') FROM variations
        ) AS variations
        FROM product WHERE product.id = ${id};
    `)[0]
}