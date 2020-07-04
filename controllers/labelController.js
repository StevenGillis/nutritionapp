const Label = require('../models/labelModel');

class LabelService {

  static create(obj){
    const label = new Label(obj);
    return label.save();
  }

  static update(id, data){
      return Label.findById(id)
       .then((label)=>{
         label.set(data);
         label.save();
         return label;
       });
  }

  static read(id){
    return Label.findById(id)
      .then((label)=>{
        // found
        return label;
      });
  }

  static list(){
    return Label.find({})
      .then((label)=>{
        // found
        return label;
      });
  }

  static delete(id){
    return Label.deleteOne({_id: id})
      .then((obj)=>{
        //removed
        return obj;
      })
  }
}

module.exports.LabelService = LabelService;