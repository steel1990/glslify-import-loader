# glslify-import-loader

A [webpack] loader for [glslify]
that adds an `import` directive to your shaders.

## Usage

### Configuration

Alternatively, you may apply these loaders automatically to all .glsl, .frag and .vert files by adding some additional configuration:

``` js
const webpack = require('webpack');

module.exports = {
    module: {
        rules: [{
            test: /\.(glsl|frag|vert)$/,
            exclude: /node_modules/,
            loader: 'glslify-import-loader'
        }, {
            test: /\.(glsl|frag|vert)$/,
            exclude: /node_modules/,
            loader: 'raw-loader'
        }, {
            test: /\.(glsl|frag|vert)$/,
            exclude: /node_modules/,
            loader: 'glslify-loader'
        }]
    }
}
```

### glsl code

Given a common shader(common.glsl):

``` glsl
varying vec3 color;
```

You can import `./common.glsl`:

``` glsl
#pragma glslify: import('./common.glsl')

void main() {
  gl_FragColor = vec4(color, 1.0);
}
```

### Result

``` js
/***/
/* 10 */
/***/ (function(module, exports) {
        module.exports = "varying vec3 color;\n"
/***/ }),
/* 11 */
/***/ (function(module, exports) {
        module.exports = "" + __webpack_require__(10) + "void main() {\n  \ngl_FragColor = vec4(color, 1.0);\n}"
/***/ }),
```

## See also

[glslify-import] will import all glsl to a single module, the result of above example will be:

``` js
/* 11 */
/***/ (function(module, exports) {
        module.exports = "varying vec3 color;\nvoid main() {\n  \ngl_FragColor = vec4(color, 1.0);\n}"
/***/ }),
```


[webpack]: https://webpack.github.io/
[glslify]: http://github.com/stackgl/glslify
[glslify-import]: https://www.npmjs.com/package/glslify-import