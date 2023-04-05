import { useState, useEffect } from "react";
import { getUserState, loginAsync } from "slice/userSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const Login: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const dispatch = useAppDispatch();
	const userState = useAppSelector(getUserState);

	useEffect(() => {
		console.log("userState", userState);
	}, [userState]);

	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined = (
		e
	): void => {
		e.preventDefault();
		dispatch(loginAsync({ username: username, password: password }));
	};

	return (
		<div>
			<form>
				<input
					type="text"
					name="username"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					name="username"
					value={password}
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" onClick={handleSubmit}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
