# City of Cape Town Electricity Reading Tool

## Introduction

This tool simplifies the process of submitting electricity meter readings for residents of Cape Town with electromechanical meters. Say goodbye to manually logging into the e-Services portal and navigating its cumbersome interface. This Command-Line Interface (CLI) tool automates and speeds up the submission of readings.

## Getting Started

Before you begin, ensure you have Node.js installed on your machine. This tool is built with Puppeteer, a Node library which provides a high-level API over the Chrome or Chromium browser.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/LouwHopley/coct-electricity-reading
   ```
   
2. **Navigate to the Directory**

   ```bash
   cd coct-electricity-reading
   ```

3. **Set Up Environment Variables**
Configure your login credentials in a `.env` file.

   ```bash
   echo "COCT_USERNAME=myusername\nCOCT_PASSWORD=mypassword" > .env
   ```
Replace `myusername` and `mypassword` with your e-services credentials. Ensure not to include the `<` brackets.

4. **Install Dependencies**

   ```bash
   npm install
   ```

**Using Multiple Accounts**

If managing multiple municipal accounts, specify the account with `COCT_ACCOUNT_INDEX` in your `.env` file.

   ```bash
   echo "COCT_ACCOUNT_INDEX=1" >> .env
   ```

Indices start at `0`. If not specified, `COCT_ACCOUNT_INDEX` defaults to `0`.

### Usage

**Start the Tool**
  
  ```bash
  npm start
  ```

Follow the on-screen prompts to enter your electricity meter reading.

## Contributing
This is an open-source tool, and contributions are welcome. Feel free to fork the repository, make your changes, and submit a pull request.

## License
MIT Licensed.

## Disclaimer

This tool is not affiliated with, authorized, maintained, sponsored, or endorsed by the City of Cape Town or any of its affiliates or subsidiaries. It is a community-driven initiative to simplify the electricity reading submission process. As such, please ensure the accuracy of your meter readings and adhere to all applicable laws and regulations.

The developers and contributors of this tool cannot be held liable for any damages, issues, or inaccuracies that may arise from its use. By using this tool, you agree to take full responsibility for any consequences that result from its use. Always double-check your data and use this tool at your own risk.

Thank you for understanding and using the City of Cape Town Electricity Reading Tool responsibly!

---------
