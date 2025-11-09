import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue } from "../interface";

export const getIssue = async (issueNumber: number): Promise<GithubIssue> => {

    await sleep(1000);

    const { data: issue } = await githubApi.get<GithubIssue>(`/issues/${issueNumber}`);

    return issue;
};