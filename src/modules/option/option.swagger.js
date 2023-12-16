/**
 * @swagger
 * tags:
 *   name: Option
 *   description: Option Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOption:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - category
 *         - type
 *       properties:
 *         title:
 *           type: string
 *           description: title of option
 *         key:
 *           type: string
 *           description: key of option
 *         category:
 *           type: string
 *           description: category of option
 *         guide:
 *           type: string
 *           description: guide of option
 *         required:
 *           type: boolean
 *           description: is this option required
 *         type:
 *           type: string
 *           description: type of option
 *           enum:
 *              -   number
 *              -   string
 *              -   boolean
 *              -   array
 *         enum:
 *            type: array
 *            items:
 *                type: string
 *     UpdateOption:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: title of option
 *         key:
 *           type: string
 *           description: key of option
 *         category:
 *           type: string
 *           description: category of option
 *         guide:
 *           type: string
 *           description: guide of option
 *         required:
 *           type: boolean
 *           description: is this option required
 *         type:
 *           type: string
 *           description: type of option
 *           enum:
 *              -   number
 *              -   string
 *              -   boolean
 *              -   array
 *         enum:
 *            type: array
 *            items:
 *                type: string
 */

/**
 * @swagger
 * /option:
 *   post:
 *     summary: Create New Option
 *     tags:
 *       - Option
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/CreateOption"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateOption"
 *     responses:
 *       200:
 *         description: Option Created Successfully.
 */


/**
 * @swagger
 * /option/by-category/{categoryId}:
 *   get:
 *     summary: Get Options Of Category
 *     tags:
 *       - Option
 *     parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *     responses:
 *       200:
 *         description: Category Options Fetched Successfully.
 */



/**
 * @swagger
 * /option/{id}:
 *   get:
 *     summary: Get An Option
 *     tags:
 *       - Option
 *     parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *
 *     responses:
 *       200:
 *         description: Option Fetched Successfully.
 */

/**
 * @swagger
 * /option:
 *   get:
 *     summary: Get All Options
 *     tags:
 *       - Option
 *     responses:
 *       200:
 *         description: Options Fetched Successfully.
 */

/**
 * @swagger
 * /option/{id}:
 *   patch:
 *     summary: Update Option
 *     tags:
 *       - Option
 *     parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/UpdateOption"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateOption"
 *     responses:
 *       202:
 *         description: Option Updated Successfully.
 */


/**
 * @swagger
 * /option/{id}:
 *   delete:
 *     summary: Delete An Option
 *     tags:
 *       - Option
 *     parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *
 *     responses:
 *       204:
 *         description: Option Deleted Successfully.
 */