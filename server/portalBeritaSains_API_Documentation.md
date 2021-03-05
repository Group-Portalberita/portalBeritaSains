# Portal Berita Sains

Web news portal about science, especially astronomy include with some 3rd Party API based on RESTful concept.

## List RESTful endpoints

### POST Register

create new user data

- ***URL***

  ```
  /register
  ```

- ***Method***

  ```
  POST
  ```

- ***Request Header***

  ```javascript
  not needed
  ```
  
- ***Request Body***

  ```javascript
  {
  	  "name": "admin", //string
        "email": "admin@mail.com", //string
        "password": "admin123" //string
  }
  ```
  
- ***Success Response (201 - Created)***

  ```javascript
  {
     "success": true,
     "message": "user created",
     "user": {
          "id": 1,
          "name": "admin",
          "email": "admin@mail.com",
          "password": "$2a$10$BvvoHs4KP82zG3slfWDP8ODK.g5S4K0a1K2sutK4hjRrkqmJTZlGS",
          "updatedAt": "2021-03-04T10:48:01.031Z",
          "createdAt": "2021-03-04T10:48:01.031Z"
      }
  }
  ```

- **Error Response**

  ***Response (400 - Bad Request)***

  ```javascript
  {
      "message": "Validation error: Name is required,Validation error: Email is required, Validation error: Invalid Email 					Format, Validation error: Password is required",
      "details": [
          "Name is required",
        "Email is required",
          "Invalid Email Format",
        "Password is required"
      ]
  }
  ```
  
  ***Response (500 - Internal Server Error)***
  
  ```javascript
  {
  	"message": "Internal Server Errors"
  }
  ```



### POST Login

logs user into the system

- ***URL***

  ```
  /login
  ```

- ***Method***

  ```
  POST
  ```

- ***Request Header***

  ```javascript
  not needed
  ```
  
- ***Request Body***

  ```javascript
  {
    "email": "admin@mail.com", //string
    "password": "admin123" //string
  }
  ```
  
- ***Success Response (200 - OK)***

  ```javascript
  {
      "access_token": "<your access token>"
  }
  ```
  
- **Error Response**

  *Response (404 - Not Found)*

  ```javascript
  {
      "err": "Invalid email or password"
  }
  ```



### POST Google Login

logs user into the system with Google account

- ***URL***

  ```
  /loginGoogle
  ```

- ***Method***

  ```
  POST
  ```

- ***Request Header***

  ```javascript
  not needed
  ```
  
- ***Request Body***

  ```javascript
  {
   	 token: googleUser.getAuthResponse().id_token
  }
  ```
  
- ***Success Response (200 - OK)***

  ```javascript
  {
      "access_token": "<your access token>"
  }
  ```
  
- **Error Response**

  *Response (500 - Internal Server Error)*

  ```javascript
  {
  	"message": "Internal Server Errors"
  }
  ```



### GET Berita

Access Json data from https://newsapi.org/

- ***URL***

  ```
  /berita
  ```

- *Method*****

  ```
  GET
  ```
  
- **URL Params**

  ```js
  q = 'space' // Keywords or phrases to search for in the article title and body.
  from = '2021-03-05' // A date and optional time for the oldest article allowed.(e.g. 2021-03-05 or 2021-03-05T02:40:44) 
  sortBy = 'popularity' // The order to sort the articles in. Possible options: relevancy, popularity, publishedAt
  apiKey = <your api key> //// Your unique apikey from https://newsapi.org/
  ```

- ***Request Header*** 

  ```javascript
  {
      "access_token": "<your access token>"
  }
  ```

- ***Request Body***

  ```javascript
  not needed
  ```
  
- ***Success Response (200 - OK)***

  ```javascript
  [{
      "status": "ok",
      "totalResults": 3637,
      "articles": [
          {
              "source": {
                  "id": null,
                  "name": "Lifehacker.com"
              },
              "author": "David Murphy",
              "title": "How to Back Up iCloud Photos and Videos to Google",
              "description": "We’ve talked a lot lately about leaving Google Photos for other servicest…",
              "url": "https://lifehacker.com/how-to-back-up-icloud-photos-and-videos-to-google-1846406968",
              "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/yxtjbnlsu3r0bi6bpwzr.png",
              "publishedAt": "2021-03-04T20:00:00Z",
              "content": "Weve talked a lot lately about leaving Google Photos for  (once you hit your … [+2931 chars]"
          }]
  ]    
  ```

