import { SQLData } from "@interfaces/database.interfaces";
import { Temp } from "@interfaces/jsonConverter.interface";

const toJson = (data: SQLData) => {
	const jsonData: any = [];
	const names = data.metaData;
	const values = data.rows;

	let temp: Temp = {};

	if (values && names) {
		for (let i = 0; i < values.length; i++) {
			for (let j = 0; j < values[i].length; j++) {
				temp[names[j].name] = values[i][j];
			}

			jsonData.push(temp);
			temp = {};
		}
	}

	return JSON.parse(JSON.stringify(jsonData));
};

export default toJson;
