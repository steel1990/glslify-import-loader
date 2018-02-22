module.exports = function (source, other) {
    this.cacheable();

    var reg = /#pragma glslify:\s*import\(('|"|\\")([^\)]+)(\1)\);?/ig;
    source = source.replace(reg, ($, quote, name) => {
        this.addDependency(name);
        return `" + require('${name}') + "`;
    });

    this.callback(null, source, other);
}