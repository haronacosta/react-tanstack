import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions";
import { State } from "../interface";

interface UseIssuesOptions {
  state: State;
  selectedLabels: string[];
}

export const useIssues = ({ state, selectedLabels }: UseIssuesOptions) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels, page }],
    queryFn: () => getIssues(state, selectedLabels, page),
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  const nextPage = (): void => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = (): void => setPage(Math.max(page - 1, 1));

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabels]);

  return {
    issuesQuery,
    page,
    nextPage,
    prevPage,
  };
};
