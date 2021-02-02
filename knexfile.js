// Update with your config settings.

module.exports = {

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
    filename: "./data/waterplant.db3"
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory:  './data/seeds'
    }
  },

  // production: {
	// 	client: 'pg',
  //   connection: process.env.DATABASE_URL,
	// 	migrations: {
	// 		directory: './data/migrations',
  //   },
  //   seeds: {
  //     directory:  './data/seeds'
  //   }
	// },


};
