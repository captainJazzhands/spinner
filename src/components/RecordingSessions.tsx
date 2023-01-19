import React, {Context, useContext} from 'react'
import {IRecordingSession, ISequence} from './Types'
import './SoundBoard.css'
import {soundContext} from './SoundBoard';

export function RecordingSessions(props: { RSP: IRecordingSession, UpdaterFunction: Function }) {
// export function RecordingSessions(props: { RecordingSession: IRecordingSession }) {

	// const [Sequences2, setSequences2]: [ISequence[], Function] = useState([])
	// const [RecordingSession, setRecordingSession]: [IRecordingSession, Function] = useState(props.RecordingSession)

	// function HandleRecordChange(sesh: IRecordingSession) {
	// 	console.log('HRC()', typeof sesh)
	// 	setRecordingSession(sesh)
	// }

	const seesh: IRecordingSession = useContext(soundContext)
	let seqs:[] = []
	// sesh.Sequences.map(seqs.push([item]))
	
	// let seqs: ISequence[] = sesh.Sequences ?
	// 	Array.from(sesh.Sequences) : Array.from(props.RSP.Sequences)

	if (typeof (seqs) == 'undefined' || seqs.length < 1) {
		// sqs = []
		// return (<div className={'box LCD'} id={'TheSession'}>
		// 	This plan failed.
		// </div>)
	} else {
		// seqs = seqs.filter((something: { Sequence: string | any[]; }) => something.Sequence.length > 0)
		// let sqs = rsp.Sequences ? rsp.Sequences : []
	}

	if (typeof (seqs) == 'undefined') {
		// sqs = new IRecordingSession().Sequences
		// return (<div className={'box LCD'} id={'TheSession'}>
		// 	The backup plan failed, too.
		// </div>)
	} else {
		return <div className={'box'} id={'TheSession'}>
			{
				Object.keys(seqs).map((it, r, thing) => {
						return (<li
							className={'LCD'}
							key={r}
							// @ts-ignore
							onClick={props.HandleRecordChange}
						>)
							<span className={'meta'}>
								{/*{seqs[r].Sequence[r].color}*/}
							</span>
							<span className={'meta'}>
								{thing[r].toString()}
							</span>
							<span className={'meta'}>
								{it[r][0].valueOf().toString()}
							</span>
						</li>)
					}
				)
			}
		</div>
	}

	const BuildDisplayList = () => {

		let altSlate: Array<any> = []
		const displayList = []

		// const sqs: ISequence[] = props.RecordingSession.Sequences ? props.RecordingSession.Sequences : [new ISequence([new IButton(new ISound())])]
		// const displayList: ISequence[] = [new ISequence([new IButton(new ISound())])]

		debugger

		let localSeqs = () => {
			console.log('the other')
			if (typeof (seqs) !== undefined) {
				// seqs = Array.from(seqs)
				console.log('one')
			} else {
				console.log('was undefined', seqs)
				// seqs = Array.from(seqs)
			}
			return Array.from(seqs)
		}

		// const Sequences: ISequence[] =
		// 	props.RecordingSession.Sequences ?
		// 		props.RecordingSession.Sequences :
		// 		RecordingSession.Sequences
		// [new ISequence([new IButton()])]

		if (localSeqs.length > 0) {
			console.log('Sequences.length', localSeqs.length)
			for (const k in localSeqs) {
				displayList.push(k)
			}
			// localSeqs.map((oneSeq) => (
			// 		displayList.push(oneSeq)
			// 	)
		} else {
			console.log('Sequences.length', localSeqs.length)
			altSlate.push(localSeqs)
			// displayList.map((thing) => altSlate.push(thing.Sequence))
			return Array.from(altSlate)
		}
		return displayList
	}


	return <div className={'box LCD'} id={'TheSession'}>
		List of Recordings:

		<ul className={'LCD'}>
			{
				Object.keys(BuildDisplayList()).map((it, r, thing) => {
						return <li
							className={'LCD'}
							key={r}
							// @ts-ignore
							onClick={props.HandleRecordChange}
						>)
							<span className={'meta'}>
								{'sqs[r].Sequence[r].color'}
							</span>
							<span className={'meta'}>
								{it.toString()}
							</span>
							<span className={'meta'}>
								{it[r][0].valueOf().toString()}
							</span>
						</li>
					}
				)}
		</ul>

	</div>
}
function item(item: any): (value: ISequence, index: number, array: ISequence[]) => unknown {
    throw new Error('Function not implemented.');
}
