module.exports = function load(path) {
    return resolve => {
        require([`@/page${path}`], resolve);
    };
}