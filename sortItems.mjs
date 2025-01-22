const sortItems = async (req, res, next) => {
    try {
        const { sort } = req.query;
        req.sortOption = sort 
            ? { [sort.startsWith('-') ? sort.slice(1) : sort]: sort.startsWith('-') ? -1 : 1 } 
            : {};
        next();
    } catch (err) {
        res.status(500).json({ message: "Sorting error", error: err.message });
    }
};

export default sortItems;
