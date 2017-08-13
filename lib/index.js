const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);


// read the query from CLI
const query = process.argv[2];

const ncSchema = require('../schema');
const { graphql } = require('graphql');

// execure the query against the schema
graphql(ncSchema,query)
	.then(result=>{
		console.log('@@@',result);
	});