import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authTokenAsync } from "../../slice/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { getToken } from "../../utilities/storage";

interface ProtectedRoutesProps {
	children?: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRoutesProps): JSX.Element => {
	const token = getToken();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!token) navigate("/login");
		if (token) dispatch(authTokenAsync({ token }));
	}, []);

	return <>{children}</>;
};
