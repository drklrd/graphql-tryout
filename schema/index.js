// iimport type helpers from graphql-js
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull
} = require('graphql');

const UserType = require('./types/user');
const pgdb = require('../database/pgdb');

// the root query type is where in the data graph we can start asking questions

const RootQueryType = new GraphQLObjectType({
	name : 'RootQueryType',
	fields : {
		me  : {
			type : UserType,
			description : 'The current user identified by an API key',
			args : {
				key : {
					type : new GraphQLNonNull(GraphQLString)
				}
			},
			resolve : (obj, args, { pgPool }) => {
				return pgdb(pgPool).getUserByApiKey(args.key);
			}
		}
	}
});


const ncSchema = new GraphQLSchema({
	query : RootQueryType
});

module.exports = ncSchema;