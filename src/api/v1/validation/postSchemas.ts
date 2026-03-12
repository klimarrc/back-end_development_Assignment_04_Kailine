import Joi from "joi";

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /posts - Create new post
    create: {
        body: Joi.object({
            applicant: Joi.string().required(),
            loanAmount: Joi.number().required(),
            status: Joi.string().valid("pending", "under_review", "flagged").required(),
        }),
    }
};

