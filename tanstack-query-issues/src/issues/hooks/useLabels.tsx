import { useQuery } from "@tanstack/react-query";

import { getLabels } from "../actions";
// import { GithubLabel } from '../interface';

export const useLabels = () => {
	const labelsQuery = useQuery({
		queryKey: ["labels"],
		queryFn: getLabels,
		staleTime: 1000 * 60 * 60, // 1 hour
/* 		placeholderData: [
			{
				id: 196858374,
				node_id: "MDU6TGFiZWwxOTY4NTgzNzQ=",
				url: "https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
				name: "CLA Signed",
				color: "e7e7e7",
				default: false,
			} satisfies GithubLabel,
		], */
       /*  initialData: [
            {
				id: 196858374,
				node_id: "MDU6TGFiZWwxOTY4NTgzNzQ=",
				url: "https://api.github.com/repos/facebook/react/labels/CLA%20Signed",
				name: "CLA Signed",
				color: "e7e7e7",
				default: false,
			} satisfies GithubLabel,
        ] */
	});

	return {
		labelsQuery,
	};
};
