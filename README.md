Hey,

This project is a scheduling site/system based on opening and closing hours. For example, if a business opens at 8:00 AM and closes at 6:00 PM, customers can only schedule appointments within this timeframe.

If a customer schedules an appointment at 9:00 AM, the next available slot will be from 9:30 AM onwards, but you can change this. Keep in mind your service capacity, as allowing multiple appointments at the same time could result in a congestion of your services.

This project runs on Next 13, with ChakraUI and Firebase under the hood. Next was chosen for its ease of use and extensive compatibility (and packages). ChakraUI was selected for its completeness, and Firebase for its low or no cost, depending on the size of your business and the monthly entries in the database. On average, for up to 5,000 monthly appointments, there is no cost, meaning Firebase offers a robust and comprehensive free package.

The portal has two sections. The first is the user area for scheduling, which does not require a login. The second is for the service provider, such as the business/employee, to log in and see what has been scheduled and when.

You can also schedule to send and receive emails when each action is performed, for example, a few minutes before an appointment, the customer and you can receive a reminder or validation, as well as notifications for cancellations or new appointments.

Here's an image of the portal:

[!](https://imgur.com/a/u7lm97j)

Even though the project is archived, all its functions continue to work. You just need to configure it for your Firebase project within the Firebase.js file.

See you later.
