import { Routing } from "./components/routing/routes";
import { store } from "./store";
import { Provider } from "react-redux";

import "index.css";

function App(): JSX.Element {
	return (
		<Provider store={store}>
			<Routing />
		</Provider>
	);
}

export default App;
