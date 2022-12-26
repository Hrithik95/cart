import React from 'react';

class CartItem extends React.Component{
    constructor(){
        super();
        this.state={
            title:"Phone",
            price:9999,
            qty:1,
            img:''
        }
        // this.increaseQuantity=this.increaseQuantity.bind(this);
    }
    increaseQuantity=()=>{
          console.log('this',this);
          //setState-form 1:by giving it an object
        //   this.setState({
        //     qty:this.state.qty+1
        //   });
           //setState form 2:by passing on a function
           this.setState((prevState)=>{
            //callback function will return an object
            return{
                qty:prevState.qty+1
            }
           })
    }
    render(){
        const{title,price,qty}=this.state;
        return(
            <div className='cart-item '>
             <div className='left-block'>
                <img style={styles.image}/>
             </div>

             <div className='right-block'>
                <div style={{fontSize:25}}>{title}</div>
                <div style={{color:'#777'}}>Rs {price}</div>
                <div style={{color:'#777'}}>Qty: {qty}</div>
                <div className='cart-item-actions'>
                    {/*Buttons*/}
                    <img alt='increase' className='action-icons' src='https://cdn-icons-png.flaticon.com/128/8727/8727642.png' onClick={this.increaseQuantity}/>
                    <img alt='decrease' className='action-icons' src='https://cdn-icons-png.flaticon.com/128/8727/8727682.png'/>
                    <img alt='delete' className='action-icons' src='https://cdn-icons-png.flaticon.com/128/6096/6096937.png'/>
                </div>
             </div>




            </div>
        )
    }
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