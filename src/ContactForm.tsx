import {
  Button,
  FormHelperText,
  MenuItem,
  TextField,
  Typography,
  CardContent,
  Card,
} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { colourList } from "./ColourList";
import { animalList } from "./AnimalList";

interface FormData {
  email: string;
  password: string;
  colour: string;
  animal: string[];
  tigerType: string;
}

export default function ContactForm() {
  const classes = useStyles();
  const colours = colourList;
  const animals = animalList;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [animal, setAnimal] = useState<string[]>([]);
  const [colour, setColour] = useState("");

  const handleAnimalChange = (event: any) => {
    setAnimal(event.target.value);
  };

  const handleColourChange = (event: any) => {
    setColour(event.target.value);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
    setAnimal([]);
    setColour("");
  };

  return (
    <div className={classes.container}>
      <Card variant="outlined">
        <CardContent className={classes.cardContent}>
          <form className={classes.form}>
            <h1 className={classes.title}>Contact Form</h1>
            <TextField
              {...register("email", {
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              name="email"
              id="standard-basic"
              label="Email"
              className={classes.input}
              variant="outlined"
            />

            {errors.email && (
              <FormHelperText className={classes.errorMessage}>
                "Please enter a valid email"
              </FormHelperText>
            )}
            <TextField
              {...register("password", { pattern: /.{8,}/ })}
              name="password"
              id="standard-basic"
              label="Password"
              className={classes.input}
              variant="outlined"
            />

            {errors.password && (
              <FormHelperText className={classes.errorMessage}>
                "Password must be longer than 8 chars"
              </FormHelperText>
            )}
            <TextField
              {...register("colour")}
              select
              label="Colour"
              value={colour}
              name="colour"
              onChange={handleColourChange}
              helperText="Choose a colour"
              className={classes.input}
              variant="outlined"
              defaultValue="red"
            >
              {colours.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Typography style={{ color: option.value }}>
                    {option.label}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              variant="outlined"
              {...register("animal")}
              className={classes.input}
              helperText="Choose one or more animals"
              label="Animals"
              name="animal"
              select
              SelectProps={{
                multiple: true,
                value: animal,
                onChange: handleAnimalChange,
              }}
            >
              {animals.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {animal.includes("tiger") ? (
              <>
                <TextField
                  {...register("tigerType", { required: true })}
                  name="tigerType"
                  id="standard-basic"
                  label="Type of tiger"
                  className={classes.input}
                  variant="outlined"
                  helperText="Enter the type of tiger"
                />
                {errors.tigerType?.type === "required" && (
                  <FormHelperText className={classes.errorMessage}>
                    "This is required"
                  </FormHelperText>
                )}
              </>
            ) : (
              <></>
            )}

            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              className={classes.submitButton}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    backgroundColor: "lightblue",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  cardContent: {
    padding: 40,
  },

  title: {
    alignSelf: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 500,
  },
  input: {
    margin: 5,
  },
  errorMessage: {
    alignSelf: "flex-end",
    color: "red",
  },

  submitButton: {
    marginTop: 40,
  },
});
