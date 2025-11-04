import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interface";

interface UseIssuesOptions {
  state: State;
  selectedLabels: string[];
}

export const useIssues = ({ state, selectedLabels }: UseIssuesOptions) => {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels }],
    queryFn: () => getIssues(state, selectedLabels),
    staleTime: 1000 * 60 * 5,
  });

  return {
    issuesQuery,
  };
};
