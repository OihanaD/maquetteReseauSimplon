import { User } from "./IUsers";

export interface Groups{	
    
	"id": number,
	"name": String,
	"userGroups": Array<User>
    
}