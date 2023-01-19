import * as React from "react"
import {GameContext} from "../App"
import * as Types from "./Types"

const getError = (errors: Types.IErrors): string => (errors ? errors["id"] : "")

const getFieldTypeStyle = (errors: Types.IErrors): any =>
	getError(errors) ? {borderColor: "red"} : {}


//  how do we typeset the answers?

// BuildAnswerFields()
// pass answers[], maxLines
// get min and max char counts
//
//  decide 3 things:
//    how many lines to use
//      (charCount)
//      {return numLines}
//    which sizeBracket
//      (lengths[], numLines)
//      {return sizeBracket}
//    line breaks
//      (questionText, numLines)
//        commas and periods?
//      {return theLines[]}
//
//  Typeset()
//  build chunk[s] with br & nbsp
//  return HTML string, sizeBracket
//
//  text from “db” is simple string
//  
//  <Field />
//  label className = lineCount, sizeBracket

export function Typeset(theText: string, maxLines: number) {
	let widowPrevention: boolean = true
	let orphanPrevention: boolean = true
	let charCount: number = theText.length
	let theWords: string[] = theText.split(" ")
	let wordCount: number = theWords.length
	let numLines: number = 1
	let sizeBracket: string = "M" //  based on chars per line of lengths[1]
	let theLines: string[] = []
	let theResult: string = ""

	// if ( charCount ) {
	// 	switch ( charCount ) {
	// 		case 8:
	// 			sizeBracket="L"
	// 			break
	// 		case 16:
	// 			sizeBracket="M"
	// 			break
	// 		case 24:
	// 			sizeBracket="S"
	// 			break
	// 		default:
	// 			// magicTag = <h1>blink</h1>
	// 			break
	// 	}
	// }

	if (charCount / maxLines > 18) {
		sizeBracket = "M"
	} else if (charCount / maxLines > 6) {
		sizeBracket = "S"
	} else {
		sizeBracket = "L"
	}

	//  ask:
	//  21 words, 3 lines, 7 words per line avg
	//  113 chars, 3 lines, 37.7 chars per line avg

	let delta: number = 10

	return [buildLines(theText, maxLines, delta), sizeBracket]
}

export function buildLines(theText: any, maxLines: number, delta: number) {
	let widowPrevention: boolean = true
	let orphanPrevention: boolean = true
	let charCount: number = theText.length
	let theWords: string[] = theText.split(" ")
	let wordCount: number = theWords.length
	let sizeBracket: string = "M" //  based on chars per line of lengths[1]
	let theLines: string[] = []
	let result: string[] = []
	let thisLine = ''

	let wordsPerLine = Math.round(wordCount / maxLines)
	let charsPerLine = Math.round(charCount / maxLines)

	let word: number = 0
	do {
		theLines.push(theWords[word])
		// console.log("popped", theWords.pop())
		word++
	}
	while (word < wordCount)

	theLines.forEach(m => result.push(
		m + " "
	))

	// if (1 !== 1) {
	// 	console.log("string: " + theText, "Seven Lines: " + theLines)
	// 	console.log("Word Count: " + wordCount, "Char Count: " + charCount)
	// }
	return result
}

// do {
// 	theLines.push(theWords[word])
// 	word++
// 	theWords.pop()
// }
// while (theWords.length < 0)

// if (i < maxLines) {
// 	theLines.push("<br />")
// }

// delta++
// theLines = theText.split(" ")
// buildLines(theWords, maxLines, delta)

//  i = 0
// do {
// 	let thisLine = ''
// 	let x = 0
// 	do {
// 		if (theWords.length > 0) {
// 			thisLine += theWords.shift() + ' '
// 		}
// 		x++
// 	} while (x < wordCount / maxLines)
//
// 	theLines.push(thisLine)
// 	i++
// } while (theWords.length > 0)

// theResult = "okay"
// 
// }


export const Field: React.FunctionComponent<Types.IFieldProps> = ({
	                                                                  id,
	                                                                  label,
	                                                                  FieldType,
	                                                                  options,
	                                                                  value
                                                                  }) => {

	const unsetType: any = Typeset(id.toString(), 3)
	const typesetText: string = unsetType[0]
	const typesetSize: string = unsetType[1]
	const className: string = "form-row answer size-" + typesetSize

	return (
		<GameContext.Consumer>
			{(context: any) => (
				<div className={className}>

					{FieldType!.toLowerCase() === "textbox" && (
						<input
							id={id.toString()}
							type="text"
							value={value}
							onChange={
								(e: React.FormEvent<HTMLInputElement>) =>
									context!.setState({[id]: e.currentTarget.value})
							}
							className="quiz"
							// style={getFieldTypeStyle(context!.errors)}
						/>
					)}

					{FieldType!.toLowerCase() === "textarea" && (
						<textarea
							id={id.toString()}
							value={value}
							onChange={
								(e: React.FormEvent<HTMLTextAreaElement>) =>
									context!.setState({[id]: e.currentTarget.value})
							}
							// onBlur={
							// 	(e: React.FormEvent<HTMLTextAreaElement>) => {
							// 		context!.validate(id.toString())
							// 	}
							// }
							className="quiz"
							// style={getFieldTypeStyle(context!.errors)}
						/>
					)}

					{FieldType!.toLowerCase() === "dropdown" && (
						<select
							id={id.toString()}
							name={id.toString()}
							value={value}
							onChange={
								(e: React.FormEvent<HTMLSelectElement>) =>
									context!.setState({[id]: e.currentTarget.value})
							}
							// onBlur={
							// 	(e: React.FormEvent<HTMLSelectElement>) =>
							// 		context!.validate(id.toString())
							// }
							className="quiz"
							// style={getFieldTypeStyle(context!.errors)}
						>
							{options &&
								options.map(option => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
						</select>
					)}

					{FieldType!.toLowerCase() === "radio" && (
						<input
							type="radio"
							name="MCQ"  //  only safe if one MCQ per page
							id={value}
							key={id}
							value={value}

							// onChange={
							// 	(e: React.FormEvent<HTMLInputElement>) =>
							// 		context!.setState({MCQ: e.currentTarget.value})
							// }

							className="quiz"
							// style={getFieldTypeStyle(context!.errors)}
						/>)}

					{FieldType!.toLowerCase() === "checkbox" && (
						<input
							type="checkbox"
							name="MCQ"  //  only safe if one MCQ per page
							id={id.toString()}
							key={id}
							value={value}

							// onChange={
							// 	(e: React.FormEvent<HTMLInputElement>) =>
							// 		context!.setValues({[id]: e.currentTarget.value})
							// }

							className="quiz"
							// style={getFieldTypeStyle(context!.errors)}
						/>
					)}

					{label && <label htmlFor={value}>{typesetText}</label>}

					{/*{getError(context!.errors) && (*/}
					{/*	<div style={{color: "red", fontSize: "80%"}}>*/}
					{/*		<p>{getError(context!.errors)}</p>*/}
					{/*	</div>*/}
					{/*)}*/}
				</div>
			)}
		</GameContext.Consumer>
	)
}
