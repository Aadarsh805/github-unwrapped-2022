import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {TopPullRequest, TopPullRequestProps} from "./TopPullRequest";

export const AnimatedTopPullRequest: React.FC<TopPullRequestProps> = ({...props}) => {
	const top = interpolate(props.index, [0, 3], [-200, 400]);
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const offsetProg = spring({
		fps,
		frame: frame - 75 - props.index * 2,
		config: {
			damping: 200,
		},
	});

	const offset = interpolate(offsetProg, [0, 1], [900, 0]);

	return (
		<AbsoluteFill
			style={{
				transform: `translateY(${top + offset}px)`,
			}}
		>
			<TopPullRequest {...props}></TopPullRequest>
		</AbsoluteFill>
	);
};
