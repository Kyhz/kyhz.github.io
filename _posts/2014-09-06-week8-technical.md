---
layout: blog-post
title: What is Ruby on Rails?
tags:
- Technical
- Ruby
- Rails
- DBC
---
![Rails Logo](/assets/Ruby_on_Rails-logo.png)

When I got involved with DevBootCamp, I was told I'd work with Ruby on Rails. I've seen some Ruby so far but not a whole lotta Rails. Which actually makes sense, since Rails is a full-stack, web application framework that works with Ruby. Okay, so what do those words mean? A framework is pretty much what you'd think it is: a set of tools that you can use to create a certain type of software. In this case, Rails is a web app framework, which means we can use it to make our lives easier when developing web apps. When you start a new project in Rails, it comes with a bunch of stuff.

![Terminal output of creating a new Rails project](/assets/rubyrailstestapp.png)

Rails, like a lot of web frameworks, works using the [Model-View-Controller](http://blog.codinghorror.com/understanding-model-view-controller/) pattern. This is a very general coding concept, but in our particular case we can roughly equate Model with a database of sorts, View with the web page as displayed to the user, and Controller being the code behind that handles the actual data and does stuff with it. Because Rails is one cohesive package that lets us build an entire app using no other outside tools, it is called a _full-stack_ framework. It even comes with its own web server, WEBrick by default. Compared to other some other web frameworks, Rails actively tries to enforces two main coding patterns. The first is DRY (Don't Repeat Yourself). The idea is to re-use the same code in multiple places instead of duplicating it. This usually reduces errors and makes debugging easier. The other, which is more interesting to me, is Convention over Configuration. Basically, Rails makes assumptions on how people tend to structure their project and will default to these values unless specified otherwise. If you, for example, make a class called _Users_ in the model, the corresponding table in the database it is linked to will be called u_sers_ by default. This approach, combined with the DRY philosophy, leads to a very easy and quick development phase. There is obviously a lot more to Rails, most of it I do not know myself, but this should hopefully give you an inkling of why Rails is fantastic.