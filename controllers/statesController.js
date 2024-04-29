// const FunFact = require('../model/funFact.json');
const State = require('../model/State');
const stateJSON = require('../middleware/stateJSON');
const data = {
    states: require('../model/states.json'),
}

const getAllStates = async (req, res) => {
    const facts = await State.find();
    
    for ( index in data.states){      
        let fact = facts.find(st => st.state === data.states[index].code );    
        if (!fact) {
            continue;
        }else{
            data.states[index]["funfacts"] = fact["funfacts"];
        }
    }
    if (req.query.contig === 'true'){
        let contig = []
        contig = data.states.filter(state => state.code !== 'AK' && state.code !== 'HI');
        res.json(contig);

    }else if (req.query.contig === 'false'){
        let contig =[]
           contig = data.states.filter(state => state.code === 'AK' || state.code === 'HI')
        res.json(contig);
    }else{
    res.json(data.states);
}
}


const getState = async (req, res) => {
    const fact = await State.findOne({ state: req.params.slug.toUpperCase() }).exec();
       const slugURL = req.params.slug.toUpperCase()
    const state = data.states.find(st => st.code === slugURL);
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }

    if (!fact) {
        res.json(state);
    }else{
        state["funfacts"] = fact["funfacts"];
        res.json(state);
    }
        
}

const getFunFact = async(req,res) =>{
    const fact = await State.findOne({ state: req.params.slug.toUpperCase() }).exec();
       const slugURL = req.params.slug.toUpperCase()
    const state = data.states.find(st => st.code === slugURL);
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }

    if (!fact) {
        res.status(404).json({"message":  `No Fun Facts found for ${state.state}`});
    }else{
        res.json({"funfact": fact["funfacts"][Math.floor(Math.random()*fact["funfacts"].length)]});
    }
        
}

const getCapital = (req,res) =>{
       const slugURL = req.params.slug.toUpperCase()
    const state = data.states.find(st => st.code === slugURL);
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }

    
    res.json({"state": state.state,
        "capital": state.capital_city});
            
}


const getNickname = (req,res) =>{
       const slugURL = req.params.slug.toUpperCase()
    const state = data.states.find(st => st.code === slugURL);
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }

    
    res.json({"state": state.state,
        "nickname": state.nickname});           
  }


const getPopulation = (req,res) =>{
       const slugURL = req.params.slug.toUpperCase()
    const state = data.states.find(st => st.code === slugURL);
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }
    
    res.json({"state": state.state,
        "population": state.population.toLocaleString()});           
  }

const getAdmission = (req,res) =>{
    const state = data.states.find(st => st.code === req.params.slug.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }
    
    res.json({"state": state.state,
        "admitted": state.admission_date});           
  }

const statePostAppend = async(req, res)=>{
       const slugURL = req.params.slug.toUpperCase()
    const state = data.states.find(st => st.code === slugURL);
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }
    try {
        if(!req.body.funfacts){
            return res.status(400).json({ "message":'State fun facts value required'});
        }
        if(!Array.isArray(req.body.funfacts)){
            return res.status(400).json({ "message":'State fun facts value must be an array'});
        }
        const stateFact = await State.findOne({ state:slugURL}).exec();
        if(!stateFact){
            var result = await State.create({
                state: slugURL,
                funfacts:req.body.funfacts
                });
                res.status(200).json(result)
        }else{
            for (fact in req.body.funfacts){
                stateFact.funfacts.push(req.body.funfacts[fact])
            }
            var result = await stateFact.save()
        }
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
  };

const statePatch = async(req, res)=>{
    const state = data.states.find(st => st.code === req.params.slug.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }
    if (!req.body.index || isNaN(req.body.index)){
        return res.status(400).json({ "message":"State fun fact index value required"});

    }
    if(!req.body.funfact){
        return res.status(400).json({ "message":'State fun fact value required'});
    }

    try {
        const Facts = await State.find().exec();
        const stateFact = Facts.find(s => s.state === req.params.slug.toUpperCase())
        if(!stateFact){
            return res.status(400).json({ "message":`No Fun Facts found for ${state.state}`});
        }else{
            if(stateFact.funfacts[req.body.index-1]){
                 stateFact.funfacts[req.body.index-1] = req.body.funfact
                 const result = await stateFact.save();
                res.status(201).json(result);

            }else{
                return res.status(404).json({ "message":`No Fun Fact found at that index for ${state.state}`});
            }
        }
    } catch (err) {
        console.error(err);
    }
  };

const stateDelete = async (req, res)=>{
    const state = data.states.find(st => st.code === req.params.slug.toUppertCase());
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }
    if (!req.body.index || isNaN(req.body.index)){
        return res.status(400).json({ "message":"State fun fact index value required"});

    }
    try {
        const Facts = await State.find().exec();
        const funFact = Facts.find(s => s.state === req.params.slug.toUpperCase())
        if(!funFact){
            return res.status(400).json({ "message":`No Fun Facts found for ${state.state}`});
        }else{
            if(funFact.funfacts[req.body.index-1]){
                funFact.funfacts.splice(req.body.index-1,1);
                result = await funFact.save();
                res.status(201).json(result);
            }else{
                return res.status(404).json({ "message":`No Fun Fact found at that index for ${state.state}`});

            }
        }
    } catch (err) {
        console.error(err);
    }
  };



module.exports = {
    getAllStates,
    getState,
    getFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    statePostAppend,
    statePatch,
    stateDelete
  }