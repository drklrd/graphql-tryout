// iimport type helpers from graphql-js
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} = require('graphql');


// the root query type is where in the data graph we can start asking questions

const RootQueryType = new GraphQLObjectType({
	name : 'RootQueryType',
	fields : {
		hello : {
			type : GraphQLString,
			description : 'The All time favorite hello world example',
			resolve : () => 'world'
		}
	}
});


const ncSchema = new GraphQLSchema({
	query : RootQueryType
});

module.exports = ncSchema;