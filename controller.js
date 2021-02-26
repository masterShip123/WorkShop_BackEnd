const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('./config/multer_config')
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)
const db = require('./models')


router.get('/', function (req, res) {

    res.send('Hello World')
})

//localhost: 1150/say/{name}
router.get('/say/:name', (req, res) => {
    res.send(`iBlur , ${req.params.name}`)
});

//localhost: 1150/say/{firstname}/{lastname}
router.get('/say/:firstname/:lastname', (req, res) => {
    res.send(`${req.params.firstname} , ${req.params.lastname} `)
});

//localhost: 1150/product?name=macbook
router.get('/product', async (req, res) => { //async เพื่อไม่ดึงมาเลย
    try {
        const result = await db.Products.findAll({
            //order: [
            //    ['id', 'DESC']
            //],
            //attributes: ['name', 'image'] // select name,image from products

        }) //select all
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

});

router.get('/product/:id', async (req, res) => { //async เพื่อไม่ดึงมาเลย
    try {
        const result = await db.Products.findOne({
            where: {
                id: req.params.id
            }
            //attributes: ['name', 'image'] // select name,image from products

        }) //select where
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: 'Product not found' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

});

router.post('/product', (req, res) => {

    upload(req, res,async (err) => {
        if (err instanceof multer.MulterError) { //Error Exception
            console.log(`error: ${JSON.stringify(err)}`)
            return res.status(500).json({ message: err})
        } else if (err) {
            console.log(`error: ${JSON.stringify(err)}`)
           return res.status(500).json({ message: err })
        }
        
        const data ={
            ...req.body,
            image: req.file ? req.file.filename : undefined
        }

        try {
            const product = await db.Products.create(data)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })
});

router.put('/product/:id',async (req, res) => {
    try {
        const result = await db.Products.findOne({
            where: {
                id: req.params.id
            },
        }) //select where
        if (!result) {
            res.status(404).json({ message: 'Product not found' })
        } 
        updateProduct(req,res,result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

function updateProduct(req,res,product){
    upload(req, res,async (err) => {
        if (err instanceof multer.MulterError) { //Error Exception
            console.log(`error: ${JSON.stringify(err)}`)
            return res.status(500).json({ message: err})
        } else if (err) {
            console.log(`error: ${JSON.stringify(err)}`)
           return res.status(500).json({ message: err })
        }
        
        const data ={
            ...req.body,
            image: req.file ? req.file.filename : undefined
        }

        try {
            const [update] = await db.Products.update(data, {
                where: {
                    id: product.id
                }
            })
            if(update){
                const updateProduct = await db.Products.findByPk(product.id)
                res.status(200).json(updateProduct)
            }else{
                throw new Error('Product Not Found')
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })
}

router.delete('/product/:id',async (req, res) => {
    try {
        const deleted = await db.Products.destroy({
            where: {
                id: req.params.id
            },
        }) //select where
        if (!deleted) {
            res.status(404).json({ message: 'Product not found' })
        }else{
            res.status(204).json({ message: 'Product Delete' })
        } 
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router