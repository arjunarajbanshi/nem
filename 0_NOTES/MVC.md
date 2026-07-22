> # MVC 

`Model` - Business logic
`View` - Presentation logic
`Controller` - Application logic

## Application vs Business logic vs View

If the code depends on Express (req, res, HTTP status codes), it's application logic While If the code expresses a business rule (e.g., "a user must be 18+", "an order can't exceed available stock"), it's business logic.

`Controller (Application Logic)`
- The controller handles HTTP-related concerns:
    - Read req.params, req.body, req.query
    - Validate request format (or call a validator)
    - Call model/service methods
    - Return HTTP responses
    - Handle errors etc


`Model (Business Logic)`
- Business logic contains the rules of your business or domain. It answers questions like:
    - What is allowed? 
    - What is forbidden?
    - How should calculations be performed?
    - What conditions must be met?

`View (Presentation)` 
- It is the layer responsible for presenting data to the user. It should contain presentation logic.
    - Displays data
    - If you're using a template engine like EJS, Pug, or Handlebars, those template files are the View.
    - HTML, CSS, conditinal display, etc showing data belongs to view.