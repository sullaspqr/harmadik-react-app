import React, { useState, useEffect } from 'react';
import './App.css';

export const App=()=> {
  const [items, setItems] = useState([]);
  const [tipus, setTipus] = useState('comment');

  useEffect(() => {
    fetch("https://localhost:7231/" + tipus)
      .then((res) => (res.ok ? res.json() : []))
      .then((tartalom) => setItems(tartalom));
  }, [tipus]);
  return (
    <div className="container">
      <div className="row m-5 border p-5">
        <FormKomponens setTipus={setTipus} />
        <ListaKomponens elemek={items} />
      </div>
    </div>
  );
}
const FormKomponens = ({ setTipus }) => (
  <form
  className="w-100"
  onSubmit={(event) => {
    event.preventDefault();
    setTipus(event.target.contentType.value);
  }}>
    <select name="contentType"
    className="form-control mb-2">
      <option value="comment">Kommentek</option>
      <option value="post">Posztok</option>
    </select>
    <button className="btn btn-primary" type="submit">Kattints!</button>
</form>
);
const ListaKomponens = ({ elemek }) => (
  <ul>
    {elemek.map((elem, index) => (
      <li key={index} className="list-group-item">{elem.id} - {elem.body}</li>
    ))}
  </ul>
);
