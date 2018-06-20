var path = require("path");
var webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const VendorDeps = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/main.js",
        vendor: Object.keys(VendorDeps.dependencies)
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: process.env.PUBLIC_PATH || "/",
        filename: process.env.NODE_ENV === "production" ? "js/[name].[chunkhash:6].js" : "js/[name].js"
    },

    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "assets/[name].[hash:6].[ext]"
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ name: "vendor" }),
        new webpack.optimize.CommonsChunkPlugin({ name: "manifest" }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, "dist/index.html"),
            template: path.resolve(__dirname, "index_template.html"),
            favicon: "src/assets/favicon.ico"
        }),
    ],

    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        },
        extensions: ["*", ".js", ".vue", ".json"]
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },

    performance: {
        hints: false
    },

    devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
    module.exports.devtool = "#source-map";
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
