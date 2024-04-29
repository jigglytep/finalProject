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
        const contig =JSON.parse(JSON.stringify(data.states))
        contig.splice(1,1);
        contig.splice(9,1);
        data.states = contig
        res.json(contig);

    }else if (req.query.contig === 'false'){
        contig = data.states.filter(state => state.code === 'AK' || state.code === 'HI')
        res.json(contig);
    }else{
    res.json(data.states);
}
}


const getState = async (req, res) => {
    const fact = await State.findOne({ state: req.params.slug.toUpperCase() }).exec();
    state = stateJSON(req, res);

    if (!fact) {
        res.json(state);
    }else{
        state["funfacts"] = fact["funfacts"];
        res.json(state);
    }
        
}

const getFunFact = async(req,res) =>{
    const fact = await State.findOne({ state: req.params.slug.toUpperCase() }).exec();
    state = stateJSON(req, res);

    if (!fact) {
        res.status(404).json({"message":  `No Fun Facts found for ${state.state}`});
    }else{
        res.json({"funfact": fact["funfacts"][Math.floor(Math.random()*fact["funfacts"].length)]});
    }
        
}

const getCapital = (req,res) =>{
    state = stateJSON(req, res);

    
    res.json({"state": state.state,
        "capital": state.capital_city});
            
}


const getNickname = (req,res) =>{
    state = stateJSON(req, res);

    
    res.json({"state": state.state,
        "nickname": state.nickname});           
  }


const getPopulation = (req,res) =>{
    state = stateJSON(req, res);
    
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
    state = stateJSON(req, res);
    slugURL =req.params.slug;
    try {
        if(!req.body.funfacts){
            return res.status(400).json({ "message":'State fun facts value required'});
        }
        if(!Array.isArray(req.body.funfacts)){
            return res.status(400).json({ "message":'State fun facts value must be an array'});
        }
        const stateFact = await State.findOne({ state:slugURL}).exec();
        if(!stateFact){
            await State.create({
                slug: slugURL,
                "funfacts":[req.body.funfacts]
                });
        }else{
            stateFact.funfacts.push(JSON.stringify(req.body.funfacts))
            await stateFact.save()
        }
        state["funfacts"] = stateFact["funfacts"];
        res.status(201).json(state);
    } catch (err) {
        console.error(err);
    }
  };

const statePatch = async(req, res)=>{
    const state = data.states.find(st => st.code === req.params.slug.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }

    try {
        const result = await State.findOne({sate: req.params.slug.toUpperCase()}).exec();
        if(!result){
            return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
        }else{
            if(result.funfacts[req.body.index-1]){
                result.funfacts[req.body.index-1] = req.body.funfact
            }else{
                return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
            }
        }
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
  };

const stateDelete = async (req, res)=>{
    const state = data.states.find(st => st.code === req.params.slug.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }

    try {
        const result = await State.findOne({sate: req.params.slug.toUpperCase()}).exec();
        if(!result){
            return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
        }else{
            if(result.funfacts[req.body.index-1]){
                result.funfacts.splice(req.body.index-1,1);
            }else{
                return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
            }
        }
        res.status(201).json(result);
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