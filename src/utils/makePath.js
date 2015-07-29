export default function makePath(path, value) {
    const fragments = path.split('.');
    const obj = {};
    let tmp = obj;

    for (let i = 0, l = fragments.length; i < l; i++) {
        const fragment = fragments[i];
        tmp[fragment] = i === l - 1 ? value : {};
        tmp = tmp[fragment];
    }

    return obj;
}
