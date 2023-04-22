/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const { ProgressPlugin } = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
	entry: "./src/index.ts",
	target: "node",
	externalsPresets: { node: true },
	externals: [nodeExternals()],
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								[
									"@babel/preset-env",
									{
										targets: {
											node: "current",
										},
									},
								],
							],
						},
					},
					"ts-loader",
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
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
			"@common": path.resolve(__dirname, "../common/src"),
		},
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	optimization: {
		minimize: true,
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "nginx", to: "nginx" },
				{ from: "deploy-backend.sh", to: "deploy-backend.sh" },
				{ from: ".env", to: ".env", toType: "file" },
				{ from: "migrations", to: "migrations" },
				{ from: "knexfile.js", to: "knexfile.js" },
				{ from: "package.json", to: "package.json" },
				{ from: "CHANGELOG.md", to: "CHANGELOG.md" },
				{ from: "README.md", to: "README.md" },
			],
		}),
		new ProgressPlugin(),
		new Dotenv(),
		new WebpackShellPluginNext({
			onBuildEnd: {
				scripts: [
					'echo "Webpack has finished building!"',
					'echo "Installing packages"',
					"cd " + path.resolve(__dirname, "dist") + " && yarn install --production",
					'echo "Installing packages done."',
					"cd ..",
				],
				parallel: false,
				blocking: true,
			},
		}),
	],
};
