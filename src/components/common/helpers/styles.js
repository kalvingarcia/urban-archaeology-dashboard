export function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

export function combine(...strings) {
    return strings.filter((string) => string && string !== "").join(" ");
}