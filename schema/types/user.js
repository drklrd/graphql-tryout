const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLInt
} = require('graphql');


const { fromSnakeCase } = require('../../lib/util');
const ContestType = require('./contest');
// const pgdb = require('../../database/pgdb');
// const mdb = require('../../database/mdb');


module.exports = new GraphQLObjectType({
	name : 'UserType',
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
			resolve(obj,args,{ loaders }){
				return loaders.contestsForUserIds.load(obj.id);
				// return pgdb(pgPool).getContests(obj);
			}
		},
		contestsCount : {
			type : GraphQLInt,
			resolve(obj,args, { loaders }, { fieldName }){
				// return mdb(mPool).getCounts(obj,fieldName);
				return loaders.mdb.usersByIds.load(obj.id).
					then(res => res[fieldName]);
			}
		},
		namesCount : {
			type : GraphQLInt,
			resolve(obj,args, { loaders }, { fieldName }){
				// return mdb(mPool).getCounts(obj,fieldName);
				return loaders.mdb.usersByIds.load(obj.id).
					then(res => res[fieldName]);


			}
		},
		votesCount : {
			type : GraphQLInt,
			resolve(obj,args, { loaders }, { fieldName }){
				// return mdb(mPool).getCounts(obj,fieldName);
				return loaders.mdb.usersByIds.load(obj.id).
					then(res => res[fieldName]);
					

			}
		}

	} 
})