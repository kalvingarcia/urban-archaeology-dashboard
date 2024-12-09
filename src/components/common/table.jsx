import React, {Children} from 'react';
import {createUseStyles} from 'react-jss';
import { combine } from './helpers/styles';

const rowStyles = createUseStyles({
    row: {
        position: "relative"
    }
});

export function Row({className, children}) {
    const styles = rowStyles();
    return (
        <tr className={combine(styles.row, className)}>
            {Children.map(children, (child, index) => (
                <td key={`column-${index}`} className={combine("column", `column-${index}`)}>
                    {child}
                </td>
            ))}
        </tr>
    );
}

const tableStyles = createUseStyles((theme) => ({
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
        "& .column": {
            verticalAlign: "top",
            padding: 10
        },
        "& tr": {
            borderBottom: `1pt solid ${theme.onPrimary + "33"}`
        },
        "& tbody :last-child": {
            borderBottom: "none"
        }
    },
    header: {
        fontWeight: "bold",
        color: theme.onSecondary,
        position: "relative",
        zIndex: 10,
        "& th": {
            backdropFilter: "blur(8px)"
        }
    },
    body: {
    }
}));

export default function Table({className, headers, children}) {
    const styles = tableStyles();
    return (
        <table className={combine(styles.table, className)}>
            {headers?
                <thead className={styles.header}>
                    <tr>
                        {headers.map((name, index) => (
                            <th key={`column-${index}`} className={combine("column", `column-${index}`)}>
                                {name}
                            </th>
                        ))}
                    </tr>
                </thead>
                :
                undefined
            }
            <tbody className={styles.body}>
                {children}
            </tbody>
        </table>
    );
}