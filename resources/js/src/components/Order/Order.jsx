import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import userStore from '../../store/UserStore';
import OrderItem from './OrderItem';

/*style*/
import './Order.style.css';

inject('userStore');
@observer
class Order extends Component {
    @observable total = 0;
     constructor(props){
         super(props)
     }

     render(){
         let sum = 0;
         sum = userStore.cart.length > 0 ?  userStore.cart.reduce((acc, item) => acc += item.price, 0) : 0;
         return(
             <div>
                 <div className="order-container">
                     <h4>Your order</h4>
                     {userStore.cart.length > 0 &&
                        <div className="div-table">
                            <div className="div-table-row">
                                <div className="div-table-col">Product</div>
                                <div className="div-table-col">Total</div>
                            </div>
                            {   userStore.cart.map((product, i) =>
                                    <OrderItem product={product} key={i} />
                                )
                            }
                            <div className="div-table-row">
                                <div className="div-table-col"><b>Total</b></div>
                                <div><b>{sum}</b></div>
                            </div>
                        </div>
                     }
                 </div>
             </div>
         )
     }
 }
 export default Order;

