import { Button } from "components/ui/button";
import { TextField } from "components/ui/textfield";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authUserAsync, getUserState } from "slice/userSlice";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { LinkRouter } from "components/ui/linkRouter";
import { faker } from "@faker-js/faker";
import { checkUserName, createUser } from "api/user";
import { useAsyncWrapper } from "hooks/useAsyncWrapper";
import { useDebounce } from "hooks/useDebounce";
import { Logo } from "components/ui/logo";

export const CreateUser = (): JSX.Element => {
	const [username, setUsername] = useState<string>(faker.internet.userName());
	const [password, setPassword] = useState<string>("");
	const [isValidUsername, setIsValidUsername] = useState(true);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userState = useAppSelector(getUserState);

	const debounceUsername = useDebounce(username, 500);

	const [{ loading: createUserLoading, error: createUserError }, createUserFetch] =
		useAsyncWrapper(createUser);

	const [{ loading: checkUserNameLoading, data: checkUserNameData }, checkUserNameFetch] =
		useAsyncWrapper(checkUserName);

	useEffect(() => {
		if (checkUserNameData !== undefined && !checkUserNameLoading) {
			setIsValidUsername(!checkUserNameData);
		}
	}, [checkUserNameData]);

	useEffect(() => {
		if (debounceUsername) checkUserNameFetch(debounceUsername);
	}, [debounceUsername]);

	useEffect(() => {
		if (userState.userInfo) navigate("/");
	}, [userState.userInfo]);

	const handleCreateSubmit:
		| React.MouseEventHandler<HTMLButtonElement>
		| undefined = async (e): Promise<void> => {
		e.preventDefault();

		const user = await createUserFetch(username, password);
		if (user) dispatch(authUserAsync({ username: user.email, password: password }));
	};

	const handleGenerate: React.MouseEventHandler<HTMLButtonElement> | undefined = (
		e
	): void => {
		e.preventDefault();
		setUsername(faker.internet.userName());
	};

	const handleCheckUserName: React.MouseEventHandler<HTMLButtonElement> | undefined = (
		e
	): void => {
		e.preventDefault();
		checkUserNameFetch(username);
	};

	return (
		<div className="flex items-center justify-center h-full bg-background-dark">
			<form className="flex flex-col w-10/12 max-w-sm gap-4 rounded-lg  p-2 pt-8 pb-8 m-auto  bg-background-dark shadow-xl">
				<Logo size="lg" />
				<div className="flex flex-row flex-1 items-center gap-2">
					<TextField
						required
						type="text"
						name="username"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="flex w-full outline-primary"
					/>
					<Button
						onClick={handleGenerate}
						className="shadow-md text-xs bg-info-default text-contrastText-dark border-0"
					>
						Generate
					</Button>
					<Button
						onClick={handleCheckUserName}
						className="shadow-md text-xs bg-info-default text-contrastText-dark border-0"
					>
						{checkUserNameLoading ? "..." : "Check"}
					</Button>
				</div>
				<TextField
					required
					type="text"
					name="username"
					value={password}
					placeholder="Create password?"
					onChange={(e) => setPassword(e.target.value)}
					className="flex w-full outline-primary"
				/>
				<p className="text-xs text-info-default text-center">
					Note: Password not required
				</p>
				<Button
					type="submit"
					onClick={handleCreateSubmit}
					className="shadow-md bg-primary-default text-contrastText-dark rounded-lg border-0 font-bold tracking-widest"
				>
					Create User
				</Button>

				<LinkRouter to="/login" fontSize="text-xs" className="text-contrastText-dark">
					Login if you have an account
				</LinkRouter>

				<div className="flex flex-1 flex-col text-center">
					<p className="text-sm text-contrastText-dark"> {createUserLoading}</p>

					{createUserError && (
						<p className="text-sm text-error-default">{createUserError.message}</p>
					)}

					{!isValidUsername && (
						<p className="text-sm text-error-default">
							{"Username not available or invalid"}
						</p>
					)}
				</div>
			</form>
		</div>
	);
};
