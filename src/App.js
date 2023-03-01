import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import CartItem from './CartItem';
// import { getFirestore, collection, query,  getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      products:[],
      loading:true
    }


     //Method:2-without firestore
    //
    // this.state={
    //     products:[
    //         {
    //         title:"Phone",
    //         price:16500,
    //         qty:1,
    //         img:'https://images.unsplash.com/photo-1525598912003-663126343e1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    //         id:1
    //         },
    //         {
    //         title:"Watch",
    //         price:1750,
    //         qty:1,
    //         img:'https://media.istockphoto.com/id/1333053202/photo/set-of-smart-watches-with-colorful-straps-on-black-background.jpg?b=1&s=170667a&w=0&k=20&c=LCLxaHBnFLMDlxxr-tlp-g7Zz-DvNVmISjPK-HIDdVg=',
    //         id:2
    //         },
    //         {
    //         title:"Laptop",
    //         price:40000,
    //         qty:1,
    //         img:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    //         id:3
    //         }
    //     ]
    // }
    // this.increaseQuantity=this.increaseQuantity.bind(this);
    // this.testing();
}
componentDidMount() {
  
    firestore
    .collection("products")
    //.where('price','==',16500)
    //.where('title','==','Smartwatch')
    // .orderBy('price',"desc")
    .onSnapshot(snapshot => {
      console.log(snapshot);
      const products = snapshot.docs.map(doc => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({ 
        products: products, 
        loading: false 
      });
    });
}


handleIncreaseQuantity=(product)=>{
   console.log(product);
   const{products}=this.state;
   const index=products.indexOf(product);
  //  products[index].qty+=1;
  //  this.setState({
  //   products:products
  //  })
  const docRef=firestore.collection('products').doc(products[index].id);
  docRef.update({
    qty:products[index].qty+1
  }).then(()=>{
    console.log("Updated Successfully");
  }).catch((error)=>{
    console.log("Error:",error)
  })
}
   
   handleDecreaseQuantity=(product)=>{
    
    console.log(product);
    const{products}=this.state;
    
    const index=products.indexOf(product);
    if(products[index].qty===0){
        return;
    }
    // products[index].qty-=1;
    // this.setState({
    //  products:products //if key and value has same variable name we can simply write single name also.Like here instead of writing "products:products" we can simply write "products" 
    // })
    const docRef=firestore.collection('products').doc(products[index].id);
    docRef.update({
      qty:products[index].qty-1
    }).then(()=>{
      console.log("Updated Successfully");
    }).catch((error)=>{
      console.log("Error:",error);
    })
 }
 handleDeleteProduct=(id)=>{
    // const{products}=this.state;
    // const items=products.filter((item)=>item.id!==id);
    // this.setState({
    //     products:items
    // })

    const docRef=firestore.collection('products').doc(id);
    docRef
    .delete()
    .then(()=>{
      console.log("Updated Successfully");
    }).catch((error)=>{
      console.log("Error:",error);
    })

 }

 getCartCount=()=>{
    const{products}=this.state;
    let count=0;
    products.forEach((item)=>{
      count+=item.qty;
    })
    return count;
 }

 getCartTotal=()=>{
  const{products}=this.state;
  let cartTotal=0;
  products.forEach((item)=>{
    if(item.qty>0){
    cartTotal=cartTotal+item.qty*item.price;
 }
 })

  return cartTotal;
 }

 addProduct=()=>{
  firestore
  .collection("products")
  .add({
    img:"https://thurrott.s3.amazonaws.com/2021/05/thinkbook15-power-supply.jpg",
    price:40000,
    qty:1,
    title:"Lenovo Thinkbook 15"
  }).then((docRef)=>{
    console.log("Prodcut has been added", docRef);
  }).catch((error)=>{
    console.log("Error:",error);
  })
 }
      render(){
        const{products,loading}=this.state;
        return (
          <div className="App">
            <Navbar count={this.getCartCount()}/>
            <button style={{fontSize:15,padding:2}} onClick={this.addProduct}>Add a product</button>
            <Cart
            products={products}
            onIncreaseQuantity={this.handleIncreaseQuantity}
            onDecreaseQuantity={this.handleDecreaseQuantity}
            onDeleteProduct={this.handleDeleteProduct}
            />
            {loading && <h1>Loading products...</h1>}
            <div style={{padding:10,fontSize:20}}>TOTAL: {this.getCartTotal()}</div>
          </div>
        );
      }
}

export default App;
