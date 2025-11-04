import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubIssue, State } from "../interface";

export const getIssues = async (state: State): Promise<GithubIssue[]> => {

    await sleep(1000);

    const params = new URLSearchParams();

    if (state !== 'all') {
        params.set('state', state);
    }

    const { data: issues } = await githubApi.get<GithubIssue[]>('/issues', {
        params
    });

    return issues;
};