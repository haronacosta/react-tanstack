import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers';
import { GithubLabel } from '../interface';

export const getLabels = async (): Promise<GithubLabel[]> => {

  await sleep(1000);

  const { data: labels } = await githubApi.get<GithubLabel[]>('/labels');

  console.log(labels);

  return labels;
};