import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

export function Products(props) {
  const [JSONdata, setJSONData] = useState(null);

  async function fetchJSON() {
    const fetchJSON = await axios.get("http://localhost:8080");
    setJSONData(fetchJSON.data.results);
  }

  useEffect(() => {
    fetchJSON();
  }, [])

  function showProducts() {
    if (JSONdata !== null) {
      return JSONdata.map((item) => {
        return (
          <Wrapper
            key={item.id}
            className="me-5"
          >
            <Link to={`/data/${item.id}`} style={{ textDecoration: "none", color: "#000" }}>
              <img src={item.image} alt={item.name}></img>
              <h5 className="card-title m-2">{item.name}</h5>
            </Link>
          </Wrapper>
        );
      });
    }
  }
  return (
    <div className="mt-4 food-items">
      {showProducts()}
    </div>
  );
}
const Wrapper = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 20px grey;
  min-width: 50px;
  padding: 7px; 

  span {
    font-size: 0.8rem;
    font-weight: 400;
    color: grey;
    text-decoration: line-through;
  }
`;
