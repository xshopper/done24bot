# Done24bot
It automates everything in the web including Instagram, Facebook, Webpages, Telegram, TikTok.

# Download 
the app from [Releases](https://github.com/xshopper/done24bot_v3/releases)

# Use it!

Download the latest release of the application from the releases. Start the application and wait a bit. At the first start it will download the chrome for execution

Search for an execution plan like this: Demo.
This script will do something :) ... It goes to cnn, clicks here and there and quits :)
You can see the history of your executed scripts in the [Execution History](Execution History)

## Execution Plan

An execution Plan is a collection of Lists
An execution plan can have parameters, these parameters are only visible to the specific user.

# Develop

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

