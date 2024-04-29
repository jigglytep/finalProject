// const data = require('../model/states.json')
const data = {
    states: require('../model/states.json'),
}



const getstateJSON = (req, res, next) => {
    const slugURL = req.params.slug.toUpperCase()
    const state = data.states.find(st => st.code === slugURL);
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }else{
        return state;
    }
}

module.exports = getstateJSON;

