export interface OptionsUrl {
	[key: string]: string;
}

export interface BookBody {
	id?: string;
	title: string;
	author_id: number;
	genre: string;
	release_date: Date;
	edition: string;
	amount: string;
}

export interface UserBody {
	id?: string;
	firstname: string;
	lastname: string;
	email: string;
	phone?: string;
	address_id: number;
	role_id: number;
	password?: string;
}
