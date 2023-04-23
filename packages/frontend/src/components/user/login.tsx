import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserState, authUserAsync } from "../../slice/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LinkRouter } from "components/ui/linkRouter";
import { Button } from "components/ui/button";
import { TextField } from "components/ui/textfield";
import { Logo } from "components/ui/logo";

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
		<div className="flex items-center justify-center h-full bg-background-dark">
			<form className="flex flex-col w-10/12 max-w-sm gap-4 rounded-lg  p-2 pt-8 pb-8 m-auto  bg-background-dark shadow-xl">
				<Logo size="lg" />

				<TextField
					required
					type="text"
					name="username"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="outline-primary"
				/>
				<TextField
					required
					type="text"
					name="username"
					value={password}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					className="outline-primary"
				/>
				<Button
					type="submit"
					onClick={handleLoginSubmit}
					className="bg-primary-default text-contrastText-dark rounded-lg border-0 font-bold tracking-widest shadow-md"
				>
					Login
				</Button>

				<LinkRouter
					to="/user-create"
					fontSize="text-xs"
					className="text-contrastText-dark"
				>
					Create my account now!
				</LinkRouter>
				<LinkRouter
					to="/user-forgotpassword"
					fontSize="text-xs"
					className="text-contrastText-dark"
				>
					Forgot password?
				</LinkRouter>

				<div className="flex flex-1 flex-col text-center">
					<p className="text-sm text-contrastText-dark"> {userState.status}</p>

					{userState.status === "failed" && (
						<p className="text-sm text-error-default">{userState.error}</p>
					)}
				</div>
			</form>
		</div>
	);
};
