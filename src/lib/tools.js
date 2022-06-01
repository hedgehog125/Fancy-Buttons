export const applyClasses = (names, values) => {
    let classes = "";
    for (let i in names) {
        if (values[i]) {
            if (classes.length != 0) classes += " ";
            classes += names[i];
        }
    }
    return classes;
};