import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
   return jwt.sign({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }, 'hello123', { expiresIn:'30d'})
}

export const auth = (req, res, next) => {
   const authorization = req.headers.authorization

   if (authorization) {
      const token = authorization.slice(7, authorization.length)
      jwt.verify(token, 'hello123', (err, decode) => {
         if (err) {
            res.status(401).send({message:'Invalid Token'})
         } else {
            req.user = decode
            next()
         }
      })
   } else {
         res.status(401).send({message:'No Token'})
   }
}

export const isAdmin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next()
   } else {
         res.status(401).send({message:'Invalid Admin'})
   }
}