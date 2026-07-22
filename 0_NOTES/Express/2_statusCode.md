> # STATUS CODES

> **SUCCESS : _Indicate the request was successfully received and processed._**

200 &rarr; `OK` : _Success (GET,PUT,PATCH)_

201 &rarr; `Created` : _Resource created successfully (POST)_

202 &rarr; `Accepted` : _Request accepted but not processed_ yet

204 &rarr; `No content` : _Success but no body (DELETE)_

<br/>

> **CLIENT ERRORS : _Indicate something is wrong with the client's request._**

400 &rarr; `Bad request` : _General validation error, malformed request_

401 &rarr; `Unauthorized` : _not loged in, missing/invalid token_

403 &rarr; `Forbidden` : _Authenticated but no permission_

404 &rarr; `Not found` : _Resource doesn't exist_

409 &rarr; `Conflict` : _duplicate, already exists (email,username etc)_

422 &rarr; `Unprocessable entity` : _Semantic validation errors_

<br/>

> **SERVER SIDE ERRORS : _Indicate the server failed to fulfill a valid request._**

500 &rarr; `Internal Server Error` : _Generic server error (catch-all)_

501 &rarr; `Not Implemented` : _Feature not supported_

502 &rarr; `Bad Gateway` : _Invalid response from upstream_

503 &rarr; `Service Unavailable` : _Server down for maintenance_
