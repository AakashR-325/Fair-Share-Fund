export default function CharityCard({ name, desc, address }) {
  return (
    <div className="col-sm-3 mb-3 mb-sm-0 my-3 mx-3">
      <div className="card" style={{ height: "400px", width: "400px" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontWeight: "bold" }}>
            {name}
          </h5>
          <p className="card-text">{desc}</p>
          <a href="#" className="btn btn-primary">
            Contribute
          </a>
        </div>
      </div>
    </div>
  );
}
