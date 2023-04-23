import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";
import { MainContainer } from "../ui/container/main";
import { PageNotFound } from "../../pages/notFound";
import { Login } from "../user/login";
import { PageLobby } from "../../pages/lobby";
import { PageChat } from "../../pages/chat";
import { CreateUser } from "components/user/create";

export const Routing = (): JSX.Element => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/user-create" element={<CreateUser />} />
				<Route path="/user-forgotpassword" element={<CreateUser />} />

				<Route
					path="/"
					element={
						<ProtectedRoute>
							<MainContainer />
						</ProtectedRoute>
					}
				>
					<Route path="/" element={<PageLobby />} />

					<Route path="lobby" element={<PageLobby />} />
					<Route path="lobby/:id" element={<PageChat />} />
				</Route>

				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};
