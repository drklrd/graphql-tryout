const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLNonNull
} = require('graphql');


const { fromSnakeCase } = require('../../lib/util');

module.exports = new GraphQLObjectType({
	name : 'MeType',
	fields : {
		id : {
			type : GraphQLID
		},
		email : {
			type : new GraphQLNonNull(GraphQLString)
		},
		firstName : fromSnakeCase(GraphQLString),
		lastName : fromSnakeCase(GraphQLString)

	}
})