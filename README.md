## Running the app locally

__Steps__
1) `npm install`
2) `npm run startDev`



### Check out the live version
[https://dry-thicket-52260.herokuapp.com/]()


## Process

__Part 1__ — approx. 2 hours

After reading through the assignment, I began a little research into the suggested API's and realized how little I know the stock market. The API's looked pretty straight forward deciphering some of the stock lingo held me up.

Once I had a little more understanding on the very basics of stock trading, I began sketching and writing out what information would be important and how it each view would be loosely structured. I decided on two primary views. Once showing the stocks you currently have and once where you could search and browse available stocks.

Once I had some rough sketches/notes of what I wanted to create and the main routes figured out, I decided to start on the backend fist. I set up a pretty simple Express server with an account controller and stock controller. I decided to forgo models and a database and instead created a JSON like file to use as a mock database. I used Postman to help test my routes and and controllers while developing it.


__Part 2__ — approx. 4 hours

After completing the server, the next day I started working the front end. I decided to use react with create-react-app to speed up all the configuration of React and Webpack. This is where I devoted most my time and also got hung up on small bugs.

I started out building the main app container that would retrieve the data from the server and then pass it down to different components. For the most part everything seemed to be working fine until I started rendering the data. I then found a lot of issues with integers accidentally getting converted to strings that I had to hunt down and fix. This caused quite a few different types of bugs.

It took a lot longer than expected to hook everything to properly interact with the server. At this point I knew a lot of the code needed refactoring. I was repeating code left and right. I knew I was running out of time though, so I kept going as long as it worked and tried to comment areas I should come back to.

Next, I started working on the search view. This went much faster as I was mainly reusing components and functions I had already created. I called it quits for the night after getting the main layout structure setup, thinking there wasn't much left to do.

__Part 3__ — approx. 4 hours

The next day was supposed to be finishing up the search and creating a way to add or remove money. The search is about as simple as I could set it up and would have really like to work on it more, but it works I guess (if you know the correct stock symbol...).

After being mostly complete with the app, I started playing around with it a bit more and discovered I wasn't handling the currency decimal place correctly. I did some ~~googleing~~ stackoverflowing on how to fix the floating point issue, but ultimately just decided to `toFixed(2)` to cut off the extra decimal places. I know this isn't the correct way, but chose to do it for now.

Deploying the project also took a little longer than I wanted. I ran into some yarn.lock problems that I wasn't familiar with but ended up being really simple to fix. Just had to update the yarn file and check it into git.

__Summary__

This was a somewhat aggressive timeframe for me and I ended up being about 2 hours over where I was supposed to. Being a designer I think I got a little too hung up with how it looked, even though I was trying to purposefully not think about the design too much.

## Known Bugs + Areas of Improvement
- Nothing prevents you from removing more funds than you actually have, creating negative funds.
- Navigation layout breaks on mobile.
- Add/Remove funds modal is not styled at all.
- Sometime clicking 'Cancel' in the purchase or sell modal doesn't close it.
- React code needs a lot of refactoring. Components should be split into smaller reusable components.
- CSS also needs a lot of refactoring. Creating a some variables would help a lot.## Running the app locally

__Steps__
1) `npm install`
2) `npm run startDev`



### Check out the live version
[https://dry-thicket-52260.herokuapp.com/]()


## Process

__Part 1__ — approx. 2 hours

After reading through the assignment, I began a little research into the suggested API's and realized how little I know the stock market. The API's looked pretty straight forward deciphering some of the stock lingo held me up.

Once I had a little more understanding on the very basics of stock trading, I began sketching and writing out what information would be important and how it each view would be loosely structured. I decided on two primary views. Once showing the stocks you currently have and once where you could search and browse available stocks.

Once I had some rough sketches/notes of what I wanted to create and the main routes figured out, I decided to start on the backend fist. I set up a pretty simple Express server with an account controller and stock controller. I decided to forgo models and a database and instead created a JSON like file to use as a mock database. I used Postman to help test my routes and and controllers while developing it.


__Part 2__ — approx. 4 hours

After completeing the server, the next day I started working the front end. I decided to use react with create-react-app to speed up all the configuration of React and Webpack. This is where I devoted most my time and also got hung up on small bugs.

I started out building the main app container that would retrieve the data from the server and then pass it down to different components. For the most part everything seemed to be working fine until I started rendering the data. I then found a lot of issues with integers accidently getting converted to strings that I had to hunt down and fix. This caused quite a few different types of bugs.

It took a lot longer than expected to hook everything to properly interact with the server. At this point I knew a lot of the code needed refactoring. I was repeating code left and right. I knew I was running out of time though, so I kept going as long as it worked and tried to comment areas I should come back to.

Next, I started working on the search view. This went much faster as I was mainly reusing components and functions I had already created. I called it quits for the night after getting the main layout structure setup, thinking there wasn't much left to do.

__Part 3__ — approx. 4 hours

The next day was supposed to be finishing up the search and creating a way to add or remove money. The search is about as simple as I could set it up and would have really like to work on it more, but it works I guess (if you know the correct stock symbol...).

After being mostly complete with the app, I started playing around with it a bit more and discovered I wasn't handly the currency decimal place correctly. I did some ~~googleing~~ stackoverflowing on how to fix the floating point issue, but ultimately just decided to `toFixed(2)` to cut off the extra decimal places. I know this isn't the correct way, but chose to do it for now.

Deploying the project also took a little longer than I wanted. I ran into some yarn.lock problems that I wasn't familiar with but ended up being really simple to fix. Just had to update the yarn file and check it into git.

__Summarry__

This was a somewhat aggressive timeframe for me and I ended up being about 2 hours over where I was supposed to. Being a designer I think I got a little too hungup with how it looked, even though I was trying to purposfully not think about the design too much.

## Known Bugs + Areas of Improvement
- Nothing prevents you from removing more funds than you actually have, creating negative funds.
- Navigation layout breaks on mobile.
- Add/Remove funds modal is not styled at all.
- Sometime clicking 'Cancel' in the pruchase or sell modal doesn't close it.
- React code needs a lot of refactoring. Components should be split into smaller resuable components.
- CSS also needs a lot of refactoring. Creating a some variables would help a lot.
