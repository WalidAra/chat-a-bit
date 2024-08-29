import { Express } from "express";
import { config } from "@/utils";
import expressListEndpoints from "express-list-endpoints";
import chalk from "chalk";

const logger = (app: Express, PORT: number) => {
  const endpoints = expressListEndpoints(app);

  console.log("\n========= Welcome To ALLWA =========\n");
  console.log(chalk.yellow(`- Total endpoints: ${endpoints.length}`));
  console.log(chalk.blue(`- Server is running on port:`), PORT);
  console.log(chalk.red(`~> http://localhost:${PORT}/ <~`));
  console.log(chalk.white(`~> http://localhost:${PORT}/docs <~`));
  console.log("\n====================================");

  config.matchers.forEach((matcher) => {
    console.log(chalk.cyan(`\nMatcher: ${matcher}`));

    const filteredEndpoints = endpoints.filter((endpoint) =>
      endpoint.path.includes(matcher)
    );

    if (filteredEndpoints.length > 0) {
      filteredEndpoints.forEach((endpoint) => {
        const method = endpoint.methods[0] as keyof typeof config.methods;
        const colorFunction = config.methods[method] || chalk.white;
        console.log(
          colorFunction(
            `~~> ${endpoint.methods.join(", ")}`,
            chalk.green(`${endpoint.path}`)
          )
        );
      });
    } else {
      console.log(chalk.black(`No endpoints for matcher: ${matcher}`));
    }
  });

  console.log("\n====================================\n");
};
export default logger;
