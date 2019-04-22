export const generateId = (function(n: number) {
    return function() {
        return `id-${++n}`;
    };
})(0);
