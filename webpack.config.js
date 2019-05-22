const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // We only need to use Webpack for things in the src directory
    context: __dirname + "/themes/2019/src",

    // These are our two entry files to be seperately bundled
    entry: {
        style: "./styles/style.scss",
        main: "./scripts/index.js"
    },

    // We will output to the static directory
    output: {
        path: __dirname + "/themes/2019/static/dist",
    },

    // The following rules specify our loaders
    module: {
        rules: [
            {
                /*
                    This rule is for transpiling our Javascript with Babel,
                    preset-react deals with ES6 and JSX. As we are using Preact
                    for those performance gains, we need to specify the
                    JSX pragma as h()
                */
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"],
                        plugins: [
                            ["babel-plugin-transform-react-jsx", {
                                pragma: "preact.h"
                            }]
                        ]
                    }
                }
            },
            {
                /*
                    This rule deals with turning our SASS into CSS.
                */
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                // Anything else
                test: /\.(eot|svg|ttf|woff2?)([A-z0-9-_\#\?\s]*)$/,
                exclude: /node_modules/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[path][name].[ext]",
                        fallback: "file-loader",
                        limit: 10000
                    }
                }
            }
        ]
    },
    plugins: [
        /*
            We must specify the filename option for the CSS extraction plugin,
            otherwise we'll get a weird hash name
        */
        new MiniCSSExtractPlugin({
            filename: "[name].css"
        })
    ]
}
