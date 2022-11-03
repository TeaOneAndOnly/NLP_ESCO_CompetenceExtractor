

### Caution!

Only tested on unix (mac) and not on windows. May not work on windows. 

### Requirements

- python3



### Setup

```1.) python3 -m venv env ```

```2.a) Linux/Mac: source env/bin/activate```
```2.b) Windows: env\Scripts\activate.bat```

```pip install -r requirements.txt```

```python -m spacy download en_core_web_sm```


### Execution

```python extractCompetencies.py -f /path/to/file```

will extract competencies of a text when an esco competency is contained. You can test the script with the testfile.txt in the root folder. 


### Web Application

There is an web app where you cant test the Competency Extractor. The web app is based on NextJS. 

Follow these steps to start the web app

```1.) go to the folder /backend/ ```


```2.) npm install ```

```3.) npm run dev```


The first time the server starts up two users and some other tables are created. The initialization can take up to **5 min** (just the first time in order to create the esco skills). Just be patient and do not interrupt the process or **do not** save any files while waiting till you get the message: ```> Ready on http://localhost:3000 ```. If you accidentially stop the process just restart the process by deleting the files in backend/db (except init) and run npm run dev again.

The Admin can insert job postings while the User can view job postings based on filter criterias.

Credentials for User: 

 **USER**
**12345**

Credentials for Admin:

**ADMIN**
**12345**


There's no need to setup a database, since a file based persistence is chosen. Under the folder 
/backend/db/ you see all Tables after the server starts up. 


```4.) Go to localhost:3000 and login with one of the user ```
