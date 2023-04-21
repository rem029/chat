/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

require("dotenv/config");

const DEFAULT_DB_PORT = Number(process.env.DB_PORT) || 5433;
const DEFAULT_CONNECTION_CONFIG = {
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "",
	password: process.env.DB_PW || "",
	database: process.env.DB_DB || "",
	debug: true,
};

const DEFAULT_KNEX_LOGGER = {
	warn(message) {
		console.log(message);
	},
	error(message) {
		console.log(message);
	},
	debug(message) {
		console.log(message);
	},
};

const DEFAULT_KNEX_CONFIG = {
	client: "pg",
	connection: { ...DEFAULT_CONNECTION_CONFIG, timezone: "utc", port: DEFAULT_DB_PORT },
	debug: true,
	log: DEFAULT_KNEX_LOGGER,
	pool: {
		// afterCreate: (conn, done) => {
		// 	conn.query("SET timezone='UTC';", (err) => {
		// 		if (err) {
		// 			// first query failed, return error and don't try to make next query
		// 			done(err, conn);
		// 		} else {
		// 			// do the second query...
		// 		}
		// 	});
		// },
		min: 2,
		max: 6,
		createTimeoutMillis: 3000,
		acquireTimeoutMillis: 30000,
		idleTimeoutMillis: 30000,
		reapIntervalMillis: 1000,
		createRetryIntervalMillis: 100,
		propagateCreateError: true, // <- default is true, set to false
	},
};

const config = {
	development: {
		...DEFAULT_KNEX_CONFIG,
		migrations: { directory: ["./migrations/common"], tableName: "knex_migrations", schemaName: "common" },
	},

	staging: {
		...DEFAULT_KNEX_CONFIG,
		migrations: { directory: ["./migrations/common"], tableName: "knex_migrations", schemaName: "common" },
	},

	production: {
		...DEFAULT_KNEX_CONFIG,
		migrations: { directory: ["./migrations/common"], tableName: "knex_migrations", schemaName: "common" },
	},
};

module.exports = config;
