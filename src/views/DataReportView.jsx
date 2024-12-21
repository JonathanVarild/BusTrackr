import styles from "../css/DataReport.module.css";

function DataReportView(props) {
	return (
		<section className={styles.dataReportPage}>
			<h1>User data report</h1>
			<div className={styles.reportInfo}>A new report will be available for generation in 24 hours. Please save this report if you want to view it again.</div>
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
						<td></td>
					</tr>
					<tr>
						<td>username</td>
						<td></td>
					</tr>
					<tr>
						<td>email</td>
						<td></td>
					</tr>
					<tr>
						<td>password_hash</td>
						<td></td>
					</tr>
					<tr>
						<td>date_of_birth</td>
						<td></td>
					</tr>
					<tr>
						<td>registration_date</td>
						<td></td>
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
				<tbody>{[{ lineID: "2123414123132", userID: "3" }].map(renderFavoriteLineCB)}</tbody>
			</table>
			<h2>Favorite stations:</h2>
			<table>
				<thead>
					<tr>
						<th>station_id</th>
						<th>user_id</th>
					</tr>
				</thead>
				<tbody>{[{ stationID: "2123414123132", userID: "3" }].map(renderFavoriteStationCB)}</tbody>
			</table>
			<h2>Login logs:</h2>
			<table>
				<thead>
					<tr>
						<th>time</th>
						<th>ip</th>
					</tr>
				</thead>
				<tbody>{[{ time: "YYYY-MM-DD HH:MM:SS", ip: "192.168.1.1" }].map(renderLoginCB)}</tbody>
			</table>
			<h2>Report logs:</h2>
			<table>
				<thead>
					<tr>
						<th>time</th>
						<th>ip</th>
					</tr>
				</thead>
				<tbody>{[{ time: "YYYY-MM-DD HH:MM:SS", ip: "192.168.1.1" }].map(renderReportCB)}</tbody>
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
				<tbody>
					{[
						{ time: "YYYY-MM-DD HH:MM:SS", type: "terms_of_service", ip: "192.168.1.1" },
						{ time: "YYYY-MM-DD HH:MM:SS", type: "data_policy", ip: "192.168.1.1" },
					].map(renderAgreementCB)}
				</tbody>
			</table>
            
		</section>
	);

	function renderLoginCB(login) {
		return (
			<tr key={login.time + login.ip}>
				<td>{login.time}</td>
				<td>{login.ip}</td>
			</tr>
		);
	}

	function renderReportCB(report) {
		return (
			<tr key={report.time + report.ip}>
				<td>{report.time}</td>
				<td>{report.ip}</td>
			</tr>
		);
	}

	function renderAgreementCB(agreement) {
		return (
			<tr key={agreement.time + agreement.type + agreement.ip}>
				<td>{agreement.time}</td>
				<td>{agreement.type}</td>
				<td>{agreement.ip}</td>
			</tr>
		);
	}

	function renderFavoriteLineCB(favoriteLine) {
		return (
			<tr key={favoriteLine.lineID + favoriteLine.userID}>
				<td>{favoriteLine.lineID}</td>
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
