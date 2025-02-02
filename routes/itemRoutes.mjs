import express from 'express';
import itemModel from '../model/item.mjs';
import filterItems from '../middleware/filterItems.mjs';
import sortItems from '../middleware/sortItems.mjs';
import paginateItems from '../middleware/paginateItems.mjs';

const itemRouter = express.Router();

// GET all items
itemRouter.get('/',filterItems,sortItems,paginateItems, async (req, res) => {
    try {
        const items = await itemModel.find(req.filter)
    .sort(req.sortOption)
    .skip(req.pagination.skip)
    .limit(req.pagination.limit);

        if (items.length === 0) {
            return res.status(404).json({ message: 'Items not found' });
        }
        res.status(200).json({ data: items });
    } catch (err) {
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

// POST a new item
itemRouter.post('/', async (req, res) => {
    try {
        console.log("Received body:", req.body); // Debugging line

        const { name, rollnumber, studentclass, enrollmentYear } = req.body;

        if (!name || !rollnumber || !studentclass || !enrollmentYear) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newItem = new itemModel({
            name,
            rollnumber,
            studentclass,
            enrollmentYear
        });

        await newItem.save();
        res.status(201).json({ message: 'New record added', data: newItem });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// GET item by ID
itemRouter.get('/:id', async (req, res) => {
    try {
        const item = await itemModel.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ data: item });
    } catch (err) {
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

// UPDATE item by ID
itemRouter.put('/:id', async (req, res) => {
    try {
        const item = await itemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item updated', data: item });
    } catch (err) {
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

// DELETE item by ID
itemRouter.delete('/:id', async (req, res) => {
    try {
        const item = await itemModel.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

export default itemRouter;
