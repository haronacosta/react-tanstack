import { useQuery } from "@tanstack/react-query";

const getRandomNumber = async (): Promise<number> => {
	const resp = await fetch(
		"https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
	).then((response) => response.json());

	return Number(resp);
};

export const useRandom = () => {
	const randomQuery = useQuery({
		queryKey: ["random-number"],
		queryFn: getRandomNumber,
		staleTime: 1000 * 60,
		refetchOnWindowFocus: false,
	});

	return {
		randomQuery,
	};
};
