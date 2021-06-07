import axios from "axios";

const getGithubUrl = (repoUserName: string) =>
  `https://api.github.com/users/${repoUserName}/repos`;

export const getRepos = async (repoUserName: string) => {
  const url = getGithubUrl(repoUserName);
  const data = axios.get(url).then((response) => response.data);
  return data;
};
