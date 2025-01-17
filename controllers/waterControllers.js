import Water from "../schemas/waterSchemas.js";

import HttpError from "../helpers/index.js";
import { ctrlWrapper } from "../helpers/index.js";

const getWater = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const { _id: owner } = req.user;

    const result = await Water.find(
        { owner },
        {},
        {
            skip,
            limit,
        }
    ).populate("owner", "email");
    res.json(result);
};

const getOneWater = async (req, res) => {
    const { _id: owner } = req.user;
    const { waterId } = req.params;

    const result = await Water.findOne({ _id: waterId, owner });
    if (!result) {
        throw HttpError(404, `Water record with id: ${waterId} not found`);
    }
    res.json(result);
};
const addWater = async (req, res) => {
    const { _id: owner } = req.user;

    const result = await Water.create({ ...req.body, owner });
    res.status(201).json(result);
};
const updateWater = async (req, res) => {
    const { _id: owner } = req.user;
    const { waterId } = req.params;

    const result = await Water.findOneAndUpdate(
        { _id: waterId, owner },
        req.body
    );
    if (!result) {
        throw HttpError(404, `Water record with id: ${waterId} not found`);
    }

    res.json(result);
};

const deleteWater = async (req, res) => {
    const { _id: owner } = req.user;
    const { waterId } = req.params;

    const result = await Water.findOneAndDelete({ _id: waterId, owner });
    if (!result) {
        throw HttpError(404, `Water record with id: ${waterId} not found`);
    }
    res.status(200).json(result);
};

export default {
    getWater: ctrlWrapper(getWater),
    getOneWater: ctrlWrapper(getOneWater),
    addWater: ctrlWrapper(addWater),
    updateWater: ctrlWrapper(updateWater),
    deleteWater: ctrlWrapper(deleteWater),
};
