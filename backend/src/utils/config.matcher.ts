import chalk from "chalk";

const config = {
  matchers: ["/health", "/auth", "/client", "/oauth", "/chats"],
  methods: {
    GET: chalk.hex("#60E809"),
    POST: chalk.yellowBright,
    PUT: chalk.cyanBright,
    DELETE: chalk.red,
    PATCH: chalk.yellowBright,
    OPTIONS: chalk.blueBright,
    HEAD: chalk.whiteBright,
  },
};

export default config;
