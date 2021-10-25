import React, { Component } from "react";
import axios from "axios";
import JobForm from "./JobForm";



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {"title":"", "description": "", "skills": [{"name": ""}]},
      selectedJob: {"title":"", "description": "", "skills": []},
      jobList: [],
      mostUsedSkills: {"data": []},
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = () => {
    axios
      .get("/jobs/")
      .then((res) => this.setState({ jobList: res.data }))
      .catch((err) => console.log(err));
    axios
      .get("/jobs/most_user_skills/")
      .then((res) => this.setState({ mostUsedSkills: res.data }))
      .catch((err) => console.log(err));
  };

  populateJobDescription = (item) => {
    this.setState({selectedJob: item});
  }

  renderJobs = () => {
    return this.state.jobList.map((item, index) => (
      <li
        key={index}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span style={{cursor:'pointer'}} onClick={ () => this.populateJobDescription(item)}>
          {item.title}
        </span>
      </li>
    ));
  };

  renderMostUsedSkills = () => {
    return this.state.mostUsedSkills.data.map((item, index) => (
      <li
        key={index}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          {item.name} - {item.jobs_count}
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-center my-4">Jobs Manager app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
           <div className="card p-3">
              <div className="mb-4">
                <JobForm refreshData={this.refreshData}/>
              </div>
            </div>
            <div className="card p-3">
              Most used Skills
              <ul className="list-group list-group-flush border-top-0">
                {this.renderMostUsedSkills()}
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <h4>Job details</h4>
              <h6>{this.state.selectedJob.title}</h6>
              <span>{this.state.selectedJob.description.length > 0 ? "Description:" : ""} {this.state.selectedJob.description}</span>
              <br/>
              <span>
                {this.state.selectedJob.skills.length > 0 ? "Skills:" : ""}
                {this.state.selectedJob.skills.map((item, index) =>
                  <ul key={index} className="list-group list-group-flush border-top-0">
                    {item.name}
                  </ul>
                )}
                
              </span>
            </div>
            <div className="card p-3">
              Jobs list
              <ul className="list-group list-group-flush border-top-0 text-primary" >
                {this.renderJobs()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;