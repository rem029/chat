import { knexPostgres } from "@services/database";
import { UserInfo } from "@common";
import { logger } from "@utilities/logger";
import { ErrorServer } from "@interfaces/index";

const tableName = "common.users";

export const getUserMeInfoController = async (body: { email: string }): Promise<UserInfo> => {
	const { email } = body;
	logger.info("@getUserInfoController");

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

export const getUserInfoController = async (): Promise<UserInfo[]> => {
	logger.info("@getUserInfoController");

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

export const addUserController = async (email: string, password: string): Promise<UserInfo> => {
	logger.info("@addUserController");

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
