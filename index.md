# Done24bot
It automates everything in the web including Instagram, Facebook, Webpages, Telegram, TikTok.

# Download 
the app from [Releases](https://github.com/xshopper/done24bot_v3/releases)

# Use it!

1. Download the latest release of the application from the releases. Start the application and wait a bit. At the first start it will download the chrome for execution

2. Register and log in to the application.

3. Search for an execution plan like this: Demo.
This script will do something :) ... It goes to cnn, clicks here and there and quits :)
You can see the history of your executed scripts in the [Execution History](Execution History)

# Support

If you have any questions please open a new [discussion](https://github.com/xshopper/done24bot/discussions), try try our best to answer

## Execution Plan

This is what you should run/ schedule, this is a collection of lists / Tasks. An execution plan is what does something in the web :)
An execution plan can have parameters, these parameters are only visible to the specific user.

## Execution History

Here you can see your previous executions.

# FAQ

* Is it working in mobile? -> Not yet, as soon as the desktop application became stable we will work on the mobile version
* Is it free? -> Yes, you can run scripts but the script will run max 5 mins and you can't use the scheduler
* How can I pay? -> With paypal, 
* Can I have a new script? yes! please email your requirement to hello@done24bot.com
* Is it safe? -> We try to make it safe as possible, have checks in the script ... etc
* Do you save any passwords? -> No, we do not save the passwords from the website, we can save the cookies and local storage
* How much is this? -> Desktop version cost $20 USD per month with unlimited run

## For Script Developers

Check out the [Execution Plan](Execution-Plan), [List](List) and [Task](Task) Sections

# Elements

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

You can use the app['jobExec'] , app['args'], app['puppeteer'] objects

### Return

when you set the return than in the subsequent task you can refer it by app[**and here the return string**]

### Parameters

It is having also a default parameter.
When you save and run a task it will pick up the default parameter.
The parameter value to be a json object

Task parameter is accessible from: app['args']
The execution level parameters are accessible from: app['jobExec']

<img width="500" alt="Screen Shot 2021-09-20 at 3 31 48 pm" src="https://user-images.githubusercontent.com/16809418/133960537-05f9de57-a6cd-45aa-bc01-07ac020b38bb.png">

## List

You can organise the Tasks into lists
When you set the order of the [Task](Task)s than you can set which parameter you want to run this specific task in the list.
You also can test the Lists.
A list does not have any specific parameter.

## Execution Plan

An execution plan can have parameters, these parameters are only visible to the specific user.
