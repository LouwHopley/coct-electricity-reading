import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { cleanNumber } from './utils.mjs';
import { submitElectricityReading } from './scraper.mjs';

const main = async () => {
  const stringInput = await input({
    message: 'What is today\'s electricity reading?',
  });
  // const stringInput = '12411.57';

  const number = cleanNumber(stringInput);
  // Throw an error if number is NaN
  if (Number.isNaN(number)) {
    console.log(chalk.red('Please enter a valid number, e.g 123456.78'));
    main();
    return;
  }

  console.log();
  console.log('Recording ' + chalk.yellow(number + 'kWh') + ' on eservices.capetown.gov.za...');
  console.log();
  await submitElectricityReading(number);
  console.log();
  console.log('Done.');
};


main();
