const mix = require("laravel-mix");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react("resources/js/app.js", "public/js");

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                exclude: [],
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            }
        ]
    },
    plugins: [new ExtractTextPlugin("[name].css")],
    devtool: "source-map"
});
