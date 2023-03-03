import React, {Component} from 'react'

export function InstructionHeader(props: {
	NavTarget: string,
	HeaderText: string,
	HotPanelUpdater: Function
}) {

	const setHotPanel: Function = props.HotPanelUpdater

	return (
		<div
			className={'instruction'}
			onClick={() => setHotPanel(props.NavTarget.toString())}
		>
			{props.HeaderText}
		</div>

	)
}
