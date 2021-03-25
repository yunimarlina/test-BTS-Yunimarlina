const router = require('express').Router()
const Controller = require('../Controller/Controller')
const authoriztion = require('../auth/authoriztion')


router.post('/api/users/signup', Controller.register)
router.post('/api/users/signin', Controller.login)
router.use(authoriztion)
router.get('/api/users', Controller.showAllUser)
router.post('/api/shopping', Controller.createShopping)

router.get('/api/shopping', Controller.showAllShoping)
router.get('/api/shopping/:id', Controller.showDetailShoping)
router.put('/api/shopping/:id', Controller.updateShop)
router.delete('/api/shopping/:id', Controller.delete)

module.exports = router