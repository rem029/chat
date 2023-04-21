/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* extenals: [{ knex: "commonjs knex" },nodeExternals({
			modulesFromFile: {
				include: ["dependencies"],
			},
		}),]  */

// const { exec } = require("child_process");
// plugins: [
// 	...prevPlugins,
// 	function () {
// 		this.hooks.done.tap("AfterBuildPlugin", function () {
// 			console.log("Running yarn install...");
// 			exec("cd dist && yarn install", function (err, stdout, stderr) {
// 				if (err) {
// 					console.error(`exec error: ${err}`);
// 					return;
// 				}
// 				console.log(`stdout: ${stdout}`);
// 				console.error(`stderr: ${stderr}`);
// 			});
// 		});
// 	},
// ];

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
const { dependencies } = require("./package.json");

module.exports = {
	entry: "./src/index.ts",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		symlinks: false,
		extensions: [".ts", ".js"],
		modules: [path.resolve(__dirname, "dist/node_modules"), "node_modules"],
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
			"@common": ["../common/src"],
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
		new CopyPlugin({
			patterns: [
				{ from: "node_modules", to: "node_modules" },
				{ from: "migrations", to: "migrations" },
				{ from: "knexfile.js", to: "knexfile.js" },
				{ from: "CHANGELOG.md", to: "CHANGELOG.md" },
				{ from: "README.md", to: "README.md" },
				{ from: "package.json", to: "package.json" },
				{ from: "yarn.lock", to: "yarn.lock", noErrorOnMissing: true },
			],
		}),
		// ...[...Object.keys(dependencies)].map((dependency) => {
		// 	dependency = dependency.includes(".") ? dependency + "/" : dependency;
		// 	const sourcePath = path.resolve(__dirname, "node_modules");
		// 	console.log("copying dependency", dependency, "from ", sourcePath);
		// 	return new CopyPlugin({
		// 		patterns: [{ from: `${sourcePath}/${dependency}`, to: `node_modules/${dependency}`, context: "node_modules" }],
		// 	});
		// }),
	],
	externals: [
		nodeExternals({
			modulesFromFile: {
				modulesDir: path.resolve(__dirname, "dist/node_modules"),
				include: ["dependencies"],
			},
			allowlist: ["express-async-errors", "express"],
		}),
	],
	devtool: "source-map",
};
