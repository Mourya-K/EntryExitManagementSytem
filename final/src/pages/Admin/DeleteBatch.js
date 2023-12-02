import Form from "../../components/Form";

export default function DeleteBatch() {
  const data = {
    Header: "Delete Batch",
    fields: [
      {
        label: "Enter Batch",
        input: <input type="text" required />,
      },
      {
        label: "Enter Password",
        input: <input type="password" required />,
      },
      {
        label: "",
        input: (
          <button class="nextBtn">
            <span class="btnText">Delete</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };
  return <Form data={data} />;
}
