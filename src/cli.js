import program from 'commander';
import genDiff from './index.js';

program.description('Compares two configuration files and shows a difference');
program.version('1.0.0');
program.helpOption('-h, --help', 'output usage information');
program.arguments('<filepath1> <filepath2');
program.option('-f, --format [type]', 'output format');

program
  .action((filepath1, filepath2) => {
    console.log();
    console.log(genDiff(filepath1, filepath2));
  });

const run = () => {
  program.parse(program.args);
};
export default run;
