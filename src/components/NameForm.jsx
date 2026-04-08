export default function NameForm({ isOpen }) {
  return (
    <section
      className={`openNameGattingSection ${isOpen ? "is-open" : ""}`}
      id="index-s3"
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="lable">
          <label>First Name</label>
        </div>
        <input type="text" placeholder="Enter First Name" />
        <div className="lable">
          <label>Last Name</label>
        </div>
        <input type="text" placeholder="Enter Last Name" />
        <div className="group-age-time">
          <div className="lable">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              min="2"
              max="99"
              onInput={(event) => {
                event.target.value = event.target.value.slice(0, 2);
              }}
            />
          </div>
          <div className="lable">
            <label>
              Time <span className="optional">(optional)</span>
            </label>
            <input type="time" />
          </div>
        </div>
        <button className="loginBtn" type="button">
          Lest's go
        </button>
      </form>
    </section>
  );
}