- **Error Response**

  *Response (401 - Unauthorized)*

  ```javascript
  {
      "message": "Unauthorized"
  }
  ```

  *Response (500 - Internal Server Error)*

  ```javascript
  {
  	"message": "Internal Server Errors"
  }
  ```
  
  

### GET Image APOD

Access Json data from https://api.nasa.gov/

- ***URL***

  ```
  /apod
  ```

- ***Method***

  ```
  GET
  ```
  
- ***URL Params***

  **required:**

  ```javascript
  apikey = '<your api key>'  // your unique apikey from https://api.nasa.gov/
  count = 1 // total image want to get from https://api.nasa.gov/
  ```

- ***Request Header***

  ```javascript
  {
      "access_token": "<your access token>"
  }
  ```

- *Request Body*

  ```javascript
  not needed
  ```
  
- *Success Response (200 - OK)*

  ```javascript
  [
      {
          "date": "2005-07-06",
          "explanation": "This diverse landscape is the surface of comet Temple 1's nucleus as seen by the Deep Impact probe's Impactor Targeting Sensor. Within minutes of recording the rugged view, the landscape had changed dramatically though, as the impactor smashed into the surface near the two large, half kilometer-sized craters at picture center. Indications are that the probe penetrated well below the surface before vaporizing, sending a relatively narrow plume of debris blasting back into space. Researchers are still speculating on the final size of the crater produced by the July 4th comet crash, but material continues to spew from the impact site and has caused the faint comet to brighten significantly. Determining the crater dimensions and analyzing the debris ejected from the comet's interior will provide premier insights into the formation of comet Tempel 1, a primordial chunk of our own solar system.",
          "hdurl": "https://apod.nasa.gov/apod/image/0507/tempel1_its_mov.jpg",
          "media_type": "image",
          "service_version": "v1",
          "title": "The Landscape on Comet Tempel 1",
          "url": "https://apod.nasa.gov/apod/image/0507/tempel1_its_mov.jpg"
      },
      
  ]
  ```

- **Error Response**

  *Response (401 - Unauthorized)*

  ```javascript
  {
      "message": "Unauthorized"
  }
  ```

  *Response (500 - Internal Server Error)*

  ```javascript
  {
  	"message": "Internal Server Errors"
  }
  ```

### GET Weather

Access Json data from https://openweathermap.org/api

- *URL*

  ```
  /weather
  ```

- ***Method***

  ```
  GET
  ```
  
- ***URL Params***

  ```javascript
  q = 'Jakarta' // City name, state code and country code divided by comma, use ISO 3166 country codes
  appid = <your api key> // Your unique API key (from https://openweathermap.org/api)
  ```
  
- ***Request Header***

  ```javascript
  {
      "access_token": "<your access token>"
  }
  ```

- ***Request Body***

  ```javascript
  not needed
  ```
  
- ***Success Response (200 - OK)*** 

  ```javascript
  {
      "coord": {
          "lon": 106.8451,
          "lat": -6.2146
      },
      "weather": [
          {
              "id": 802,
              "main": "Clouds",
              "description": "scattered clouds",
              "icon": "03d"
          }
      ],
      "base": "stations",
      "main": {
          "temp": 31.59,
          "feels_like": 37.45,
          "temp_min": 29,
          "temp_max": 33.33,
          "pressure": 1011,
          "humidity": 74
      },
      "visibility": 8000,
      "wind": {
          "speed": 2.06,
          "deg": 0
      },
      "clouds": {
          "all": 40
      },
      "dt": 1614912602,
      "sys": {
          "type": 1,
          "id": 9384,
          "country": "ID",
          "sunrise": 1614898698,
          "sunset": 1614942620
      },
      "timezone": 25200,
      "id": 1642911,
      "name": "Jakarta",
      "cod": 200
  }
  ```

- Error Response

  *Response (401 - Not Found)*

  ```javascript
  {
      "message": "Unauthorized"
  }
  ```

  *Response (500 - Internal Server Error)*

  ```javascript
  {
  	"message": "Internal Server Errors"
  }
  ```
