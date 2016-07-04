#[JSSolutions](http://jssolutionsdev.com/ "JSSolutions Homepage") Final Test :pray:

[![Join the chat at https://gitter.im/CandyOgre/pizza-day](https://badges.gitter.im/CandyOgre/pizza-day.svg)](https://gitter.im/CandyOgre/pizza-day?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
You are software engineer in small development company. Every Wednesday your teammates order pizza delivery in Local Restaurant. Usually there is about 10-15 order items (pizzas, juice
etc.) per order. Also, Local Restaurant provides discount coupons if pizza delivery guy was late.
##The Problem
After pizza was ordered you need to calculate how many $ each of your co workers owes you in order to pay pizza delivery guy. So, you need to split the check. And there is another problem.
Each time you have 1 or couple coupons for free pizza. To keep order you need split this discount (pizza price) between all coworkers who ordered pizza. Also, probably you noticed that you need
to do same procedure every Wednesday and it is annoying. So, why not to write small app for it?

Let’s call it “Pizza Day”
---

App features:
* Sign In/Sign Up
* Google authentication
* Create users Groups (so, you don’t need to search for your co workers over whole users list in app). Only Group creator may invite or remove people. Group should have name,
image/logo, menu items that can be ordered in this group (made for simplicity, so we avoiding creating of restaurant).
* Menu item should contain it’s name and price. Any group participant can create menu items or edit existing ones.
* Group creator is able to add/remove free pizza coupons (each coupon works only for specific pizza (menu item)  create new “Pizza day” Event. Event contains event date, event status (ordering/ordered/delivering/delivered), user’s Group (that takes part in Event). Also, each user from the Group should confirm he is taking part in Event, so he can add order items in this event.
* After Event creating each group participant (user) may choose menu items he want to order (+ specify count).
* When all event participants confirmed their order event status is changing to ordered. So, each user receives to his email list of items he ordered and total amount $ he should pay to event creator.
* Event creator receives same email as simple participants + event summary (list menu items he should order in “Local Restaurant”). After ordering event creator is able to change event status to delivering.
* [OPTIONAL] Ability to add discount coupons for specific menu items.

***
[Hosted on Heroku](https://best-pizza-day-ever.herokuapp.com)

***
##How to run
1.`git clone https://github.com/CandyOgre/pizza-day.git`

2.`cd pizza-day`

3.`curl https://install.meteor.com/ | sh`

4.`meteor npm install`

5.`meteor npm start`

6.`http://localhost:3000/`



***
##Technologies stack
* Meteor 1.3
* Blaze
* MongoDB

######All packages you can check [here](https://github.com/CandyOgre/pizza-day/blob/master/.meteor/packages)

***
##Screenshots

####Groups page
![Groups page](http://i63.tinypic.com/30wqw5d.png)

####Group page (event not started)
![Group page. No event](http://i63.tinypic.com/w8m7vl.png)

####Invites page
![Invites page](http://i68.tinypic.com/wu2i5g.png)

####Event page
![Event page](http://i68.tinypic.com/dpe3ar.png)

####When remove group
![Group remove](http://i64.tinypic.com/15yvus8.png)
