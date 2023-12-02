export default function Form({ data, onSubmit }) {
  const renderedFields = data.fields.map((field) => {
    if (!field) return;
    return (
      <div className="input-field76t33">
        <label>{field.label}</label>
        {field.input}
      </div>
    );
  });

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    // const formValues = {};

    // for (let [key, value] of formData.entries()) {
    //   formValues[key] = value;
    // }
    event.target.reset();
    onSubmit(formData);
  }

  return (
    <div className="center-stage1236">
      <div className="container2">
        <header>{data.Header}</header>
        <form className="form7784u5" onSubmit={handleSubmit}>
          {/* <CSRFToken /> */}
          <div>
            <div className="details15421">
              <span className="title7784u5">{data.Title}</span>
              <div className="fields15421">{renderedFields}</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
