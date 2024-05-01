import { Request , Response , NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { validate } from '../decorators/validate';

const postSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required()
});

@Controller()
class BookController {
  @Route('get','/')
  getAll(req: Request, res: Response, next: NextFunction) {
    logging.info(`Call successful: GET /`);
    return res.status(200).json({ message: 'Hello World' });
  }
}

export default BookController;