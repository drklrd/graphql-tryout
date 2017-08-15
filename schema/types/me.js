const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList
} = require('graphql');


const { fromSnakeCase } = require('../../lib/util');
const ContestType = require('./contest');
const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
	name : 'MeType',
	fields : {
		id : {
			type : GraphQLID
		},
		email : {
			type : new GraphQLNonNull(GraphQLString)
		},
		firstName : {
			type : GraphQLString
		},
		lastName : {
			type : GraphQLString
		},
		fullName : {
			type : GraphQLString,
			resolve : obj => `${obj.firstName} ${obj.lastName}`
		},
		contests : {
			type : new GraphQLList(ContestType),
			resolve(obj,args,{ pgPool }){
				return pgdb(pgPool).getContests(obj);
			}
		}

	} 
})