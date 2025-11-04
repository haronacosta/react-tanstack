import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interface";

interface UseIssuesOptions {
  state: State;
}

export const useIssues = ({ state }: UseIssuesOptions) => {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state }],
    queryFn: () => getIssues(state),
    staleTime: 1000 * 60 * 5,
  });

  return {
    issuesQuery,
  };
};
