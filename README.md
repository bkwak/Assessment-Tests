# Assessment Tests

### SETUP ###
Make sure to install jest by running "npm install jest -D" or "npm install jest supertest -D"

Add the test files into the appropriate assessment's "test" directory. Some things to keep in mind before starting:
  - follow the instructions at the top of the file in the "description" section to appropriately configure the assessments to work properly with the tests
  - the import file paths at the top of the files may have to be adjusted
  - node modules may have to be deleted and then reinstalled before the tests will work

### RUN TESTS ###
Run the tests with "jest" in the terminal or to only run a specific test, type "jest <filename>.test"

### NOTES ###
Remember, you'll still have to look over the resident's code, but this helps check for the edge cases and functionality specified in the grading rubric. Feel free to PR with more tests or anything else you can think of!

### ISSUES ###
If Jest hangs up before running tests, this is most likely an issue with the resident's code rather than a Jest issue (most likely unbound recursion or parsing error) - You can also see if the file will execute in the terminal with the command "node <relative path to file>". 
