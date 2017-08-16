const humps = require('humps');
const _ = require('lodash');
const { orderedFor } = require('../lib/util');

module.exports = pgPool => {

	return {
		getUsersByApiKeys (apiKeys){
			return pgPool.query(`
				SELECT * from users where api_key = ANY($1)
			`,[apiKeys])
			.then(res=>{
				// return humps.camelizeKeys(res.rows[0]);
				return orderedFor(res.rows,apiKeys,'apiKey',true);

			});
		},

		getUsersByIds(userIds){
			return pgPool.query(`
				SELECT * from users where id = ANY($1)
			`,[userIds])
			.then(res=>{
				// return humps.camelizeKeys(res.rows);
				return orderedFor(res.rows,userIds,'id',true);

			});
		},

		getContestsForUserIds(userIds){
			return pgPool.query(`
				select * from contests where created_by = ANY($1)
			`,[userIds])
			.then(res => {
				// return humps.camelizeKeys(res.rows);
				return orderedFor(res.rows,userIds,'createdBy',false)
			})
		},

		getNamesForContestIds(contestIds){
			return pgPool.query(`
				select * from names where contest_id = ANY($1)
			`,[contestIds])
			.then(res => {
				// return humps.camelizeKeys(res.rows);
				return orderedFor(res.rows,contestIds,'contestId',false);
			})
		},

		getTotalVotesByNameIds(nameIds){
			return pgPool.query(`
				select name_id, up, down from total_votes_by_name
				where name_id = ANY($1)
			`,[nameIds]).then(res => {
				return orderedFor(res.rows,nameIds,'nameId',true);
			});
		}
	};
};