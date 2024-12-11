import Database from "./common/database";

export async function GET_ALL_TAGS() {
    return await Database`
        SELECT CAST(id AS TEXT), * FROM tag; 
    `;
}