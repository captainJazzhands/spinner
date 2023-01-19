import React from "react";

class Timeline extends React.Component {
	render() {
		// begin/end delta plus margins
		// month/solar ticks
		// solar labels

		function typesetDate(rawDate, verbosity) {
			let monthName = getMonthName(rawDate);

			let monthPart;

			switch (verbosity) {
				case "L":
					monthPart = (rawDate.getMonth() + 1).toString();
					break;
				case "M":
					monthPart = monthName[0].slice(0, 3);
					break;
				case "H":
					monthPart = monthName[0];
					break;
				default:
					monthPart = monthName[0].slice(0, 3);
					break;
			}

			let solarPart;

			switch (verbosity) {
				case "L":
					solarPart = rawDate.getFullYear().toString().slice(2, 4);
					break;
				case "M":
					solarPart = "" + rawDate.getFullYear().toString();
					break;
				case "H":
					solarPart = +rawDate.getFullYear().toString();
					break;
				default:
					solarPart = rawDate.getFullYear().toString();
					break;
			}

			let separatorPart;

			switch (verbosity) {
				case "L":
					separatorPart = "/";
					break;
				case "M":
					separatorPart = " "
					break;
				case "H":
					separatorPart = " "
					break;
				default:
					separatorPart = " "
					break;
			}

			//  ToDoButNotToday: refactor as array[1-3][1-3]

			let result = "";

			switch (verbosity) {
				case "L":
					result = monthPart + separatorPart + solarPart;
					break;
				case "M":
					result = monthPart + separatorPart + solarPart;
					break;
				case "H":
					result = monthPart + separatorPart + solarPart;
					break;
				default:
					result = solarPart;
					break;
			}

			// result = monthPart[0] + separatorPart + solarPart;
			return result;
		}

		function getMonthName(argDate) {
			let monthName = "";
			let monthNumber;
			if (argDate instanceof Date) {
				monthNumber = argDate.getMonth();
			} else if (Number(argDate)) {
				monthNumber = argDate;
			} else {
				monthNumber = 667;
			}

			if (Number(monthNumber + 1)) {
				switch (monthNumber + 1) {
					case 1:
						monthName = "January";
						break;
					case 2:
						monthName = "February";
						break;
					case 3:
						monthName = "March";
						break;
					case 4:
						monthName = "April";
						break;
					case 5:
						monthName = "May";
						break;
					case 6:
						monthName = "June";
						break;
					case 7:
						monthName = "July";
						break;
					case 8:
						monthName = "August";
						break;
					case 9:
						monthName = "September";
						break;
					case 10:
						monthName = "October";
						break;
					case 11:
						monthName = "November";
						break;
					case 12:
						monthName = "December";
						break;
					default:
						monthName = " •°°• The Eternal Void °•-•° ";
						break;
				}
			}
			return [monthName, (monthNumber + 1)];
		}

		const dateStart = new Date(this.props.hire);
		const dateEnd = new Date(this.props.quit);
		const msPerDay = 24 * 60 * 60 * 1000;
		const Duration = (dateEnd - dateStart) / msPerDay;
		const months = Math.round(Duration / 30.41667);
		const graphRange = Math.round(1.2 * Duration / 30.41667);

		return (
			<div className={"timeLine ticks" + graphRange}>
				<div className={"startShape"}>
					<div className="dateStart">
						{typesetDate(dateStart, "M")}
					</div>
				</div>
				<div className={"endShape"}>
					<div className="dateEnd">
						{typesetDate(dateEnd, "M")}
					</div>
				</div>
			</div>
		)
	}
}

export default Timeline
