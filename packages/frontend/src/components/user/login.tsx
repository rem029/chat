import { Button } from "components/ui/button";
import { Link } from "components/ui/link";
import { TextField } from "components/ui/textfield";
import { useState } from "react";
import { getUserState, loginAsync } from "slice/userSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const Login: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const dispatch = useAppDispatch();
	const userState = useAppSelector(getUserState);

	const handleLoginSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined = (
		e
	): void => {
		e.preventDefault();
		dispatch(loginAsync({ username: username, password: password }));
	};

	return (
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
				{userState.status === "idle" && (
					<>
						<p className="text-sm text-gray-500">{userState.userInfo?.id}</p>
						<p className="text-sm text-gray-500">{userState.userInfo?.email}</p>
					</>
				)}

				{userState.status === "failed" && (
					<p className="text-sm text-red-500">{userState.error}</p>
				)}
			</div>
		</form>
	);
};

export default Login;
