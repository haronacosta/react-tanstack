import { useRandom } from "./hooks/useRandom";

import "./App.css";

function App() {
  const { randomQuery } = useRandom();
	return (
		<>
			{randomQuery.isFetching ? (
				<p>Loading...</p>
			) : (
				<p>Random Number: {randomQuery.data}</p>
			)}

			<div>
				{randomQuery.error && <p>Error: {randomQuery.error.message}</p>}
			</div>

			<button
				disabled={randomQuery.isFetching}
				type='button'
				onClick={() => {
					randomQuery.refetch();
				}}
			>
				Fetch New Number
			</button>
		</>
	);
}

export default App;
