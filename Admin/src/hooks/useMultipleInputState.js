import { useState } from "react";

function useMultipleInputState(initialVal) {
  const [input, setValue] = useState(initialVal);
  console.log("ini input: ", input);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    console.log(input, name, value);
    input[index][name] = value;
    setValue(input);
  };
  const reset = () => {
    setValue("");
  };
  return [input, handleChange, reset];
}

export default useMultipleInputState;

// const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

//   // handle input change
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];
//     list[index][name] = value;
//     setInputList(list);
//   };

// stock = [
//   Kelapa Gading : {
//     stock: 1
//   },
//   Kemayoran : {
//     stock: 2
//   }
// ]
