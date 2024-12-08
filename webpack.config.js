const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const devMode = process.env.NODE_ENV === "dev";
const prodTestMode = process.env.NODE_ENV === "prod-test";

const publicDir = path.join(__dirname, "./public");
const distDir = path.join(__dirname, "./dist");

const commonConfig = {
    entry: {
        vaultik: "./src/widget/root.js", // Vaultik.js
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
            },
            {
                test: /\.(woff2?|jpe?g|png|gif|ico|svg|webp)$/,
                use: "file-loader?name=./assets/images/[name].[ext]",
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, "./src"), "node_modules"],
        extensions: [".js", ".jsx", ".json", ".css"],
        roots: [__dirname, path.resolve(__dirname, "./src")],
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@utils": path.resolve(__dirname, "./src/utils"),
        },
    },
};

const devConfig = {
    mode: "development",
    output: {
        path: distDir, // output folder
        publicPath: "/",
        filename: "[name].js",
        library: "vaultik",
        libraryTarget: "window",
        libraryExport: "default",
        asyncChunks: true,
    },
    devServer: {
        static: {
            directory: publicDir,
        },
        open: true, // open browser after serve is started
        compress: true,
        port: 4000,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "public/index.html", // base html
            scriptLoading: "blocking", // remove defer attribute from script
        }),
        new Dotenv(),
    ],
    devtool: "inline-source-map",
};

const prodConfig = {
    mode: "production",
    output: {
        path: distDir, // output folder
        filename: "[name].js",
        library: "vaultik",
        libraryTarget: "window",
        libraryExport: "default",
        asyncChunks: true,
        scriptType: "text/javascript",
        /* test to build production */
        ...(prodTestMode ? { publicPath: "./" } : {}),
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new Dotenv(),
        /* test to build production */
        ...(prodTestMode
            ? [
                new CopyPlugin({
                    patterns: [
                        {
                            from: "public/brand",
                            to: "brand",
                        },
                    ],
                }),
                new HtmlWebpackPlugin({
                    template: "public/index.html", // base html
                    scriptLoading: "blocking", // remove defer attribute from script
                }),
            ]
            : []),
    ],
    // https://webpack.js.org/configuration/optimization/
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    sourceMap: true,
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};

module.exports = {
    ...commonConfig,
    ...(devMode ? devConfig : prodConfig),
};
