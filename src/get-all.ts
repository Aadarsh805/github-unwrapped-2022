import {all} from '../remotion/all';
import {NotLanguages} from '../remotion/language-list';
import {BackendStats, getIssues} from '../remotion/map-response-to-stats';
import {sendDiscordMessage} from './discord-monitoring';
import {truthy} from './truthy';
import {PullRequest} from '../remotion/frontend-stats';

const {interpolate} = require('remotion');

export type BackendResponse = typeof all;

const query = (username: string) =>
	`{
    user(login: "${username}") {
      openIssues: issues(filterBy: {since: "2022-01-01T00:00:00.000Z"}, states: OPEN) {
        totalCount
      }
      closedIssues: issues(
        filterBy: {since: "2022-01-01T00:00:00.000Z"}
        states: CLOSED
      ) {
        totalCount
      }
      avatarUrl
      login
        mostRecentPullRequest: pullRequests(first: 1, orderBy: { field: CREATED_AT, direction: DESC }) {
          nodes {
            title
            repository {
              name
              owner {
                login
              }
            }          
          }
        }
        contributionsCollection(from: "2022-01-01T00:00:00.000Z") {
        totalCommitContributions
        restrictedContributionsCount
        totalIssueContributions
        totalCommitContributions
        totalRepositoryContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        popularPullRequestContribution {
          pullRequest {
            id
            title
            repository {
              name
              owner {
                login
              }
            }
          }
        }
        pullRequestContributionsByRepository {
          repository {
            name
            owner {
              login
            }
          }
          contributions {
            totalCount
          }
        }
        contributionCalendar {
          totalContributions
        }
        commitContributionsByRepository {
          contributions {
            totalCount
          }
          repository {
            name
            owner {
              login
            }
            languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  color
                  name
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`.trim();

export type TopLanguage = {
	color: string | null;
	name: string;
};

export type TopPullRequest = {
	name: string;
	organization: string;
	count: number;
};

export const getAll = async (
	username: string,
	token: string
): Promise<BackendResponse> => {
	const res = await fetch(`https://api.github.com/graphql`, {
		method: 'post',
		body: JSON.stringify({query: query(username)}),
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
	});
	const rateLimit = res.headers.get('x-ratelimit-remaining');
	if (Math.random() < 0.1) {
		sendDiscordMessage(`Rate limit remaining: ${rateLimit}`);
	}
	return res.json();
};

type CommitContributions = {
	contributions: {
		totalCount: number;
	};
	repository: {
		name: string;
		owner: {
			login: string;
		};
		languages: {
			edges: {
				size: number;
				node: {
					color: string;
					name: string;
					id: string;
				};
			}[];
		};
	};
}[];

export const getTopLanguages = (
	response: CommitContributions
): TopLanguage[] | null => {
	// Store the languages and their counts in an object
	const langs: {[key: string]: number} = {};
	// Get the languages used in the repositories
	const languages = response
		.map((r) => {
			const repo = r.repository;
			const topLanguages = repo.languages.edges.map((edge, i) => {
				return {
					node: edge.node,
					rank: Math.max(3 - i, 0),
					multiplier:
						r.contributions.totalCount *
						interpolate(edge.size, [0, 3000000], [1, 10], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
				};
			});
			return topLanguages;
		})
		.flat(1);

	// Count the number of times each language is used
	for (const lang of languages) {
		if (NotLanguages.includes(lang.node.name)) {
			continue;
		}

		if (!langs[lang.node.name]) {
			langs[lang.node.name] = 0;
		}
		langs[lang.node.name] += lang.rank * lang.multiplier;
	}

	// Sort the languages by their counts in descending order
	const topEntries = Object.entries(langs).sort((a, b) => b[1] - a[1]);

	if (topEntries.length === 0) {
		return null;
	}

	const beforeSorted = topEntries
		// Create an object for each language with its color and name
		.map((entry) => {
			const lang = languages.find((l) => l.node.name === entry[0]);
			if (!lang) {
				return null;
			}

			return {
				color: lang.node.color,
				name: lang.node.name,
			};
		})
		// Remove any null values
		.filter(truthy);

	return (
		// Sort the languages by whether they have an icon and then by their values
		beforeSorted.sort((a, b) => {
			return langs[b.name] - langs[a.name];
		})
	);
};

type PullRequestContributions = {
	contributions: {
		totalCount: number;
	};
	repository: {
		name: string;
		owner: {
			login: string;
		};
	};
}[];

export const getTopPullRequests = (
	response: PullRequestContributions
): TopPullRequest[] => {
	// Sort the languages by their counts in descending order
	const topEntries = response.sort(
		(a, b) => b.contributions.totalCount - a.contributions.totalCount
	);

	return topEntries
		.slice(0, 3)
		// Create an object for each language with its color and name
		.map((entry) => {
			return {
				name: entry.repository.name,
				organization: entry.repository.owner.login,
				count: entry.contributions.totalCount
			};
		});
};

export const NOT_FOUND_TOKEN = 'Not found';

export const backendResponseToBackendStats = (
	response: BackendResponse
): BackendStats => {
	if (!response.data.user) {
		throw new Error(NOT_FOUND_TOKEN);
	}

	const repositoriesContributedTo =
		response.data.user.contributionsCollection.commitContributionsByRepository.map(
			(r) => r.repository.owner.login + '/' + r.repository.name
		);
	let mostRecentPullRequest : (PullRequest | null) = null;

	if (response.data.user.mostRecentPullRequest && response.data.user.mostRecentPullRequest.nodes.length) {
		mostRecentPullRequest = {
			title: response.data.user.mostRecentPullRequest.nodes[0].title,
			repository: response.data.user.mostRecentPullRequest.nodes[0].repository.name,
			organization: response.data.user.mostRecentPullRequest.nodes[0].repository.owner.login,
			uniqueId: response.data.user.mostRecentPullRequest.nodes[0].id
		};
	}

	let mostPopularPullRequest : (PullRequest | null) = null;

	if (response.data.user.contributionsCollection && response.data.user.contributionsCollection.popularPullRequestContribution) {
		mostPopularPullRequest = {
			title: response.data.user.contributionsCollection.popularPullRequestContribution.pullRequest.title,
			repository: response.data.user.contributionsCollection.popularPullRequestContribution.pullRequest.repository.name,
			organization: response.data.user.contributionsCollection.popularPullRequestContribution.pullRequest.repository.owner.login,
			uniqueId: response.data.user.contributionsCollection.popularPullRequestContribution.pullRequest.id
		};
	}

	return {
		avatar: response.data.user.avatarUrl,
		contributionCount:
			response.data.user.contributionsCollection.contributionCalendar
				.totalContributions,
		username: response.data.user.login,
		repositoriesContributedTo: repositoriesContributedTo,
		topLanguages: getTopLanguages(
			response.data.user.contributionsCollection.commitContributionsByRepository
		),
		issues: getIssues(response),
		commitCount:
			response.data.user.contributionsCollection.totalCommitContributions +
			response.data.user.contributionsCollection.restrictedContributionsCount,
		mostRecentPullRequest,
		mostPopularPullRequest,
		pullRequestsContributed: getTopPullRequests(response.data.user.contributionsCollection.pullRequestContributionsByRepository)
	};
};
