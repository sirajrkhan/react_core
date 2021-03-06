import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients:null,
        totalPrice: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        console.log('q...',query);
        const ingredients = {};
        for (let param of query.entries()){
            if (param[0] !== 'price'){
                ingredients[param[0]] = +param[1]
            } else {
                this.setState({totalPrice: +param[1] })
            }
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return(
            <>
                <CheckoutSummary 
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    ingredients={this.state.ingredients} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={
                        (props)=>(
                        <ContactData 
                            price={this.state.totalPrice} 
                            ingredients={this.state.ingredients} 
                            {...props} />
                    )} />
            </>
        )
    }
}

export default Checkout;