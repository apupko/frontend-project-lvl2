import program from 'commander';

program.description('Compares two configuration files and shows a difference');
program.version('1.0.0');
program.helpOption('-h, --help', 'output usage information');
const run = () => {
  program.parse(program.args);
};
export default run;
