import { Link } from "react-router-dom";
import React from "react";
const Main = () => {
  return (
    <>
      <section className="section">
        <div className="title">
          <h2>Scheduler</h2>
          <div className="underline"></div>
        </div>
        <div className="jobs-center">
          <div>
            <img
              src="https://www.citationbuilderpro.com/wp-content/uploads/2019/07/gmb-scheduler-header-01.png"
              alt=""
            ></img>
          </div>
          <article>
            <Link to="/admin">
              <button type="button" className="btn">
                Login as Admin
              </button>
            </Link>
            <Link to="/faculty">
              <button type="button" className="btn">
                Login as Faculty
              </button>
            </Link>
            <Link to="/student">
              <button type="button" className="btn">
                Login as Student
              </button>
            </Link>
          </article>
        </div>
      </section>
    </>
  );
};
export default Main;
