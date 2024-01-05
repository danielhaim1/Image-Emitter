const path = require("path"),
    isDevelopment = "development" === process.env.NODE_ENV,
    nodeExternals = require("webpack-node-externals"),
    TerserPlugin = require("terser-webpack-plugin");

module.exports = [{
    mode: "production",
    target: "web",
    entry: "./index.js",
    output: {
        filename: "imageEmitter.amd.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimize: !0,
        minimizer: [new TerserPlugin]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [["@babel/preset-env", {
                        targets: {
                            browsers: ["last 5 versions", "safari >= 7"]
                        },
                        modules: "amd"
                    },],]
                }
            }
        },]
    }
}, {
    mode: "production",
    target: "node",
    entry: "./index.js",
    output: {
        filename: "imageEmitter.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "commonjs2"
    },
    optimization: {
        minimize: !0,
        minimizer: [new TerserPlugin]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [["@babel/preset-env", {
                        targets: {
                            node: "10"
                        },
                        modules: "commonjs"
                    },],]
                }
            }
        },]
    },
    externals: [nodeExternals()]
},];