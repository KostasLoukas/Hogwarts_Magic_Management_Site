# Hogwarts Magic Management Site

This project involves a management system for potions and spells from Hogwarts Magic School. It contains a Front End
written in HTML and Javascript and a Back End written in NodeJS and ExpressJS with a database at MongoDB.

WARNING! The two ends ARE NOT connected and work independently.

The below picture show the working capability of the Front End:
<img width="1345" height="579" alt="image" src="https://github.com/user-attachments/assets/485c8359-0270-45a4-8f87-a8c88611aa0d" />

The image above shows the registration of a spell onto the front end of the web app. The spell can be upgraded
using the up arrows, edited using the pencil icon and deleted from the list with the cross icon. Of course, new
spells/potions can be created using the form to the left of the screen.

The Back End of the application works when using the tool "Postman" to send requests and receive responses from
the NodeJS web server connected with a MongoDB database.

WARNING: For resource management, the database is paused for the time being and cannot be used to test the 
functionality of the Back End properly. Thus, some examples of said requests and responses can be found
below (they were recorded from Postman's interface). However, you can use your own MongoDB database and credentials
by replacing the "*"s in the server.js file on line 8 under the "hmm" folder. The requests are send via the link shown at 
the top of the page on Postman's interface and can include a body or not. The response from the server ALWAYS includes
a body, if the request was valid:
<img width="640" height="660" alt="image" src="https://github.com/user-attachments/assets/4511d8e9-0850-4a0f-aa4c-6f1a029b9337" />
<img width="634" height="533" alt="image" src="https://github.com/user-attachments/assets/e5c6b45d-852d-49d3-bff7-a35b5dd2906f" />
<img width="626" height="532" alt="image" src="https://github.com/user-attachments/assets/1346c956-a53a-4a73-92f9-f31de59cbb1c" />
<img width="626" height="540" alt="image" src="https://github.com/user-attachments/assets/29d6181f-4176-4545-bd4e-aa36bd8b70df" />
<img width="624" height="564" alt="image" src="https://github.com/user-attachments/assets/32923fb1-3604-45c1-9263-e9aff65e6ff1" />
<img width="629" height="534" alt="image" src="https://github.com/user-attachments/assets/ee040ef9-d962-4f4c-88e3-caa25f7c9481" />
<img width="630" height="454" alt="image" src="https://github.com/user-attachments/assets/7810d9e5-bb28-4007-ae5e-58202b8ca75d" />
<img width="616" height="330" alt="image" src="https://github.com/user-attachments/assets/265ef3b3-5b88-4c33-916a-a339b7a860b1" />
<img width="645" height="434" alt="image" src="https://github.com/user-attachments/assets/5468226c-a94a-4218-8757-c309f6a2c65c" />
<img width="616" height="426" alt="image" src="https://github.com/user-attachments/assets/20391c44-33d1-4697-8217-b67d7654cbbe" />
