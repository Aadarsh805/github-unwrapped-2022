import React, {SVGProps} from 'react';
import {RoughPath} from '../RoughPath';

export const Ruby: React.FC<SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			enable-background="new 0 0 28 28"
			viewBox="0 0 28 28"
			{...props}
		>
			<RoughPath
				fill="#8a0f06"
				d="M7.086,8.149C12.116,2.673,20.748-0.667,23.808,3s0.835,21.327,0.835,21.327S9.563,27.896,6.429,25.389S1.056,14.714,7.086,8.149z"
			/>
			<path d="M7.236,25.999C5.806,25.941,2.159,25.788,2,20.9c-0.003-0.09,0.018-0.178,0.061-0.256l1.577-2.893c0.092-0.168,0.277-0.283,0.463-0.26c0.192,0.009,0.361,0.127,0.436,0.303l2.646,6.217l2.242-7.354c-0.002-0.077,0.014-0.154,0.05-0.226c0.113-0.217,0.381-0.352,0.612-0.275l8.008,2.573l-2.063-8.123c-0.036-0.144-0.007-0.297,0.081-0.416c0.087-0.12,0.224-0.195,0.372-0.205l7.198-0.467l-5.688-4.665C17.868,4.75,17.8,4.589,17.814,4.424c0.015-0.164,0.109-0.312,0.253-0.392l3.506-1.968c0.134-0.074,0.293-0.085,0.43-0.028c2.602,0.49,4.01,2.237,3.984,4.937c0.01,0.046,0.014,0.095,0.01,0.145L24.69,24.365c-0.019,0.247-0.216,0.443-0.464,0.461L7.236,25.999z M3.005,21.002c0.155,3.24,2.055,3.817,3.492,3.954l-2.477-5.818L3.005,21.002z M10.284,17.271l-2.342,7.68l15.784-1.092l1.017-13.405l-7.593,0.492l2.139,8.414c0.045,0.177-0.009,0.363-0.142,0.488c-0.133,0.125-0.323,0.168-0.496,0.111L10.284,17.271z M19.196,4.546l5.644,4.631l0.152-1.998c-0.004-0.027-0.006-0.056-0.005-0.084c0.066-2.271-0.975-3.637-3.094-4.062L19.196,4.546z" />
			<path d="M5.601,17.831c-0.006,0-0.012,0-0.017,0c-0.83-0.003-1.499-0.257-1.988-0.755c-2.073-2.1,0.134-6.787,3.465-10.106c2.727-2.722,5.922-4.477,8.148-4.477c0.006,0,0.012,0,0.018,0c0.861,0.004,1.552,0.265,2.054,0.774c2.096,2.127-0.251,6.738-3.523,9.997C10.974,16.041,7.775,17.831,5.601,17.831z M15.208,3.493c-1.944,0-4.931,1.679-7.439,4.182c-3.294,3.283-4.878,7.266-3.461,8.699v0.001c0.296,0.301,0.727,0.454,1.281,0.456c0.004,0,0.009,0,0.013,0c1.893,0.001,4.884-1.716,7.45-4.275c3.333-3.319,4.911-7.171,3.517-8.587c-0.309-0.312-0.762-0.473-1.347-0.476C15.218,3.493,15.213,3.493,15.208,3.493z" />
		</svg>
	);
};
