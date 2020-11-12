# recruitment-assessment-comprehensive-A-tests
Tests for Grad Assessment

### SETUP ###
Make sure to install jest by running "npm install jest -D".

Create two new files in the project's 'test' folder and then copy the code into each file. 

### RUN TESTS ###
Run the tests with "jest" in the terminal or to only run a specific test, type "jest <filename>.test"

### NOTES ###
Remember, you'll still have to look over the resident's code, but this helps check for the edge cases and functionality specified in the grading rubric. Feel free to PR with more tests or anything else you can think of!

### ISSUES ###
If Jest hangs up before running tests, this is most likely an issue with the resident's code rathern than a Jest issue. If this happens in when running the ds.test file, the cause is most likely some kind of unbound recursion in one of the resident's methods. You can also see if the file will execute in the terminal with the command "node <relative path to file>". 
