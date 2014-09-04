---
layout: blog-post
title: Inline vs Inline-block
tags: 
- CSS
- Frontend
- Technical
---
There are different ways to position content in HTML to make your page look good. Two of these are the CSS properties display:inline and display: inline-block. We are going to examine the differences between these two styles.

### Inline

![Inline]({{ site.url }}/assets/inline.jpg)

{% highlight css}
.inline{
	display: inline;
	background: grey;
}
{% endhighlight %}
{% highlight HTML %}
<p class="inline"> Lorem ipsum dolor...</p>
<p class="inline"> Lorem ipsum dolor...</p>
{% endhighlight %}

Inline is the default property for some elements such as `<span>` and `<strong>`. Inline positioning displays content sequentially without any spaces or line breaks. As the name "inline" implies, it basically keeps things on the same horizantal line.

The image above is actually two HTML paragraphs. Normally there would be a break between the two and they would be stacked vertically, but here because we use display: inline, the second paragraph begins immediately following the end of the first and therefore they appear as one.


### Inline-Block

![Inline-block]({{ site.url }}/assets/inline-block.jpg)

{% highlight css}
.inline{
    display: inline;
    background: grey;
}
{% endhighlight %}
{% highlight HTML %}
<p class="inline-block"> Lorem ipsum dolor...</p>
<p class="inline-block"> Lorem ipsum dolor...</p>
{% endhighlight %}

Inline-block is a method of displaying HTML in block on the same horizantal line. Normally display: block displays HTML elements stacked vertically. Display: inline-block stacks them horizantally. It can be used as an alternative to float.

The above image displays the same two paragraphs using display: inline-block. As the name inline-block suggests, the elements are displayed as blocks on the same horizontal line. If they were displayed as regular blocks they would display as vertically stacked.
