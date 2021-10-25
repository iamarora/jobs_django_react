import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import {
    Button,
    Form,
    FormGroup,
    InputGroup,
    Input,
    Label,
} from "reactstrap";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const initialSkills = [
  {
    "name": ""
  }
];

const JobForm = ({refreshData}) => {
  const [skillFields, setskillFields] = useState(initialSkills);

  const { control, handleSubmit, reset, formState: { errors } } = useForm(
    {defaultValues :
      {"title": "", "description": "", "skills": initialSkills}
    }
  );
  const onSubmit = data => {
    axios.post('/jobs/', data)
    .then(function (response) {
      reset();
      refreshData();
    })
    .catch(function (error) {
      alert(error);
    });
  }

  const addSkill = () => {
    setskillFields([
      ...skillFields,
      initialSkills[0]
    ]);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
      <Label for="title">Job Title</Label>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
        {errors.title?.type === 'required' && "Title is required"}
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input type="textarea" {...field} />}
        />
        {errors.description?.type === 'required' && "Description is required"}
      </FormGroup>
      {skillFields.map((item, index) => (
        <FormGroup key={index}>
          <Label>Skills {index+1} {JSON.stringify(errors.skills)}</Label>
          <InputGroup>
          <Controller
            name={"skills."+index+".name"}
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          </InputGroup>
        </FormGroup>
      ))}
      <FormGroup>
        <Button className="float-right" type="button" onClick={addSkill} color="info">Add skill</Button>
      </FormGroup>
      <FormGroup>
        <Button
          type="submit"
          color="success">
          Add Job
        </Button>
      </FormGroup>
    </Form>
  );
}
export default JobForm;