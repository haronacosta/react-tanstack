import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue, State } from "../interface";

export const getIssues = async (
  state: State,
  selectedLabels: string[],
  page: number = 1
): Promise<GithubIssue[]> => {
  await sleep(1000);

  const params = new URLSearchParams();

  if (state !== "all") {
    params.set("state", state);
  }

  if (selectedLabels.length > 0) {
    params.set("labels", selectedLabels.join(","));
  }

  params.set("per_page", "5");
  params.set("page", page.toString());

  const { data: issues } = await githubApi.get<GithubIssue[]>("/issues", {
    params,
  });

  return issues;
};
