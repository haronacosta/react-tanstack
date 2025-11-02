import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { RandomNumber } from './components/RandomNumber';

const getRandomNumber = async (): Promise<number> => {
	const resp = await fetch(
		"https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
	).then((response) => response.json());

	return Number(resp);
};

function App() {
	const {
    isFetching,
		data: number,
		error,
		refetch,
	} = useQuery({
		queryKey: ["random-number"],
		queryFn: getRandomNumber,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
	});

	return (
		<>
			{isFetching ? <p>Loading...</p> : <p>Random Number: {number}</p>}

     {/*  <RandomNumber /> */}

			<div>{error && <p>Error: {error.message}</p>}</div>

			<button
				disabled={isFetching}
				type='button'
				onClick={() => {
					refetch();
				}}
			>
				Fetch New Number
			</button>
		</>
	);
}

export default App;
