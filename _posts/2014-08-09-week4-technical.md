---
layout: blog-post
title: Enumerable#group_by
tags:
- Technical
- Ruby
- Enumerable
---
So let's talk Ruby. Specifically, about a module method of Enumerable called group_by. Let's first go over what the heck a module is. If you're familiar with object-oriented programming, you know what a class is. If you're not, then think of a class as a blueprint for a thing. You define that thing's properties and ways to maniputale and access information about that thing inside a class. Using this blueprint, you can then create new instances of that thing which will have the properties you defined available to them. Ruby has classes and they are great for a lot of things, but they also have this thing called Modules. They're very similar to classes in that they also contain constants and functions, but the difference is that you don't need an actual object to call the functions defined inside a module, unlike classes. For instance Math is a module. If you want to calculate a square root or a cosine, you'll need to call Math.sqrt() or Math.cos(). Enumerable is one of those modules. And it works with arrays and hashes in particular. But wait, didn't I just say modules didn't need objects to be called, and arrays and hashes are, well, objects? Well that's because the Enumerable module was _mixed in_. But let's just ignore that part since I haven't yet actually managed to talk about the thing I'm supposed to be blogging about.

So what does group_by do? Basically it lets you sort your array or hash or whatever into bins. You get to decide how they are sorted by specifying some rule inside a block. But it's probably just easier to explain with an example.

{% highlight ruby %}
hash = {"Chrono Trigger" => 1995, "Super Mario 64" => 1996, "Diablo" => 1996, "Street Fighter Alpha 2" => 1996, "Megaman X" => 1993, "Tactics Ogre" => 1995}
hash.group_by {|k,v| v}
{1995=>[["Chrono Trigger", 1995], ["Tactics Ogre", 1995]], 1996=>[["Super Mario 64", 1996], ["Diablo", 1996], ["Street Fighter Alpha 2", 1996]], 1993=>[["Megaman X", 1993]]}
{% endhighlight %}

So we take a hash of games and their release dates, then we call group_by and tell it to sort it by the hash values, i.e by release date, and we get a hash where the keys are the release dates and the values are arrays of the games that came out that year. In more abstract terms, the result of group_by is a hash whose keys are the evaluated result of the block passed to it and the values are arrays of elements in the collection that evaluated to that result. This is a very powerful tool since it allows us to easily sort data using very flexible criteria. For example, suppose we have an array of mixed data, like the one we had in challenge 2 of this week. We can use group_by to isolate a specific type of data.

{% highlight ruby %}
i_want_pets = ["I", "want", 3, "pets", "but", "only", "have", 2 ]
no_numbers_allowed = i_want_pets.group_by{|x| x.is_a?(Integer)}[false]
["I", "want", "pets", "but", "only", "have"]
{% endhighlight %}

`is_a?(Integer)` checks each element to see if it's a number and returns a boolean. So we have a hash with 2 keys: true and false, the former containing all the integers and the latter containing everything else. We simply select the value of the false bin, which is an array of things not numbers. Pretty cool, depending on how high your standards for coolness are. Personally I think it's great and foresee using it in a lot of situations. Until next time.