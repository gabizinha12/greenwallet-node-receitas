import { isValid, parse } from 'date-fns'
import { NextFunction, Request, Response } from 'express'
import { body, param, query, validationResult } from 'express-validator'

const allowState = ['A', 'D', 'E']
const allowTypes = ['E', 'R']

const indexTransaction = () => {
  return [
    param('user_id')
      .isNumeric()
  ]
}

const showTransaction = () => {
  return [
    param('user_id')
      .isNumeric(),
    param('transaction_id')
      .isNumeric()
  ]
}

const storeTransaction = () => {
  return [
    body('user_id')
      .isNumeric(),

    body('category_id')
      .isNumeric(),

    body('description')
      .isLength({
        min: 1,
        max: 255
      }),

    body('value')
      .isNumeric(),

    body('is_fixed')
      .isBoolean(),

    body('due_date')
      .custom((value) => isValidDate(value)),

    body('state')
      .custom((value) => {
        return !!allowState.includes(value)
      }),

    body('type')
      .custom((value) => {
        return !!allowTypes.includes(value)
      })
  ]
}

const updateTransaction = () => {
  return [
    param('user_id')
      .isNumeric(),

    param('transaction_id')
      .isNumeric(),

    body('description')
      .exists()
      .isLength({
        min: 1,
        max: 255
      }),

    body('value')
      .isNumeric(),

    body('is_fixed')
      .isBoolean(),

    body('due_date')
      .custom((value) => isValidDate(value)),

    body('state')
      .custom((value) => {
        return !!allowState.includes(value)
      }),

    body('type')
      .custom((value) => {
        return !!allowTypes.includes(value)
      })
  ]
}

const deleteTransaction = () => {
  return [
    param('user_id')
      .isNumeric(),
    param('transaction_id')
      .isNumeric()
  ]
}

const exportTransactions = () => {
  return [
    query('user_id').exists().isNumeric(),
    query('start_date').custom((value) => isValidDate(value)),
    query('end_date').custom((value) => isValidDate(value)),
  ]
}

const isValidDate = (value) =>{
  const result = isValid(parse(value, 'dd/MM/yyyy', new Date()))
  return !!result
}

const verifyErrosTransaction = (req: Request, resp: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: any = []
  errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }))

  return resp.status(422).json({
    errors: extractedErrors
  })
}

export default {
  indexTransaction,
  showTransaction,
  storeTransaction,
  updateTransaction,
  deleteTransaction,
  exportTransactions,
  verifyErrosTransaction
}
