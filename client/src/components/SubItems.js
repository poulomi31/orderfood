import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from "styled-components"

export const SubItems = (props) => {
    const { fetchFoodItems } = props
    const itemId = props.match.params.id;
    const [fetchedData, setfetchedData] = useState(null);

    async function getData() {
        const responseData = await axios.get(`http://localhost:8080/data/${itemId}`);
        setfetchedData(responseData.data.result[0])
    }
    useEffect(() => {
        getData();
    }, []);

    async function buttonClickHandle(item) {
        const addTask = await axios.post("http://localhost:8080/data/add", {
            "name": item.name,
            "image": item.image,
            "price": item.price,
            "description": item.description
        });
        console.log(addTask);
        // setCartItems([...cartItems, item])
        fetchFoodItems();
    }

    function displaySubItems() {
        if (fetchedData != null) {
            return fetchedData.subItemsData.subItems.map((item, index) => {
                return (
                    <Wrapper className="product col-12 col-sm-12"
                        key={index}>
                        <div className="w-100 to-left">
                            <h4>{item.name}</h4>
                            <h6>₹{item.price}</h6>
                            <p>{item.description}</p>
                            <button onClick={() => buttonClickHandle(item)}>Order Now</button>
                        </div>
                        <img className="check-img" src={item.image} alt={item.name}></img>
                    </Wrapper>
                )
            })
        }
    }

    return (
        <div>
            <h3>{fetchedData != null && fetchedData.subItemsData.name}</h3>
            <div>{displaySubItems()}</div>
        </div>
    )
}
const Wrapper = styled.div`
  .to-left{
      padding: 20px;
      text-align: left;
      justify-content: flex-start;
  }
  button {
    width: 120px;
    padding: 5px;
    height: 40px;
    background-color:rgb(189, 60, 60);
    color: white;
    border: none;
    border-radius: 4px;
    outline: none;
    margin: 10px;
  }
`

// export default GetJSONData;
