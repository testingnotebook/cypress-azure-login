# cypress-azure-login

## Purpose of Repo

At the time of writing Cypress does not support tests across multiple domains. If your application in test uses Azure AD to login then you may have cross-origin errors when automating the login process with Cypress.

As a workaround in this repo the Cypress test Puppeteer will open a new browser to login via the UI then return the local storage created after authentication. Note if your application uses cookies you will need to amend the code below to return cookies instead of the local storage.

Supporting repo for the post at https://testingnotebook.com/cypress-azure-login/. Please view there for more information and instructions.

## Running Tests

Run `npm i` to install the dependencies.

`npm test` will open Cypress in interactive mode.

## Tips

Besure to replace all the values you need, do a project wide search on **{REPLAC**

If your script is failing try switching puppeteer headless mode off to help debugging, this is set in the Cypress command.
