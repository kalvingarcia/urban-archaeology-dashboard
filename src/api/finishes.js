import Database from "./common/database";

export async function GET_ALL_FINISHES() {
    return await Database`
        SELECT * FROM finish;
    `;
}