import styles from "../css/DataReport.module.css";
import LoadingSpinnerView from "../views/LoadingSpinnerView";

function DataReportView(props) {
	if (props.status === "failed") {
		return <section className={styles.dataReportPage}>We could not find any data.</section>;
	}

	if (props.data === null) {
		return <LoadingSpinnerView />;
	}

	return (
		<section className={styles.dataReportPage}>
			<h1>User data report</h1>
			<div className={styles.reportInfo}>This report is showing all account information that we store in our database.</div>
			<h2>User data:</h2>
			<table>
				<thead>
					<tr>
						<th>Data</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>user_id</td>
						<td>{props.data.userData.id}</td>
					</tr>
					<tr>
						<td>username</td>
						<td>{props.data.userData.username}</td>
					</tr>
					<tr>
						<td>email</td>
						<td>{props.data.userData.email}</td>
					</tr>
					<tr>
						<td>date_of_birth</td>
						<td>{props.data.userData.date_of_birth}</td>
					</tr>
					<tr>
						<td>registration_date</td>
						<td>{props.data.userData.registration_date}</td>
					</tr>
				</tbody>
			</table>
			<h2>Favorite lines:</h2>
			<table>
				<thead>
					<tr>
						<th>line_id</th>
						<th>user_id</th>
					</tr>
				</thead>
				<tbody>{props.data.favoriteLines.map(renderFavoriteLineCB)}</tbody>
			</table>
			<h2>Login logs:</h2>
			<table>
				<thead>
					<tr>
						<th>time</th>
						<th>ip</th>
					</tr>
				</thead>
				<tbody>{props.data.loginLogs.map(renderLoginCB)}</tbody>
			</table>
			<h2>Report logs:</h2>
			<table>
				<thead>
					<tr>
						<th>time</th>
						<th>ip</th>
					</tr>
				</thead>
				<tbody>{props.data.reportLogs.map(renderReportCB)}</tbody>
			</table>
			<h2>Agreement logs:</h2>
			<table>
				<thead>
					<tr>
						<th>time</th>
						<th>type</th>
						<th>ip</th>
					</tr>
				</thead>
				<tbody>{props.data.agreements.map(renderAgreementCB)}</tbody>
			</table>
		</section>
	);

	function renderLoginCB(login) {
		return (
			<tr key={login.timestamp + login.ip}>
				<td>{login.timestamp} (UTC +0)</td>
				<td>{login.ip}</td>
			</tr>
		);
	}

	function renderReportCB(report) {
		return (
			<tr key={report.timestamp + report.ip}>
				<td>{report.timestamp} (UTC +0)</td>
				<td>{report.ip}</td>
			</tr>
		);
	}

	function renderAgreementCB(agreement) {
		return (
			<tr key={agreement.timestamp + agreement.type + agreement.ip}>
				<td>{agreement.timestamp} (UTC +0)</td>
				<td>{agreement.type}</td>
				<td>{agreement.ip}</td>
			</tr>
		);
	}

	function renderFavoriteLineCB(favoriteLine) {
		return (
			<tr key={favoriteLine.line_id + favoriteLine.userID}>
				<td>{favoriteLine.line_id}</td>
				<td>{favoriteLine.userID}</td>
			</tr>
		);
	}

	function renderFavoriteStationCB(favoriteStation) {
		return (
			<tr key={favoriteStation.lineID + favoriteStation.userID}>
				<td>{favoriteStation.stationID}</td>
				<td>{favoriteStation.userID}</td>
			</tr>
		);
	}
}

export default DataReportView;
