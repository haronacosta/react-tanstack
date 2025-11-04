import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue } from "../interface";

export const getIssueComments = async (issueNumber: number): Promise<GithubIssue[]> => {

    await sleep(1000);

    const { data: comments } = await githubApi.get<GithubIssue[]>(`/issues/${issueNumber}/comments`);

    return comments;
};