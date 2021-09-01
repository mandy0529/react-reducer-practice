import React, {useState, useReducer} from 'react';
import Modal from './Modal';

const VALUE = 'value';
const NOVALUE = 'no-value';
const DEL = 'delete';
const CLOSE = 'close';

const initialState = {
  people: [],
  showModal: false,
  modalContent: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case VALUE:
      const newPeople = [...state.people, action.payload];
      return {
        people: newPeople,
        showModal: true,
        modalContent: 'items added',
      };
    case NOVALUE:
      return {
        ...state,
        showModal: true,
        modalContent: 'please enter your values',
      };
    case DEL:
      const filteredppl = state.people.filter(
        (person) => person.id !== action.payload
      );
      return {
        people: filteredppl,
        showModal: true,
        modalContent: 'this item is deleted',
      };
    case CLOSE:
      return {...state, showModal: false};
    default:
      throw new Error('no match any values');
  }
};

const Index = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = {id: new Date().getTime().toString(), name};
      dispatch({type: VALUE, payload: newItem});
      setName('');
    } else {
      dispatch({type: NOVALUE});
    }
  };

  const closeModal = () => {
    dispatch({type: CLOSE});
  };

  console.log(() => dispatch, '실행하는디스패치');
  return (
    <>
      {state.showModal && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}

      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">add </button>
      </form>
      {state.people.map((person) => {
        return (
          <div className="item">
            <h4>{person.name}</h4>
            <button onClick={() => dispatch({type: DEL, payload: person.id})}>
              remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Index;
