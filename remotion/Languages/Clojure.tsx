import React, {SVGProps} from 'react';
import {RoughEllipse} from '../RoughEllipse';

export const Clojure: React.FC<SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			enable-background="new 0 0 28 28"
			viewBox="0 0 28 28"
		>
			<RoughEllipse
				cx="15.128"
				cy="15.083"
				fill="#fff"
				rx="11.125"
				ry="11.375"
			/>
			<path
				fill="#63b132"
				d="M14,26C7.383,26,2,20.617,2,14S7.383,2,14,2s12,5.383,12,12S20.617,26,14,26z M14,3C7.935,3,3,7.935,3,14s4.935,11,11,11s11-4.935,11-11S20.065,3,14,3z"
			/>
			<path
				fill="#63b132"
				d="M14,21.5c-4.136,0-7.5-3.364-7.5-7.5S9.864,6.5,14,6.5s7.5,3.364,7.5,7.5S18.136,21.5,14,21.5z M14,7.5c-3.584,0-6.5,2.916-6.5,6.5s2.916,6.5,6.5,6.5s6.5-2.916,6.5-6.5S17.584,7.5,14,7.5z"
			/>
			<path
				fill="#63b132"
				d="M20,21c-4.475,0-5.763-3.784-6.9-7.123C12.026,10.724,11.099,8,8,8C6.389,8,5.049,8.441,4.017,9.311C3.734,9.575,3.17,9.359,3.17,8.95c0-0.135,0.054-0.258,0.142-0.349c0.014-0.015,0.029-0.029,0.045-0.043C4.577,7.524,6.139,7,8,7c3.814,0,4.949,3.333,6.046,6.555C15.175,16.87,16.241,20,20,20c1.504,0,2.892-0.532,4.126-1.581c0.205-0.174,0.514-0.16,0.696,0.037c0.182,0.197,0.181,0.498-0.009,0.688C23.374,20.371,21.723,21,20,21z"
			/>
			<path
				fill="#63b132"
				d="M11,20.519c-0.276,0-0.5-0.224-0.5-0.5c0-2.086,2.459-6.569,2.564-6.759c0.133-0.241,0.438-0.329,0.679-0.196c0.242,0.133,0.33,0.438,0.197,0.679c-0.679,1.231-2.44,4.758-2.44,6.276C11.5,20.295,11.276,20.519,11,20.519z"
			/>
		</svg>
	);
};
