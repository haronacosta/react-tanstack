import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interface";

interface UseIssuesOptions {
  state: State;
  selectedLabels: string[];
}

export const useIssuesInfinity = ({
  state,
  selectedLabels,
}: UseIssuesOptions) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabels }],
    queryFn: ({ pageParam }) => getIssues(state, selectedLabels, pageParam),
    staleTime: 1000 * 60 * 1, // 1 minute
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  return {
    issuesQuery,
  };
};
