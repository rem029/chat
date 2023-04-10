import { MainContainer } from "components/ui/container/main";
import Login from "components/user/login";
import "index.css";
import { HomePage } from "pages/home";
import { getUserState } from "slice/userSlice";
import { useAppSelector } from "store/hooks";

function App(): JSX.Element {
	const userState = useAppSelector(getUserState);
	return (
		<MainContainer>
			<>
				{userState.userInfo && <HomePage />}
				{!userState.userInfo && <Login />}
			</>
		</MainContainer>
	);
}

export default App;
