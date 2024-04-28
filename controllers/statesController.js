// const FunFact = require('../model/funFact.json');
const State = require('../model/funFact');

const data = {
    states: require('../model/states.json'),
    // setStates: function (data) { this.States = data }
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
        let contig =[]
        contig =[
            JSON.parse(JSON.stringify(data.states[1])),
            JSON.parse(JSON.stringify(data.states[10]))]

        for (index in contig){
            let fact = facts.find(st => st.state === contig[index].code );    
            if (!fact) {
                contig[index]["funfacts"] = [];
            }else{
                contig[index]["funfacts"] = fact["funfacts"];
            }
        }
        res.json(contig);
    }else{
    res.json(data.states);
}
}


const getState = async (req, res) => {
    const fact = await State.findOne({ state: req.params.slug.toUpperCase() }).exec();
    const state = data.states.find(st => st.code === req.params.slug.toUpperCase());
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
    const state = data.states.find(st => st.code === req.params.slug.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }
    if (!fact) {
        res.status(404).json({"message":  "No Fun Facts found for Georgia"});
    }else{
        res.json({"funfact": fact["funfacts"][Math.floor(Math.random()*fact["funfacts"].length)]});
    }
        
}

const getCapital = (req,res) =>{
    const state = data.states.find(st => st.code === req.params.slug.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }
    
    res.json({"state": state.state,
        "capital": state.capital_city});
            
}


const getNickname = (req,res) =>{
    const state = data.states.find(st => st.code === req.params.slug.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message":"Invalid state abbreviation parameter"});
    }
    
    res.json({"state": state.state,
        "nickname": state.nickname});           
  }


const getPopulation = (req,res) =>{
    const state = data.states.find(st => st.code === req.params.slug.toUpperCase());
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


const catchAll = (req, res)=>{
    console.log(req.body);
}

module.exports = {
    getAllStates,
    getState,
    getFunFact,
    getCapital,
    getNickname,
    getPopulation,
    catchAll,
    getAdmission
}