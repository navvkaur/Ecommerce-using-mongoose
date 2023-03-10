 const mongoose = require('mongoose');
 const Schema = mongoose.Schema
const userSchema = new Schema( {
  name:{
    type:String,
  required : true},
  email: {
    type:String,
  required : true
  },
  cart: {
    items:[{
      productId:{type :Schema.Types.ObjectId,ref:'Product',required : true},
      quantity:{type:Number,required : true}
    }]
  }
});
userSchema.methods.addToCart = function(product){
  const cartProductIndex=this.cart.items.findIndex(cp=>{
    return cp.productId == product._id.toString()

  });

  let newquantity = 1;
  const updatedCartItems = [...this.cart.items]
  
  if(cartProductIndex >= 0)
  {
    newquantity = (this.cart.items[cartProductIndex].quantity) +1;
    
    updatedCartItems[cartProductIndex].quantity = newquantity
  }
  else{
    updatedCartItems.push({productId :new mongodb.ObjectId(product._id),quantity : newquantity })
  }

  const updatedCart = {items:updatedCartItems}
 
  this.cart = updatedCart
  this.save()
 
}

userSchema.methods.deletefromcart = function(prodId){
  let updatedCartItems = this.cart.items.filter(item=>{
    return item.productId.toString() !== prodId.toString();
})

 this.cart.items = updatedCartItems;
 return this.save()
}

userSchema.methods.clearcart = function(){
  this.cart = {items:[]};
  return this.save();
}


module.exports = mongoose.model('user',userSchema);
