import chalk from "chalk";

const config = {
  matchers: [
    "/health",
    "/auth",
    "/client",
  ],
  methods: {
    GET: chalk.hex("#60E809"),
    POST: chalk.yellowBright,
    PUT: chalk.cyanBright,
    DELETE: chalk.red,
  },
};

export default config;
