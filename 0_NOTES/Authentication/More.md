```js
// authentication(login) is required after this middleware for all below routes
router.use(authenticate)
router.delete('/deleteMe', deleteMe)
router.get('/me',getMe)

// login + permission will also be required after this middleware for all below routes
router.use(restrictTo('admin'))
router
    .route('/')
    .post(createUser)
    .delete(deleteUser)
``` 