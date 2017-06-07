module.exports = function (source, other) {
    this.cacheable();

    var reg = /#pragma glslify:\s*import\(['"]([^\)]+)['"]\);?/ig;
    source = source.replace(reg, ($, name) => {
        this.addDependency(name);
        return `" + require('${name}') + "`;
    });

    this.callback(null, source, other);
}