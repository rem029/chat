import { knexPostgres } from "@services/database";
import { UserInfo } from "@common";
import { logger } from "@utilities/logger";
import { ErrorServer } from "@interfaces/index";

const tableName = "common.users";

export const getUserMeInfo = async (body: { email: string }): Promise<UserInfo> => {
	const { email } = body;
	logger.info("@getUserMeInfo");

	const results = await knexPostgres.raw(
		`
			SELECT 
				*
			FROM 
				??
			WHERE
				email=?;`,
		[tableName, email]
	);

	if (!results.rows.length) throw new ErrorServer(400, "No user found");

	const response = { ...results.rows[0] } as UserInfo;
	return response;
};

export const getUserInfo = async (): Promise<UserInfo[]> => {
	logger.info("@getUserInfo");

	const results = await knexPostgres.raw(
		`
			SELECT 
				*
			FROM 
				??
			ORDER BY
				created_at DESC`,
		[tableName]
	);

	const response = results.rows as UserInfo[];
	return response;
};

export const createUser = async (email: string, password: string): Promise<UserInfo> => {
	logger.info("@createUser");

	const results = await knexPostgres.raw(
		`
			INSERT INTO ??(email, password, created_at, updated_at)
			VALUES (?, ?, NOW(), NOW())
			RETURNING *;
		`,
		[tableName, email, password]
	);

	const response = results.rows[0] as UserInfo;
	return response;
};

export const checkUserName = async (email: string): Promise<boolean> => {
	logger.info("@checkUserName");

	const results = await knexPostgres.raw(
		`
			SELECT id FROM ??
			WHERE email = ?;
		`,
		[tableName, email]
	);

	return results.rows.length > 0;
};
