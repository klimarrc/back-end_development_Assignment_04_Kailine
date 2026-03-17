import Joi from "joi";

export const postSchemas = {
    // POST /loans - Create new loan
    create: {
        body: Joi.object({
            applicant: Joi.string().required(),
            amount: Joi.number().required(),
            status: Joi.string()
                .valid("pending", "approved", "rejected")
                .default("pending")
        }),
    },

    // GET /loans/:id
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Loan ID is required",
                "string.empty": "Loan ID cannot be empty",
            }),
        }),
    },

    // PUT /loans/:id - Update loan
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Loan ID is required",
                "string.empty": "Loan ID cannot be empty",
            }),
        }),
        body: Joi.object({
            applicant: Joi.string().optional(),
            amount: Joi.number().optional(),
            status: Joi.string()
                .valid("pending", "approved", "rejected")
                .optional(),
        }).min(1), // require at least one field
    },

    // DELETE /loans/:id
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Loan ID is required",
                "string.empty": "Loan ID cannot be empty",
            }),
        }),
    },
};