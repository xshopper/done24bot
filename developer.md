<script type="text/javascript" src="/chat.js" ></script>
<script type="text/javascript" src="/google.js" ></script>
# For Script Developers

Task, List, Execution plan been described bellow as the basis of the 

## Task
Task is the smalleste element of the execution plan.
Task can be created or edited in a task editor

### Task name
Name is not unique in the application but people will search by name.
All names should be lowercase as people
Prefer to set the name like 
instagram - and what this task do

### Javascript code
The code is javascript, if you return any variable it can be used in the subsequent tasks (see Return)
You can use the 

* app['jobExec'] - task execution details for each task, including sequence
* app['args'] - pask parameter
* app['argsExec'] - execution plan level parameters
* app['puppeteer'] objects
* await app['app'].saveData(key , value) - sava some data to the database
* var data = await app['app'].getData(key) - get data back from the database

### Save data to the database
await app['api'].saveData("here comes the unique identifier" , data);
data  has to be a json!

### Retrieve data from the database
var data = await app['api'].getData("the unique identifier");
data will be a json

#### Special tasks
goto -> when the Return is goto than it will jump to the sequence what have been returned in the script
console.log() -> will appear in the console of the application as well in https://v3.done24bot.com/console


### Return
when you set the return than in the subsequent task you can refer it by app[**and here the return string**]

like the return is label1 and in the script you have "return 1"
in the subsequent tasks you can reger to this value in app['label1'] what will be 1

### Parameters
It is having also a default parameter.
When you save and run a task it will pick up the default parameter.
The parameter value to be a json object

Task parameter is accessible from: app['args']
The execution level parameters are accessible from: app['argsExec']

You have to create at least one public parameter to able to create parameters by other users!

## List
You can organise the Tasks into lists
When you set the order of the [Task](Task)s than you can set which parameter you want to run this specific task in the list.
You also can test the Lists.
A list does not have any specific parameter.

## Script (Execution Plan)
An execution plan can have parameters, these parameters are only visible to the specific user.
