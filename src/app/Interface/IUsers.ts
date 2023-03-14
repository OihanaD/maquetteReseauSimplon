import { Groups } from "./IGroups";

export interface User{
    "id": number,
	"name": String,
	"surname": String,
	"mail": String,
	"image": String,
	"userGroups": Array<Groups>,
	"userFriendShips": Array<User>
}