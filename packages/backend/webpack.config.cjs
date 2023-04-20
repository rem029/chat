/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeWebExternals = require("webpack-node-externals");
const { dependencies } = require("./package.json");
const glob = require("glob");

module.exports = {
	entry: "./src/index.ts",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		symlinks: true,
		extensions: [".ts", ".js"],
		alias: {
			"@src": path.resolve(__dirname, "src/"),
			"@configs": path.resolve(__dirname, "src/configs"),
			"@controllers": path.resolve(__dirname, "src/controllers"),
			"@helpers": path.resolve(__dirname, "src/helpers"),
			"@middlewares": path.resolve(__dirname, "src/middlewares"),
			"@routes": path.resolve(__dirname, "src/routes"),
			"@services": path.resolve(__dirname, "src/services"),
			"@interfaces": path.resolve(__dirname, "src/interfaces"),
			"@utilities": path.resolve(__dirname, "src/utilities"),
			"@handlers": path.resolve(__dirname, "src/handlers"),
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
				},
			},
		],
	},
	optimization: {
		minimize: true,
	},
	target: "node",
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				...Object.keys(dependencies).map((dep) => {
					dep = dep.includes(".") ? dep + "/" : dep;
					const subDeps = glob.sync(`node_modules/${dep}/**/*`, {
						nodir: true,
						ignore: "**/node_modules/**",
					});
					return [
						{
							from: `../../node_modules/${dep}`,
							to: `./node_modules/${dep}`,
						},
						...subDeps.map((subDep) => ({
							from: `../../${subDep}`,
							to: `./${subDep}`,
						})),
					];
				}),
			].flat(),
		}),
	],
	externals: [
		nodeWebExternals({
			modulesFromFile: {
				include: ["dependencies"],
			},
			symlinks: true,
		}),
	],
	devtool: "source-map",
};
