go inside the folder "todo-list"

run 'npm install'

run 'npm start'

on another terminal go inside the folder "server"


go to localhost:3000 in browser

run 'npm install'

run 'PORT=3001 npm start'


now connects to the server to store the tasks (still gets lost when the server is stopped).

on start it will do a GET request to recieve a json with the array of the tasks in the server and update them on the client.

on task adding or editing it will POST to the server and it will update. the ID of the tasks is managed on the server.