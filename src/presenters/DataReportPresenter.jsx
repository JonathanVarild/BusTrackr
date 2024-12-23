import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataReportView from "../views/DataReportView";
import { fetchDataReport } from "../store/interface/dataReport";

function DataReport(props) {
	const dataReport = useSelector((state) => state.interface.dataReport);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchDataReport());
	}, [dispatch]);

	return <DataReportView data={dataReport.data} status={dataReport.status} />;
}

export default DataReport;
