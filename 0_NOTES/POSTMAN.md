> # POSTMAN

- > Set enviroment vairables
    - Name enviroment name
    - Set variable like : url | 127.0.0.1:3000
    - To use : use double curly braces like {{url}}/api/v1/welcome

- > Automatically accessing token from response and setting it to headers
    - Click on Test tab

    - `pm.enviroment.set('key','value')` : pm &rarr; postman, enviroment &rarr; current enviroment, set &rarr; to set

        - EXAMPLE `pm.enviroment.set('jwt',pm.response.json().token)` : jwt &rarr; key name, token &rarr; name of token from response.

    - Click on Authorization tab. Choose Type as Bearer Token. Token as {{jwt}}

    - _Above will work where we set like in which request, Example we set for signup. If we want to use it in login request then we need to set there as well._

- > Creating API Documentation
    - We can add description to each request, folder and collection.

    - Add description for enviroment variables.

    - Click on three dots right next to collection &rarr; click on 'Publish Docs' &rarr; Opens browser Window &rarr; Set whatever you like &rarr; Click on Publish collection.
    
- > Add new...