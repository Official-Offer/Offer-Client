import { useEffect, useState } from "react";
import { removeVietnameseTones } from "@utils/processTextInput";
export default function useForm(initial = {}) {
  // create a state object fror our inputs
  const [input, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");
  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e: any) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    // if (type === "file") {
    //   [value] = e.target.files;
    // }
    if (type === "textarea" || type === "text") {
      value = removeVietnameseTones(value);
    }
    setInputs({
      ...input,
      [name]: value,
    });
  }
  function resetForm() {
    setInputs(initial);
  }
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, null])
    );
    setInputs(blankState);
  }

  function clearFormFields(arr: String[]) {
    const blankState = Object.fromEntries(
      Object.entries(input).map(([key, value]) =>
        !arr.includes(key) ? [key, value] : [key, null]
      )
    );
    console.log(blankState);
    setInputs(blankState);
  }
  return {
    input,
    handleChange,
    resetForm,
    clearForm,
    clearFormFields,
  };
}
