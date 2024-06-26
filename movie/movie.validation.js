import yup from "yup";

// Get the current year
// const currentYear = new Date().getFullYear();

export const addMovieValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required.")
    .trim()
    .max(60, "Name must be at max 60 characters."),
  leadActor: yup
    .string()
    .required("Lead actor name is required.")
    .trim()
    .max(30, "Lead actor name must be at max 30 characters."),
  supportingActor: yup
    .string()
    .required("Supporting actor name is required.")
    .trim()
    .max(30, "Supporting actor name must be at max 30 characters."),
  country: yup
    .string()
    .required("Country is required.")
    .trim()
    .oneOf([
      "Nepal",
      "America",
      "India",
      "Japan",
      "Korea",
      "Spain",
      "France",
      "China",
      "Germany",
      "England",
      "Australia",
      "Canada",
    ]),
  genre: yup
    .array()
    .required("Genre is required.")
    .min(1, "Must contain at least one genre.")
    .of(
      yup
        .string()
        .oneOf([
          "comedy",
          "action",
          "horror",
          "science-fiction",
          "drama",
          "thriller",
          "motivational",
          "crime",
          "animation",
          "historical",
          "documentary",
          "romance",
          "adventure",
          "musical",
          "experimental",
          "sports",
          "biography",
          "mystery",
          "spy",
          "war",
          "art",
          "science",
        ])
    ),
  description: yup
    .string()
    .trim()
    .required("Description is required.")
    .min(100, "Description must be at least 100 characters.")
    .max(2000, "Description must be at max 2000 characters."),
  releasedYear: yup.number().required("Released year is required.").min(1900),
  duration: yup
    .number()
    .required("Duration is required.")
    .min(1, "Duration must be at least 1 sec."),

  image: yup.string().nullable(),
  director: yup
    .string()
    .trim()
    .max(60, "Director name must be at max 60 characters."),
});

export const paginationValidationSchema = yup.object({
  page: yup
    .number()
    .min(1, "Page must be at least 1.")
    .required("Page is required."),
  limit: yup
    .number()
    .min(1, "Limit must be at least 1.")
    .required("Limit is required.")
    .max(100, "Limit must be at max 100."),
});
