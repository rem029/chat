import { Button } from "components/ui/button";
import { Link } from "components/ui/link";
import { TextField } from "components/ui/textfield";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserState, authUserAsync } from "slice/userSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const Login = (): JSX.Element => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const dispatch = useAppDispatch();
	const userState = useAppSelector(getUserState);
	const navigate = useNavigate();

	const handleLoginSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined = (
		e
	): void => {
		e.preventDefault();
		dispatch(authUserAsync({ username: username, password: password }));
	};

	useEffect(() => {
		if (userState.userInfo) navigate("/");
	}, [userState.userInfo]);

	return (
		<div className="flex items-center justify-center h-full">
			<form className="flex flex-col w-1/2 max-w-sm gap-4 border rounded border-solid border-cyan-800 p-2 pt-4 pb-4 m-auto">
				<TextField
					required
					type="text"
					name="username"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					required
					type="text"
					name="username"
					value={password}
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type="submit" onClick={handleLoginSubmit}>
					Login
				</Button>

				<Link fontSize="text-xs">Create my account now!</Link>
				<Link fontSize="text-xs">Forgot password?</Link>

				<div className="flex flex-1 flex-col text-center">
					<p className="text-sm text-gray-500"> {userState.status}</p>

					{userState.status === "failed" && (
						<p className="text-sm text-red-500">{userState.error}</p>
					)}
				</div>
			</form>
		</div>
	);
};
