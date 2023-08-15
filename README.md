## The project is based on
As a user, I need to be able to log in to the platform to be able to view and search for information
- The username and password are correct.
- If they are not correct, an error message should be displayed.
- In order to log in, the account must exist.
- If it does not exist, it should display an error message.
- If the username and password are correct, I must view the dashboard of the platform.
- The login must have 1 field to be able to capture the email, 1 field to be able to capture the password and a button to start the session.
- Email validation (valid email)

As a user, I need to view a company search engine to find the total number of jobs in the captured company.
- I can't access this section if I'm not logged in.
- There must be an input to capture the companies, there must be a button that executes the search.
- If there is no result, it should display an error message.
- If there is a search result, it should show a success message.
- You cannot search with special characters.
- Cannot search for empty strings (the user did not type anything) should show an error message.
- The information I obtain from the occ must be stored in our database.
- The information that I need to obtain from the occ is the name of the company, total number of jobs and date of search.
If you make a search that existed, both are kept in the database.
- Once the search is done, the history must be updated.

As a user I need to view the history of the searches carried out to keep track of them.
- I can't access this section if I'm not logged in.
- The history must be updated after performing a search.
- The history must be in the same section as the search engine.
- If I do not have any information, a legend should be displayed indicating that there is no information yet.
- The following columns must be displayed: Row_Number, Company_Name, Total_Jobs, Search_Date.
- I can perform the following ordering of total vacancies (descending), company name (alphabetic) and date of creation (ascending and descending)
- When loading the page, the history must be displayed.
