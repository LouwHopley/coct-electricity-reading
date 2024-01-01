# City of Cape Town Electricity Reading Tool

Command-Line Interface (CLI) to quickly &amp; easily enter City of Cape Town manual electricity readings instead of logging into eservices and navigating through the clunky web interface.

## Usage

For now, you'll need to:

1. clone the repo locally using `git clone https://github.com/LouwHopley/coct-electricity-reading`
2. enter the directory using `cd coct-electricity-reading`
3. set your login credentials in the `.env` file with `echo "COCT_USERNAME=<myusername>\nCOCT_PASSWORD=<mypassword>" > .env` (Don't include the `<` brackets around your username of password. E.g. `echo "COCT_USERNAME=johnsmith\nCOCTPASSWORD=helloworld > .env`)
4. install dependencies using `npm i`
5. finally run `npm start` and follow the prompts

Next time, simply run `npm start` in the directory.

### Multiple municipal accounts?

If you have more than one municipal account, you can specify a different account to use than the default first one.

To do this, add `COCT_ACCOUNT_INDEX=1` to your `.env` file. `0` being the first in the list, `1` the second, `2` the third, etc. If this is not specified, `COCT_ACCOUNT_INDEX` will default to `0`.

--------

2024

