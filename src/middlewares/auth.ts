import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User';

export const Auth = {
    private: async (req: Request, res:Response, next:NextFunction) => {
        let success: boolean = false
        const auth = req.headers.authorization ?? null

        if (auth) {
            const hash: string = auth.substring(6)
            const decoded: string = Buffer.from(hash, 'base64').toString()
            const data: string[] = decoded.split(':')

            if (data.length === 2) {
                const hasUser = await User.findOne(
                    {
                        where: {
                            email: data[0],
                            password: data[1]
                        }
                    }
                );
                if (hasUser) {
                    success = true
                }
            }
        }

        if (success) {
            next()
        } else {
            res.status(403)
            .json({
                error: 'Não autorizado'
            })
        }
    }
}