---
layout: blog-post
title: The Danger of SQL Injections
tags:
- Technical
- SQL
- Security
---

SQL Injections. It's a term I'd heard about before but never actually understood until now. Simply put, SQL injection is when a malicious user is able to enter an SQL statement in an input field and have the database execute it. For example, let's suppose you have a product that you're selling online. You require your clients to log in in order to make a purchase. That means you need to somehow store usernames and passwords. Realistically, that means storing them in a database. There are alternatives, but chances are that it'll be SQL based. So now, when one of your users tries to log in, the first thing you do is check if their username is in the database. So you'll write something like this:

{% highlight SQL %}
statement = "SELECT * FROM users WHERE name ='" + userName + "';"
{% endhighlight %}

Now imagine if some wise guy puts in something that causes the SQL statement to do something unexpected, such as inputting the following as his username:

{% highlight SQL %}
' or '1'='1
{% endhighlight %}

The resulting statement will look something like this:

{% highlight SQL %}
SELECT * FROM users WHERE name = '' OR '1'='1';
{% endhighlight %}

Whoops. Now instead of returning a single result, the query returns everything in the table, since `'1'='1'` will always evaluate to true. How the application will handle this will be different, but it's generally not something good. A malicious user can use this to submit arbitrary SQL code and gain access to your application or wreck havoc on your database. Not something you'd want. There are several ways to avoid this. The first and most straightforward one is to make sure what the user inputs doesn't contain unwanted characters that enable this kind of SQL injection, like quotes. But this isn't always feasible. Imagine a user whose last name is O'Brian. This is a perfectly valid name but our system would reject it since it contains a quote. A better approach would be to simply escape the quote so that our ' becomes '' for example. Yet not only is it easy to miss properly escaping user input at some point, it's also not completely safe. For instance, in MySQL, characters can also be escaped by using a backslash \\. So someone could input something like:

{% highlight SQL %}
\'; DROP TABLE users; --
{% endhighlight %}

We pass the input to our character escape function, prepending a ' before the ' in the input, resulting in \''. Since ' is now escaped twice, a query using that input will see a single ' as the input followed by a closing ', then execute the rest of the statement `(DROP TABLE users;)`. Because this is a common yet difficult problem, many SQL implementations will include inbuilt functions to escape characters, so be sure to use those instead of making your own. A final approach, which is also probably the most secure, is to use prepared statements. Basically, instead of compounding the SQL query with user input, you make the query beforehand then pass the input as parameters to the query. Whatever the user inputs is then just passed on as data and is never "read" as part of the query. At any rate, SQL Injection is always something to keep in mind when building a database. It's one of if not the most common attack vector, and it's not difficult to prevent it from being an issue, as long as you think about it.
