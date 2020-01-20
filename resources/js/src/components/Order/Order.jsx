import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import userStore from '../../store/UserStore';

/* components */
import OrderItem from './OrderItem';
import PaymentForm from './PaymentForm';

/*style*/
import './Order.style.css';

inject('userStore');
@observer
class Order extends Component {
    @observable total = 0;
     constructor(props) {
         super(props);
         this.handlerOrder = this.handlerOrder.bind(this);
     }

    componentDidMount() {
        userStore.getOrder();
    }

    handlerOrder = (sum) => {
        userStore.getSubmitOrder(sum);
    };

     render() {
         let sum = 0;
         sum = userStore.cart.length > 0 ?  userStore.cart.reduce((acc, item) => acc += (parseInt(item.price) * parseInt(item.quantity)), 0) : 0;
         return (
             <div>
                 <div className="order-container">
                     <h4>Your order</h4>
                     {userStore.cart.length > 0 &&
                     <div>
                         <div className="order-content">
                             <div className="div-table">
                                 <div className="div-table-row">
                                     <div className="div-table-col">Product</div>
                                     <div className="div-table-col">Total</div>
                                 </div>
                                 {userStore.cart.map((product, i) =>
                                     <OrderItem product={product} key={i}/>
                                 )
                                 }
                                 <div className="div-table-row">
                                     <div className="div-table-col"><b>Total</b></div>
                                     <div><b>{sum}</b></div>
                                 </div>
                             </div>
                             <div className="payment-part">
                                 <PaymentForm/>
                             </div>
                         </div>
                         <div className="content-btn-order-submit">
                             <button onClick={() => this.handlerOrder(sum)} className="btn btn-primary"> Submit Order</button>
                         </div>
                     </div>
                     }
                 </div>
             </div>
         )
     }
 }
 export default Order;

