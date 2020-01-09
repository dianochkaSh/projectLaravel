import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Carousel } from 'react-responsive-carousel';
import {observable, reaction} from 'mobx';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductOne.style.css';

/* store */
import ProductStore from '../../../store/ProductStore';

/*components*/
import LoaderElement from '../../Loader/LoaderElement';


inject('ProductStore');
@observer
class ProductOne extends Component {
    @observable isLoad = true;
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        reaction(() => ProductStore.productOne.title, () => {
            this.isLoad = false
        });
    }
    componentDidMount() {
        ProductStore.getOneProduct(this.props.match.params.id);
    }
    componentWillUnmount() {
        ProductStore.setOneProduct();
    }

    handleSelect() {

    }

    render() {
        return (
            <div className="container-product-one">
                {this.isLoad
                    ? <div>
                        <LoaderElement load={this.isLoad}/>
                    </div>
                    : <div>
                        {ProductStore.productOne !== undefined && ProductStore.productOne.title !== undefined &&
                        <div>

                            <h4>{ProductStore.productOne.title}</h4>

                            <div className="content-img">
                                {ProductStore.productOne.images !== undefined &&
                                <Carousel activeIndex='0'
                                          direction='next'
                                          onSelect={this.handleSelect}
                                          indicators='false'
                                          interval={2}
                                          slide='tru'
                                          wrap='true'
                                          width="400px"
                                          pauseOnHover='true'>
                                    {ProductStore.productOne.images.map((image, i) => (
                                        <div key={i}>
                                            <img src={image.original}/>
                                        </div>
                                    ))}
                                </Carousel>
                                }
                            </div>

                            <div className="content">
                                <div className="about">
                                    <div className="content-title">
                                        {ProductStore.productOne.author !== undefined && ProductStore.productOne.author !== null &&
                                        <p><label> Автор:</label></p>
                                        }
                                        <p><label>Категория:</label></p>
                                    </div>
                                    <div className="content-text">
                                        {ProductStore.productOne.author !== undefined && ProductStore.productOne.author !== null &&
                                        <p><label>{ProductStore.productOne.author.author}</label></p>
                                        }
                                        {
                                            ProductStore.productOne.category !== undefined &&
                                            <p><label>{ProductStore.productOne.category.name}</label></p>
                                        }

                                    </div>
                                </div>
                                <div className="description">
                                    <b>О книге:</b>
                                    <p>{ProductStore.productOne.description}</p>
                                </div>
                                <div><button className="btn btn-primary">Add to cart</button></div>
                            </div>
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
};
export default ProductOne;