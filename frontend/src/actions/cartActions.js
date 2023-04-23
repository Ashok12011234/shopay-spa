import axios from "axios";
import React, { useState, useEffect } from 'react'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";




export const addToCart = (id, qty) => async (dispatch, getState) => {
  //TODO: get data from db by using id
  
  const {data}  = await axios.get("http://localhost:3001/api/getProductForCart", { params: { id: id } });
  
  //console.log(data[0].title);
  

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data[0].product_id,
      name: data[0].title,
      image: data[0].image,
      price: data[0].price,
      countInStock: data[0].count,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
