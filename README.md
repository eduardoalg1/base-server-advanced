EXAMPLE SERVER INITIALIZATION

-- DEV MODE --
- if you want to run watching changes use export  APP_ENV=dev && docker-compose up
in this particular case the .env file has the APP_ENV var set as dev by default. If you have this set you can only run docker-compose-up

-- PROD MODE --
- to run the server in a production environment you need to run APP_ENV=prod && docker-compose up

-- TEST --
- use yarn test test

----------------------------------------------

Because in the creation of this server we don't have the hability to create a token, you can use this one to be able to acces to the PUT and DELETE endpoint

- cnNvcnJtaXJvYXNvZm5pY2FpZm5paWl5b29maWcyb3QkS3BsdXlKaEhIc1FZRjdtTEFHV0RzVWZTT1ViQTNZS2gwakk3NWFiUmowK0E4ejVtSEJ2NVA3MlFwdlJjRTdPbVB4TEVKY1ZTQ05DbGRnMXJDcFZtUTBDQVFmbEVsN0xxeG1Za1hSL3o5VlhMOGJublBib1U1NVU4aEVQaHQwZWxHd1U3b2R5clVZWEMvcWZtYWhuYTRuRXMzTldubmxnQm00RUhYenRtb2d5V0JsWjArc3JjYjI1STN3YzBrWGFOVnF1Ukx2QjJhQmFtTkF2SytVV3NQV3BRcmx0RjhVaWEvUGJTMEpMdmZMUW92K1g1bzRZRVg5UWJIOGJDZDNsblJmVlp2Y2I4WTVHalZKSWJrUW5sQkxaRmJ2SVdSSTlXNmJxcThTZGtyc00vaHFJS28rNTUxc0ZmT0tKejU0TDZZeERsTVRCRzNYVVVTRC9pTDhMN251V29MMlhhOW9QNWRGMDJwaVZhako0L2E4ZTRZa3d5VlFhQ01naUcydVBI

- In order to use the token, you should need to send the request with this token set in the Authorization header.

I created this based on the createToken method located in /utils/TokenUtils, this should long 100 days without expire (created at August 13 2022), only because the propuse of this test. In a normal escenario it should long less. Also the middleware to validate the token only is triggered if the method is PUT or DELETE because of the requirements of the excercise. In general I handle this checking the url called and having a white list to avoid checking specific routes.

----------------------------------------------------------------

