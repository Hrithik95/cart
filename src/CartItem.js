import React from 'react';

const CartItem =(props)=>{
    

    // testing(){
        //It is explaind here that setState acts like a synchronus call in Promise
    //     const promise=new Promise((resolve,reject)=>{
    //         setTimeout(()=>{
    //             resolve("done");
    //         },5000);
    //     })

    //     promise.then(()=>{
    //         
    //         this.setState({qty:this.state.qty+1});
    //         console.log("state",this.state);
    //     });
    // }

    // increaseQuantity=()=>{
    //       //setState-form 1:by giving it an object
    //     //   this.setState({
    //     //     qty:this.state.qty+1
    //     //   });
    //        //setState form 2:by passing on a function
    //        this.setState((prevState)=>{
    //         //callback function will return an object
    //         return{
    //             qty:prevState.qty+1
    //         }
    //        });
    // }

    // decreaseQuantity=()=>{
    //     const{qty}=this.state;
    //     if(qty===0){
    //         return;
    //     }
    //     //setState form 1-by giving an object
    //     // this.setState({
    //     //     qty:this.state.qty-1
    //     // });
        
    //     //setState form2-by passing on a function
    //     this.setState((prevState)=>{
    //         //callback function here will return an object
    //         return{
    //             qty:prevState.qty-1
    //         }
    //     });
    // }
    
        //console.log("this.props",this.props);
        const{title,price,qty}=props.product;
        const{product,onDecreaseQuantity,onIncreaseQuantity,onDeleteProduct}=props;
        return(
            <div className='cart-item '>
             <div className='left-block'>
                <img style={styles.image} src={product.img}/>
             </div>

             <div className='right-block'>
                <div style={{fontSize:25}}>{title}</div>
                <div style={{color:'#777'}}>Rs {price}</div>
                <div style={{color:'#777'}}>Qty: {qty}</div>
                <div className='cart-item-actions'>
                    {/*Buttons*/}
                    <img 
                    alt='increase' 
                    className='action-icons' 
                    src='https://cdn-icons-png.flaticon.com/128/8727/8727642.png'
                    onClick={()=>onIncreaseQuantity(product)}
                    />
                    <img 
                    alt='decrease' 
                    className='action-icons' 
                    src='https://cdn-icons-png.flaticon.com/128/8727/8727682.png' 
                    onClick={()=>onDecreaseQuantity(product)}
                    />
                    <img 
                    alt='delete' 
                    className='action-icons' 
                    src='https://cdn-icons-png.flaticon.com/128/6096/6096937.png'
                    onClick={()=>onDeleteProduct(product.id)}
                    />
                </div>
             </div>

            </div>
        )
    
}

const styles={
    image:{
        height:110,
        width:110,
        borderRadius:4,
        background:'#ccc'
    }
}

export default CartItem;