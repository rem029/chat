import { Provider } from "react-redux";
import "./index.css";
import { store } from "store";
import { Routing } from "components/routing/routes";

function App(): JSX.Element {
	return (
		<Provider store={store}>
			<Routing />
		</Provider>
	);
}

export default App;
